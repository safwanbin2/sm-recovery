import { Types } from "mongoose";

export type TName = {
  firstName: string;
  lastName: string;
};

export type TGuardian = {
  name: TName;
  contactNo: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TName;
  email: string;
  gender: "male" | "female";
  role: "student" | "faculty" | "admin";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TGuardian;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
  // createdAt:
  // updatedAt
};
