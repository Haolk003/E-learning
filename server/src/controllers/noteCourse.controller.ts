import e, { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import noteCourseService from "../services/noteCourse.service";

export const createNoteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const { courseId, timing, lectureId, content } = req.body;
    const newNoteCourse = await noteCourseService.createNoteCourse({
      content,
      courseId,
      lectureId,
      timing,
      userId,
    });
    res.status(200).json({
      success: true,
      data: newNoteCourse,
      message: "Create Note Course Sucessfully",
    });
  }
);

export const updateNoteCourseById = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    const updateNoteCourse = await noteCourseService.updateNoteCourseById(
      id,
      content
    );

    res.status(200).json({
      success: 200,
      data: updateNoteCourse,
      message: "Note Course Successfully",
    });
  }
);

export const getNoteCourse = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const userId = req.me._id;
    const noteCourses = await noteCourseService.getNoteCourse(courseId, userId);
    res
      .status(200)
      .json({
        success: true,
        data: noteCourses,
        message: "Get Note Coures Successfully",
      });
  }
);

export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteCourse = await noteCourseService.deleteNoteCourseById(id);
    res
      .status(200)
      .json({
        success: true,
        data: deleteCourse,
        message: "Note Courses Deleted Successfully",
      });
  }
);
