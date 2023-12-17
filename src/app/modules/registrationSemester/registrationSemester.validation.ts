import z from "zod";

const createRegistrationSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(["UPCOMING", "ONGOING", "END"]).default("UPCOMING"),
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const RegistrationSemesterValidations = {
  createRegistrationSemesterValidationSchema,
};
