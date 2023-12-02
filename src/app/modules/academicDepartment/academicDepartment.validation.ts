import z from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Department name is required",
      invalid_type_error: "wrong Type",
    }),
    academicFaculty: z.string({ required_error: "Faculty name is requried" }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
