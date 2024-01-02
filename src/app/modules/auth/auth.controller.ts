import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";
import { assignJwt } from "./auth.utils";

const logInUser = catchAsync(async (req, res, next) => {
  const result = await AuthService.logInUserFromDB(req.body);

  const { data, jwtPayload } = result;

  const refreshToken = assignJwt(
    jwtPayload,
    config.jwt_refresh_secret as string,
    "365d"
  );

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Logged in successfully",
    data: data,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const result = await AuthService.changePasswordFromDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Password changed successfully",
    data: result as any,
  });
});

const renewAccessToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.renewAccessToken(refreshToken);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Renewed access token",
    data: result as any,
  });
});

export const AuthController = {
  logInUser,
  changePassword,
  renewAccessToken,
};
