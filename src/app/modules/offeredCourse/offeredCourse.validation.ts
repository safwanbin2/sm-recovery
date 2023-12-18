import z from "zod";

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      registrationSemester: z.string(),
      academicSemester: z.string().optional(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum(["sat", "sun", "mon", "tue", "wed", "thu", "fri"])),
      startTime: z.string().refine(
        (time) => {
          const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return regex.test(time);
        },
        { message: "Invalid time format, expected HH:MM in 24 hour format" }
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return regex.test(time);
        },
        { message: "Invalid time format, expected HH:MM in 24 hour format" }
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      { message: "Can not end before start" }
    ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
};
