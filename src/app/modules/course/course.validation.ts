import z from "zod";

export const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean(),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(10),
    code: z.number().int().positive(),
    credit: z.number().int().positive(),
    prefix: z.string(),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .default([]),
    isDeleted: z.boolean().default(false),
  }),
});
