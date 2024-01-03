import config from "../../config";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TAuth } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { assignJwt } from "./auth.utils";
import { sendMail } from "../../utils/sendMail";

const logInUserFromDB = async (
  payload: TAuth
): Promise<Record<string, any>> => {
  // validations
  const isUserExists = await UserModel.findOne({ id: payload.id });
  if (!isUserExists) {
    throw new Error("User does not exists");
  }

  if (isUserExists.isDeleted) {
    throw new Error("User is deleted");
  }

  if (isUserExists.status === "blocked") {
    throw new Error("User is blocked");
  }

  // Checking if the password is authentic
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password as string
  );
  if (!isPasswordMatched) {
    throw new Error(`Password did not match for ${isUserExists?.id}`);
  }

  // Assigning jwt
  const jwtPayload = {
    id: isUserExists?.id,
    role: isUserExists?.role,
  };

  const accessToken = assignJwt(
    jwtPayload,
    config.jwt_access_secret as string,
    "10d"
  );

  const result = {
    jwtPayload,
    data: {
      needsPasswordChange: isUserExists?.needsPasswordChange,
      accessToken,
    },
  };
  return result;
};

const changePasswordFromDB = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // User Validation
  // Checking if the user exist or not
  const userData = await UserModel.findOne({ id: user?.id, role: user?.role });
  if (!userData) {
    throw new Error("User does not exist on Database");
  }
  if (userData?.isDeleted) {
    throw new Error("User is deleted from Database");
  }
  if (userData?.status === "blocked") {
    throw new Error("User is Blocked");
  }
  // Password Validation
  const isPasswordMatched = bcrypt.compare(
    payload?.oldPassword,
    userData?.password as string
  );
  if (!isPasswordMatched) {
    throw new Error("Old password was incorrect");
  }

  const hashedPassword = await bcrypt.hash(
    userData?.password as string,
    Number(config.bcrypt_salt_rounds)
  );
  // Finally let the password be changed
  const result = await UserModel.findOneAndUpdate(
    { id: user?.id, role: user?.role },
    { password: hashedPassword },
    { new: true }
  );
  return result;
};

const renewAccessToken = async (refreshToken: string) => {
  const decoded: any = jwt.verify(
    refreshToken,
    config.jwt_refresh_secret as string
  );

  const jwtPayload: Record<string, any> = {
    id: decoded.id,
    role: decoded.role,
  };
  const accessToken = assignJwt(
    jwtPayload,
    config.jwt_access_secret as string,
    "10d"
  );
  return accessToken;
};

const forgetPassword = async (userId: string) => {
  const userData = await UserModel.findOne({ id: userId });
  if (!userData) {
    throw new Error("User does not exist on Database");
  }
  if (userData?.isDeleted) {
    throw new Error("User is deleted from Database");
  }
  if (userData?.status === "blocked") {
    throw new Error("User is Blocked");
  }

  const jwtPayload: Record<string, any> = {
    id: userData.id,
    role: userData.role,
  };
  const resetToken = assignJwt(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${userData.id}&token=${resetToken}`;
  sendMail(userData.email, resetUILink);
};

export const AuthService = {
  logInUserFromDB,
  changePasswordFromDB,
  renewAccessToken,
  forgetPassword,
};
