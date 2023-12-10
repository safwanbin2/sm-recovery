import QueryBuilder from "../../builders/QueryBuilders";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

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

  const basicUpdate = await CourseModel.findByIdAndUpdate(id, remainingData, {
    new: true,
    runValidators: true,
  });

  if (preRequisiteCourses && preRequisiteCourses.length) {
    const deletePreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedResult = await CourseModel.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: {
          course: {
            $in: deletePreRequisites,
          },
        },
      },
    });

    const newPreRequisites = preRequisiteCourses.filter(
      (el) => el.course && !el.isDeleted
    );

    const newResult = await CourseModel.findByIdAndUpdate(id, {
      $addToSet: {
        preRequisiteCourses: {
          $each: newPreRequisites,
        },
      },
    });
  }

  const result = await CourseModel.findById(id);
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
};
