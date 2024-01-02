import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const assignJwt = (
  payload: JwtPayload,
  accessSecret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, accessSecret, { expiresIn });
};
