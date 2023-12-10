import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StudentService } from "./student.service";

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentService.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.FOUND,
    success: true,
    message: "Found students",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  // const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDB(
    // studentId
    req.query
  );

  sendResponse(res, {
    status: httpStatus.FOUND,
    success: true,
    message: "Found students",
    data: result as object,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
};
