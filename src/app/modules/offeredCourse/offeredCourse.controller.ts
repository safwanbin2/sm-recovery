import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Offered Course successfully",
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
};
