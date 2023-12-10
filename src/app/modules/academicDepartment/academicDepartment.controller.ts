import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";
import httpStatus from "http-status";

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const academicDepartment = req.body;
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    academicDepartment
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Created academic department successfully",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrieved academic departments successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
      departmentId
    );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Retrieved academic department successfully",
    data: result as object,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { departmentId } = req.params;
  const payload = req.body;

  const result = await AcademicDepartmentService.updateAcademicDepartmentFromDB(
    departmentId,
    payload
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Updated academic department successfully",
    data: result as object,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
