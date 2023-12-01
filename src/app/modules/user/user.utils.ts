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
  return lastId?.id.substring(6) || undefined;
};

export const generateStudentId = async (
  admissionSemester: TAcademicSemester
) => {
  const currentId = (await findLastStudent()) || (0).toString();
  const increamentId = (Number(currentId) + 1).toString().padStart(4, "0");

  const generatedId = `${admissionSemester.year}${admissionSemester.code}${increamentId}`;
  return generatedId;
};
