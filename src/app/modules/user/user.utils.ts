import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastId = async (role: string) => {
  const lastId = await UserModel.findOne(
    { role: role },
    {
      _id: 0,
      id: 1,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastId?.id || undefined;
};

export const generateStudentId = async (
  admissionSemester: TAcademicSemester
) => {
  let currentId = (0).toString();

  const lastId = await findLastId("student");

  if (
    lastId &&
    lastId.substring(0, 4) === admissionSemester.year &&
    lastId.substring(4, 6) === admissionSemester.code
  ) {
    currentId = lastId.substring(6);
  }

  const increamentId = (Number(currentId) + 1).toString().padStart(4, "0");

  const generatedId = `${admissionSemester.year}${admissionSemester.code}${increamentId}`;
  return generatedId;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastId = await findLastId("faculty");
  if (lastId) {
    currentId = lastId.substring(2);
  }

  const increamentId = (Number(currentId) + 1).toString().padStart(4, "0");
  const generatedId = `A-${increamentId}`;
  return generatedId;
};
