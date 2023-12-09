import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

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
