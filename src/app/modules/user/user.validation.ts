import z, { string } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    needsPasswordChange: z.boolean().default(true),
    role: z.enum(["student", "faculty", "admin"]),
    status: z.enum(["in-progress", "blocked"]).default("in-progress"),
    isDeleted: z.boolean().default(false),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
