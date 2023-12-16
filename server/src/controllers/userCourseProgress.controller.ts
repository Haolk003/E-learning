import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import userCourseProgressService from "../services/userCourseProgress.service";

export const updateLengthWatched = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const { courseId, lectureId, lengthWatched } = req.body;
    const progress = await userCourseProgressService.updateLenghtWatched({
      courseId: courseId,
      lectureId,
      userId,
      lengthWatched,
    });
    res.status(200).json({
      success: true,
      data: progress,
      message: "Update Length Watched Succeessfully",
    });
  }
);

export const updateIsCompleted = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const { courseId, lectureId, isCompleted } = req.body;
    const progress = await userCourseProgressService.updateIsCompleted({
      courseId,
      isCompleted,
      lectureId,
      userId,
    });
    res.status(200).json({
      success: true,
      data: progress,
      message: "Update Is Completed Successfully",
    });
  }
);

export const getProgressLectureUserByCourseId = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const { courseId } = req.params;
    const progress =
      await userCourseProgressService.getProgressLectureUserByCourseId({
        courseId: courseId,
        userId: userId,
      });
    res
      .status(200)
      .json({
        success: true,
        data: progress,
        message: "GET Progress Lecture User By CourseId",
      });
  }
);
