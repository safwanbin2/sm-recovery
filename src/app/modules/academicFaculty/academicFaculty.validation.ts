import z from "zod";

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
};
