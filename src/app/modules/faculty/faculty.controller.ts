import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendReponse } from "../../utils/sendResponse";
import { FacultyService } from "./faculty.service";

const getAllFaculties = catchAsync(async (req, res, next) => {
  const result = await FacultyService.getAllFacultiesFromDB();

  sendReponse(res, {
    status: httpStatus.FOUND,
    success: true,
    message: "Found the faculties",
    data: result,
  });
});

const deleteSingleFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await FacultyService.deleteSingleFacultyFromDB(facultyId);

  sendReponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Found the faculties",
    data: result as any,
  });
});

export const FacultyController = {
  getAllFaculties,
  deleteSingleFaculty,
};
