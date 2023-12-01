import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRouter = router;
