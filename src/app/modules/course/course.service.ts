import mongoose from "mongoose";
import QueryBuilder from "../../builders/QueryBuilders";
import { TCourse, TCourseFaculty } from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, any>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), query)
    .search(["title", "prefix"])
    // .paginate()
    .sort();
  const result = await courseQuery.modelQuery.populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const basicUpdate = await CourseModel.findByIdAndUpdate(id, remainingData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!basicUpdate) {
      throw new Error("Could not update course");
    }

    if (preRequisiteCourses && preRequisiteCourses.length) {
      const deletePreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedResult = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: {
                $in: deletePreRequisites,
              },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletedResult) {
        throw new Error("Could not update course");
      }

      const newPreRequisites = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      );

      const newResult = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: newPreRequisites,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!newPreRequisites) {
        throw new Error("Could not update course");
      }
    }

    await session.commitTransaction();
    await session.endSession();
    const result = await CourseModel.findById(id);
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Could not update course");
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: TCourseFaculty
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: {
          $each: payload,
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
};
