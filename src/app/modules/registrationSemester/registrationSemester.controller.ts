import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RegistrationSemesterService } from "./registrationSemester.service";

const createRegistrationSemester = catchAsync(async (req, res, next) => {
  const result =
    await RegistrationSemesterService.createRegistrationSemesterIntoDB(
      req.body
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Semester Registered Successfully",
    data: result,
  });
});

export const RegistrationSemesterController = {
  createRegistrationSemester,
};
