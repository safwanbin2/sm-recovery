import z from "zod";

export const nameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      id: z.string().optional(),
      user: z.string().optional(),
      name: nameValidationSchema,
      designation: z.string(),
      email: z.string().email(),
      gender: z.enum(["male", "female"]),
      role: z.enum(["faculty", "student", "admin"]).optional(),
      dateOfBirth: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string(),
      academicDepartment: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
};
