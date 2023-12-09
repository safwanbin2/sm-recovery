import { Router } from "express";
import { CourseController } from "./course.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";

const router = Router();

// Routes
router.post(
  "/create-course",
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);
router.get("/", CourseController.getAllCourse);
router.get("/:courseId", CourseController.getSingleCourse);
router.put("/:courseId", CourseController.deleteCourse);

export const CourseRouter = router;
