import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  let user: Partial<TUser> = {};

  const admissionSemester = await AcademicSemesterModel.findOne({
    _id: payload.admissionSemester,
  });
  user.id = await generateStudentId(admissionSemester as any);

  user.role = "student";
  user.status = "in-progress";
  user.password = password || config.default_password;

  const newUser = await UserModel.create(user);
  if (Object.keys(newUser).length) {
    payload.user = newUser._id;
    payload.id = newUser.id;
    payload.role = "student";

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

const getSingleStudentFromDB = async (userId: string) => {
  const result = await UserModel.findById(userId);
  return result;
};

export const UserService = {
  createStudentIntoDB,
  getSingleUserFromDB: getSingleStudentFromDB,
};
