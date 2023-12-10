import z from "zod";

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
});

const updatePreRequisiteCoursesValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
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

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(10).optional(),
    code: z.number().int().positive().optional(),
    credit: z.number().int().positive().optional(),
    prefix: z.string().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const courseFacultyValidationSchema = z.object({
  body: z.object({
    course: z.string().optional(),
    faculties: z.array(z.string()),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  courseFacultyValidationSchema,
};
