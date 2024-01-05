import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { StudentValidation } from "../student/student.validation";
import { FacultyValidation } from "../faculty/faculty.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.post(
  "/create-student",
  // auth(USER_ROLE.faculty),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log({ body: req.body });
    next();
  },
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty
);

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe
);

export const UserRouter = router;
