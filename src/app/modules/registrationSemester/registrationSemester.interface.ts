import { Types } from "mongoose";

export type TRegistrationSemester = {
  academicSemester: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "END";
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
