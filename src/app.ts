import express from "express";
import { UserRouter } from "./app/modules/user/user.route";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { routeNotFound } from "./app/middlewares/routeNotFound";
import { AcademicSemesterRouter } from "./app/modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouter } from "./app/modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRouter } from "./app/modules/academicDepartment/academicDepartment.route";
import { StudentRouter } from "./app/modules/student/student.route";
import { FacultyRouter } from "./app/modules/faculty/faculty.route";
import { CourseRouter } from "./app/modules/course/course.route";
import { RegistrationSemesterRouter } from "./app/modules/registrationSemester/registrationSemester.route";
import { OfferedCourseRouter } from "./app/modules/offeredCourse/offeredCourse.route";
import { AuthRouter } from "./app/modules/auth/auth.router";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/students", StudentRouter);
app.use("/api/v1/faculties", FacultyRouter);
app.use("/api/v1/academic-semesters", AcademicSemesterRouter);
app.use("/api/v1/academic-faculties", AcademicFacultyRouter);
app.use("/api/v1/academic-departments", AcademicDepartmentRouter);
app.use("/api/v1/courses", CourseRouter);
app.use("/api/v1/semester-registration", RegistrationSemesterRouter);
app.use("/api/v1/Offered-courses", OfferedCourseRouter);
app.use("/api/v1/auth", AuthRouter);

app.use(globalErrorHandler);
app.use(routeNotFound);
export default app;
