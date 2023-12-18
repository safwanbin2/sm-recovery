import z from "zod";

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    registrationSemester: z.string(),
    academicSemester: z.string().optional(),
    academicDepartment: z.string(),
    academicFaculty: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum(["sat", "sun", "mon", "tue", "wed", "thu", "fri"])),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
};
