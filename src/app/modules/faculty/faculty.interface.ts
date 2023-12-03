import { Types } from "mongoose";
import { TName } from "../student/student.interface";

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  designation: string;
  email: string;
  gender: "male" | "female";
  role: "faculty" | "student" | "admin";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
