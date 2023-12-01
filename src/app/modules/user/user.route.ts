import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { StudentValidation } from "../student/student.validation";

const router = Router();

router.post(
  "/create-student",
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent
);

export const UserRouter = router;
