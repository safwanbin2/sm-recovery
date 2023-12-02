import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result = await AcademicDepartmentModel.findById(departmentId);
  return result;
};

const updateAcademicDepartmentFromDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartmentModel.updateOne(
    { _id: departmentId },
    payload
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
