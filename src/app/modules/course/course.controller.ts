import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseService.createCourseIntoDB(req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res, next) => {
  const result = await CourseService.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Courses retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseService.getSingleCourseFromDB(courseId);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Single student retrieved successfully",
    data: result as object,
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseService.updateCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Course Updated successfully",
    data: result as object,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseService.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Assigned course successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const result = await CourseService.deleteCourseFromDB(courseId);

  sendResponse(res, {
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
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
};
