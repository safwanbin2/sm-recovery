import { Schema, model } from "mongoose";
import { TGuardian, TName, TStudent } from "./student.interface";

export const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export const guardianSchema = new Schema<TGuardian>({
  name: {
    type: nameSchema,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: nameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
      min: 11,
      max: 15,
    },
    emergencyContactNo: {
      type: String,
      required: true,
      min: 11,
      max: 15,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: guardianSchema,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const StudentModel = model<TStudent>("Student", studentSchema);
