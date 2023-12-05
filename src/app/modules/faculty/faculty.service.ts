import mongoose from "mongoose";
import { FacultyModel } from "./faculty.model";
import { UserModel } from "../user/user.model";

const getAllFacultiesFromDB = async (query: Record<string, any>) => {
  let page = 1;
  let limit = 5;
  let skip = 0;

  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }

  let fields = "";
  if (query?.fields) {
    fields = query?.fields.split(",").join(" ");
  }

  const result = await FacultyModel.find()
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .skip(skip)
    .limit(limit)
    .select(fields);
  return result;
};

const deleteSingleFacultyFromDB = async (facultyId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFromUser = await UserModel.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { new: true, session }
    );

    if (!Object.keys(deletedFromUser as any).length) {
      throw new Error("Could not delete from user");
    }

    const deletedFromFaculty = await FacultyModel.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { new: true, session }
    );
    if (!Object.keys(deletedFromFaculty as any).length) {
      throw new Error("Could not delete from faculty");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFromUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error("Error Occured");
  }
};

export const FacultyService = {
  getAllFacultiesFromDB,
  deleteSingleFacultyFromDB,
};
