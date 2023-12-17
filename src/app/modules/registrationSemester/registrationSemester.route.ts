import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { RegistrationSemesterValidations } from "./registrationSemester.validation";
import { RegistrationSemesterController } from "./registrationSemester.controller";

const router = Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    RegistrationSemesterValidations.createRegistrationSemesterValidationSchema
  ),
  RegistrationSemesterController.createRegistrationSemester
);

export const RegistrationSemesterRouter = router;
