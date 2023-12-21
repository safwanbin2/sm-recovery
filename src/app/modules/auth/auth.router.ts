import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidations.authValidationSchema),
  AuthController.logInUser
);

export const AuthRouter = router;
