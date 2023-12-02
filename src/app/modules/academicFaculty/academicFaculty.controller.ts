import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendReponse } from "../../utils/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";

const createAcademicfaculty = catchAsync(async (req, res, next) => {
  const academicFaculty = req.body;
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    academicFaculty
  );

  sendReponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Created Academic Faculty successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();

  sendReponse(res, {
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

  sendReponse(res, {
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

  sendReponse(res, {
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
