import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.createAcademicfaculty
);

router.get("/", AcademicFacultyController.getAllAcademicFaculties);
router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRouter = router;
