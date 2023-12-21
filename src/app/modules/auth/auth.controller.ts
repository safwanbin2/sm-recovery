import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const logInUser = catchAsync(async (req, res, next) => {
  const result = await AuthService.logInUserFromDB(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Logged in successfully",
    data: result,
  });
});

export const AuthController = {
  logInUser,
};
