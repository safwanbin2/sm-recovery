import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { RegistrationSemesterModel } from "../registrationSemester/registrationSemester.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  // destructuring the _ids from payload
  const {
    registrationSemester,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    days,
    startTime,
    endTime,
    section,
  } = payload;
  // validations to check if the _ids exists
  const isRegistrationSemesterExists = await RegistrationSemesterModel.findById(
    registrationSemester
  );
  if (!isRegistrationSemesterExists) {
    throw new Error("Registration Semester not found");
  }
  const academicSemester = isRegistrationSemesterExists?.academicSemester;

  const isAcademicDepartmentExists = await AcademicDepartmentModel.findById(
    academicDepartment
  );
  if (!isAcademicDepartmentExists) {
    throw new Error("Academic Deaprtment not found");
  }

  const isAcademicFacultyExists = await AcademicFacultyModel.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExists) {
    throw new Error("Academic Faculty not found");
  }

  const isFacultyExists = await FacultyModel.findById(faculty);
  if (!isFacultyExists) {
    throw new Error("Faculty not found");
  }

  const isCourseExists = await CourseModel.findById(course);
  if (!isCourseExists) {
    throw new Error("Course not found");
  }

  // checking schedule

  const newSchedule = {
    startTime,
    endTime,
  };

  const existingSchedules = await OfferedCourseModel.find({
    faculty,
    days: { $in: days },
  }).select({
    startTime: 1,
    endTime: 1,
  });

  const hasTimeConflictBetweenEach = hasTimeConflict(
    existingSchedules as any,
    newSchedule as any
  );
  console.log(hasTimeConflictBetweenEach);
  if (hasTimeConflictBetweenEach) {
    throw new Error(
      `Faculty is busy in that schedule for time ${startTime} - ${endTime}`
    );
  }

  const isSectionBooked = await OfferedCourseModel.find({
    registrationSemester,
    section,
  });
  if (isSectionBooked) {
    throw new Error("Section is already booked for this semester");
  }

  // Creating after validation
  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
