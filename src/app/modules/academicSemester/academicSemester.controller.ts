import { catchAsync } from "../../utils/catchAsync";
import { sendReponse } from "../../utils/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body
  );

  sendReponse(res, {
    status: 500,
    success: true,
    message: "Created semester successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
