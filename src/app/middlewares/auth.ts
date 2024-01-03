import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { TUserRoles } from "../modules/user/user.interface";

export const auth = (...userRoles: TUserRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Provide token");
      }
      const verifiedToken = jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new Error("Token error");
          }
          req.user = decoded as JwtPayload;
          const role = (decoded as JwtPayload).role;
          if (userRoles.length && !userRoles.includes(role)) {
            throw new Error("You are not authorized");
          }

          next();
        }
      );
    } catch (error) {
      next(error);
    }
  };
};
