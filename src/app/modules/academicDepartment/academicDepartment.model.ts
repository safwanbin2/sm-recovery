import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicDepartment",
  },
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
