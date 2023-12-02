import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFacultyModel.findById(facultyId);
  return result;
};

const updateAcademicFacultyFromDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFacultyModel.updateOne(
    { _id: facultyId },
    payload
  );

  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
};
