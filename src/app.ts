import express from "express";
import { UserRouter } from "./app/modules/user/user.route";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { routeNotFound } from "./app/middlewares/routeNotFound";
import { AcademicSemesterRouter } from "./app/modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouter } from "./app/modules/academicFaculty/academicFaculty.route";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/academic-semesters", AcademicSemesterRouter);
app.use("/api/v1/academic-faculties", AcademicFacultyRouter);

app.use(globalErrorHandler);
app.use(routeNotFound);
export default app;
