import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicfaculty = catchAsync(async (req, res, next) => {
  const academicFaculty = req.body;
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    academicFaculty
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Created Academic Faculty successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Reqtrieved Academic Faculties successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(
    facultyId
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Reqtrieved Academic Faculty successfully",
    data: result as object,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const academicFaculty = req.body;
  const result = await AcademicFacultyService.updateAcademicFacultyFromDB(
    facultyId,
    academicFaculty
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Updated Academic Faculty successfully",
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicfaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
