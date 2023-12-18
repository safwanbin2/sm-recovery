import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourseModel.create(payload);
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
