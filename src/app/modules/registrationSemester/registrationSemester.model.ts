import { Schema, model } from "mongoose";
import { TRegistrationSemester } from "./registrationSemester.interface";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";

const registrationSemesterSchema = new Schema<TRegistrationSemester>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      // unique: true,
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

registrationSemesterSchema.pre("save", async function () {
  const payload = this;
  const isSemesterExist = await AcademicSemesterModel.findById(
    payload?.academicSemester
  );
  if (!isSemesterExist) {
    throw new Error("Academic Semester Does not exists");
  }

  const isAlreadyRegistered = await RegistrationSemesterModel.findOne({
    academicSemester: this?.academicSemester,
  });
  if (isAlreadyRegistered) {
    throw new Error("Academic Semester is alreadty registerd");
  }
});

export const RegistrationSemesterModel = model<TRegistrationSemester>(
  "RegistrationSemester",
  registrationSemesterSchema
);
