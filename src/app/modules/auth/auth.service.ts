import config from "../../config";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { TAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  const accressToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: "10d",
    }
  );

  const result = {
    needsPasswordChange: isUserExists?.needsPasswordChange,
    accressToken,
  };
  return result;
};

const changePasswordFromDB = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  console.log(user, payload);
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

  // Finally let the password be changed
  const result = await UserModel.findOneAndUpdate(
    { id: user?.id, role: user?.role },
    { password: payload?.newPassword },
    { new: true }
  );
  return result;
};

export const AuthService = {
  logInUserFromDB,
  changePasswordFromDB,
};
