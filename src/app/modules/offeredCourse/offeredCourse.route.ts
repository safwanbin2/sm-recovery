import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseController } from "./offeredCourse.controller";

const router = Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse
);

export const OfferedCourseRouter = router;
