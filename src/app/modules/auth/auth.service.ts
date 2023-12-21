import { TAuth } from "./auth.interface";

const logInUserFromDB = async (payload: TAuth) => {
  const result = await payload;
  return result;
};

export const AuthService = {
  logInUserFromDB,
};
