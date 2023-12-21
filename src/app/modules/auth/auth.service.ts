import { UserModel } from "../user/user.model";
import { TAuth } from "./auth.interface";

const logInUserFromDB = async (payload: TAuth) => {
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

  const result = await payload;
  return result;
};

export const AuthService = {
  logInUserFromDB,
};
