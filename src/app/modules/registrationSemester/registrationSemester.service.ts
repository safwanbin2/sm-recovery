import { TRegistrationSemester } from "./registrationSemester.interface";
import { RegistrationSemesterModel } from "./registrationSemester.model";

const createRegistrationSemesterIntoDB = async (
  payload: TRegistrationSemester
) => {
  const result = await RegistrationSemesterModel.create(payload);
  return result;
};

export const RegistrationSemesterService = {
  createRegistrationSemesterIntoDB,
};
