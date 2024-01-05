import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";
import { TFaculty } from "../faculty/faculty.interface";
import { FacultyModel } from "../faculty/faculty.model";
import { JwtPayload } from "jsonwebtoken";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createStudentIntoDB = async (
  imgFile: any,
  password: string,
  payload: TStudent
) => {
  let user: Partial<TUser> = {};

  const admissionSemester = await AcademicSemesterModel.findOne({
    _id: payload.admissionSemester,
  });
  user.id = await generateStudentId(admissionSemester as any);

  user.role = "student";
  user.email = payload?.email;
  user.status = "in-progress";
  user.password = password || config.default_password;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { secure_url } = await sendImageToCloudinary(imgFile.path);

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new Error("Could not create user");
    }
    payload.user = newUser[0]._id;
    payload.id = newUser[0].id;
    payload.role = "student";
    payload.profileImage = secure_url;

    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new Error("Could not create student");
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const getMeFromDB = async (user: JwtPayload) => {
  const { id, role } = user;
  const result = await UserModel.findOne({ id, role });
  if (!result) {
    throw new Error("User do not exists");
  }
  return result;
};

// faculty
const createFacultyIntoDB = async (password: string, faculty: TFaculty) => {
  let user: Partial<TUser> = {};

  user.id = await generateFacultyId();
  user.password = password || config.default_password;
  user.role = "faculty";
  user.status = "in-progress";

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await UserModel.create([user], { session });
    if (!newUser.length) {
      throw new Error("Could not create User");
    }

    faculty.user = newUser[0]._id;
    faculty.id = newUser[0].id;
    faculty.role = "faculty";

    const newFaculty = await FacultyModel.create([faculty], { session });
    if (!newFaculty.length) {
      throw new Error("Could not create Faculty");
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Could not perform the action");
  }
};

export const UserService = {
  createStudentIntoDB,
  getMeFromDB,
  createFacultyIntoDB,
};
