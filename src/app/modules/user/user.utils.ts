import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { StudentModel } from "../student/student.model";

const findLastStudent = async () => {
  const lastId = await StudentModel.findOne(
    { role: "student" },
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

  const lastId = await findLastStudent();
  console.log(lastId);
  if (
    lastId &&
    lastId.substring(0, 4) === admissionSemester.year &&
    lastId.substring(4, 6) === admissionSemester.code
  ) {
    console.log(lastId, "last");
    currentId = lastId.substring(6);
  }

  const increamentId = (Number(currentId) + 1).toString().padStart(4, "0");

  const generatedId = `${admissionSemester.year}${admissionSemester.code}${increamentId}`;
  return generatedId;
};
