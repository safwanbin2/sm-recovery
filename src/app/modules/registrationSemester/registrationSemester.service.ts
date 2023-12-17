import QueryBuilder from "../../builders/QueryBuilders";
import { TRegistrationSemester } from "./registrationSemester.interface";
import { RegistrationSemesterModel } from "./registrationSemester.model";

const createRegistrationSemesterIntoDB = async (
  payload: TRegistrationSemester
) => {
  const result = await RegistrationSemesterModel.create(payload);
  return result;
};

const getAllRegistrationSemesterFromDB = async (query: Record<string, any>) => {
  const RegistrationSemesterQuery = new QueryBuilder(
    RegistrationSemesterModel.find().populate("academicSemester"),
    query
  )
    .filter()
    .paginate()
    .sort();

  const result = await RegistrationSemesterQuery.modelQuery;
  return result;
};

const getSingleRegistrationSemesterFromDB = async (id: string) => {
  const result = await RegistrationSemesterModel.findById(id).populate(
    "academicSemester"
  );
  return result;
};

export const RegistrationSemesterService = {
  createRegistrationSemesterIntoDB,
  getAllRegistrationSemesterFromDB,
  getSingleRegistrationSemesterFromDB,
};
