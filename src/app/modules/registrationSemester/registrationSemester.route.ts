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

router.get("/", RegistrationSemesterController.getAllRegistrationSemester);
router.get(
  "/:id",
  RegistrationSemesterController.getSingleRegistrationSemester
);
router.patch(
  "/:id",
  validateRequest(
    RegistrationSemesterValidations.updateRegistrationSemesterValidationSchema
  ),
  RegistrationSemesterController.updateRegistrationSemester
);

export const RegistrationSemesterRouter = router;
