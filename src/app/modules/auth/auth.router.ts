import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.authValidationSchema),
  AuthController.logInUser
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post("/refresh-token", AuthController.renewAccessToken);
router.post("/forget-password", AuthController.forgetPassword);
router.post(
  "/reset-password",
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthController.resetPassword
);

export const AuthRouter = router;
