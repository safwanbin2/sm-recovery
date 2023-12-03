import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { StudentValidation } from "../student/student.validation";
import { FacultyValidation } from "../faculty/faculty.validation";

const router = Router();

router.post(
  "/create-student",
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty
);

router.get("/:userId", UserController.getSingleUser);

export const UserRouter = router;
