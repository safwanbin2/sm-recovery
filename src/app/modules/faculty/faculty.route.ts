import { Router } from "express";
import { FacultyController } from "./faculty.controller";

const router = Router();

router.get("/", FacultyController.getAllFaculties);
router.delete("/:facultyId", FacultyController.deleteSingleFaculty);

export const FacultyRouter = router;
