import { Types } from "mongoose";

export type TOfferedCourse = {
  registrationSemester: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  // days: "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";
  days: ("sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri")[];
  startTime: String;
  endTime: string;
};
