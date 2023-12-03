import { StudentModel } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  // .populate("user")
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // });
  return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await StudentModel.findById(studentId)
    .populate("user")
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
