import { Schema, model } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    min: 10,
  },
  code: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  preRequisiteCourses: {
    type: [preRequisiteCoursesSchema],
    required: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const CourseModel = model<TCourse>("Course", courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  ],
});

export const CourseFacultyModel = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);
