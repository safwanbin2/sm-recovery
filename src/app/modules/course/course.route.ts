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
router.patch(
  "/:courseId",
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);
router.patch("/:courseId", CourseController.deleteCourse);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidation.courseFacultyValidationSchema),
  CourseController.assignFacultiesWithCourse
);

export const CourseRouter = router;
