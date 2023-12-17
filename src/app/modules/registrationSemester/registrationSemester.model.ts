import { Schema, model } from "mongoose";
import { TRegistrationSemester } from "./registrationSemester.interface";

const registrationSemesterSchema = new Schema<TRegistrationSemester>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "AcademicSemester",
    },
    status: {
      type: String,
      enum: ["UPCOMING", "ONGOING", "END"],
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);

export const RegistrationSemesterModel = model<TRegistrationSemester>(
  "RegistrationSemester",
  registrationSemesterSchema
);
