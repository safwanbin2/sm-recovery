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

const updateRegistrationSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum(["UPCOMING", "ONGOING", "END"])
      .default("UPCOMING")
      .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const RegistrationSemesterValidations = {
  createRegistrationSemesterValidationSchema,
  updateRegistrationSemesterValidationSchema,
};
