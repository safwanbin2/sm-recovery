import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await CourseModel.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
