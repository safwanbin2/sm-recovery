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

const getSingleStudentFromDB = async (query: Record<string, any>) => {
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm;
  }

  const result = await StudentModel.find({
    $or: ["name.firstName"].map((field) => ({
      [field]: { $regex: searchTerm },
    })),
  })
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
