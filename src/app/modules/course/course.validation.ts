import z from "zod";

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(10),
    code: z.number().int().positive(),
    credit: z.number().int().positive(),
    prefix: z.string(),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
};
