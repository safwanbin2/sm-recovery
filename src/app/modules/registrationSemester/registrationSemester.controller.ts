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

const getAllRegistrationSemester = catchAsync(async (req, res, next) => {
  const result =
    await RegistrationSemesterService.getAllRegistrationSemesterFromDB(
      req?.params
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Semester Retrived Successfully",
    data: result,
  });
});

const getSingleRegistrationSemester = catchAsync(async (req, res, next) => {
  const result =
    await RegistrationSemesterService.getSingleRegistrationSemesterFromDB(
      req?.params.id
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Semester Retrived Successfully",
    data: result as any,
  });
});

export const RegistrationSemesterController = {
  createRegistrationSemester,
  getAllRegistrationSemester,
  getSingleRegistrationSemester,
};
