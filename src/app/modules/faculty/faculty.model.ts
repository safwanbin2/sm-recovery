import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";
import { nameSchema } from "../student/student.model";

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: {
      type: nameSchema,
      required: true,
    },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    role: {
      type: String,
      enum: ["faculty", "student", "admin"],
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const FacultyModel = model<TFaculty>("Faculty", facultySchema);
