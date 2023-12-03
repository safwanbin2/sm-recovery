import z from "zod";

const nameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

// Zod schema for TGuardian
const guardianValidationSchema = z.object({
  name: nameValidationSchema,
  contactNo: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      id: z.string().optional(),
      user: z.string().optional(), // Assuming ObjectId is represented as a UUID
      name: nameValidationSchema,
      email: z.string().email(),
      gender: z.enum(["male", "female"]),
      role: z.enum(["student", "faculty", "admin"]).optional(),
      dateOfBirth: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: guardianValidationSchema,
      profileImage: z.string(),
      academicDepartment: z.string(),
      admissionSemester: z.string(), // Assuming ObjectId is represented as a UUID
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
};
