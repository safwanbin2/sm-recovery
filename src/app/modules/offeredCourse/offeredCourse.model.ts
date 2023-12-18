import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    registrationSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "RegistrationSemester",
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: ["sat", "sun", "mon", "tue", "wed", "thu", "fri"],
        required: true,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OfferedCourseModel = model<TOfferedCourse>(
  "OfferedCourse",
  offeredCourseSchema
);
