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

const updateRegistrationSemesterFromDB = async (
  id: string,
  payload: Partial<TRegistrationSemester>
) => {
  const isExist = await RegistrationSemesterModel.findById(id);
  if (!isExist) {
    throw new Error("Regestration for the semester does not exist");
  }

  if (isExist?.status === "END") {
    throw new Error(`The semester has already ended`);
  }

  const result = await RegistrationSemesterModel.findByIdAndUpdate(
    id,
    payload,
    { new: true }
  );
  return result;
};

export const RegistrationSemesterService = {
  createRegistrationSemesterIntoDB,
  getAllRegistrationSemesterFromDB,
  getSingleRegistrationSemesterFromDB,
  updateRegistrationSemesterFromDB,
};
