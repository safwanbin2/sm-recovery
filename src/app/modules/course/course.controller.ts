import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendReponse } from "../../utils/sendResponse";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseService.createCourseIntoDB(req.body);

  sendReponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res, next) => {
  const result = await CourseService.getAllCoursesFromDB(req.query);

  sendReponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Courses retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseService.getSingleCourseFromDB(courseId);

  sendReponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Single student retrieved successfully",
    data: result as object,
  });
});

const deleteCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseService.deleteCourseFromDB(courseId);

  sendReponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course Deleted successfully",
    data: result as object,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
