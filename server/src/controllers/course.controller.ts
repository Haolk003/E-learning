import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import courseService from "../services/course.service";
import axios from "axios";

export const createEditCourseStep1 = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const userId = req.me._id;
    const { id } = req.params;
    const course = await courseService.createCourseStep1(data, userId, id);
    res.status(200).json({
      status: 200,
      data: course,
      message: "Course create or edit step1 successfully",
    });
  }
);

export const createEditCourseStep2 = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { benefits, prerequisites } = req.body;
    const courseId = req.params.id;
    const course = await courseService.createEditCourseStep2(
      { benefits, prerequisites },
      courseId
    );
    res.status(200).json({
      status: 200,
      data: course,
      message: "Course create or edit step2 successfully",
    });
  }
);
export const createEditCourseStep3 = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const courseId = req.params.id;
    const course = await courseService.createEditCourseStep3(data, courseId);
    res.status(200).json({
      status: 200,
      data: course,
      message: "Course create or edit step3 successfully",
    });
  }
);

export const uploadImageCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    const data = await courseService.uploadImageCourse(file);

    res
      .status(200)
      .json({ status: 200, data: data, message: "Upload file successfully" });
  }
);

export const findCourseById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const course = await courseService.findCourseById(id);
    res.status(200).json({
      success: true,
      data: course,
      message: "Find Course successfully",
    });
  }
);
export const uploadVideo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { count } = req.params;
    const file = req.file;
    const data = await courseService.uploadVideo(file, count);
    res.status(200).json({
      success: true,
      message: "Upload Video successfully",
      data: count,
    });
  }
);

export const deleteImageOrVideo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { public_id } = req.body;
    const result = await courseService.deleteImageVideo(public_id);

    res
      .status(200)
      .json({ success: true, message: "File Deleted successfully" });
  }
);

export const publicCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await courseService.publicCourse(id);
    res
      .status(200)
      .json({ success: true, message: "Course Public Successfully" });
  }
);
interface QueryType {
  keyword?: string;
  sort?: string;
  limit?: number;
  page?: number;
}
export const getAllCoursePublic = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courses, totalCount } = await courseService.getAllCourseByAdmin({
      ...req.query,
    });
    res.status(200).json({
      success: true,
      data: { courses, totalCount },
      message: "Get Courses Successfully",
    });
  }
);

export const deleteCourseById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await courseService.deleteCourse(id);
    res
      .status(200)
      .json({ success: true, message: "Course Deleted successfully" });
  }
);

export const getMyCourseIntructor = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.me;
    const { keyword, sort, limit, page } = req.query as QueryType;
    const { countQuery, courses } = await courseService.getMyCourseIntructor({
      userId: _id,
      keyword,
      sort,
      limit,
      page,
    });
    res.status(200).json({
      success: true,
      data: { courses: courses, countQuery: countQuery },
      message: "Get Your Courses Successfully",
    });
  }
);

//get Course Publised
export const getCoursePublic = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const course = await courseService.findCourseByIdPublic(id);
    res.status(200).json({
      success: true,
      data: course,
      message: "Get Course Successfully",
    });
  }
);

export const pucharserCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.me._id;
    const course = await courseService.getCoursePurhaser(id, userId);
    res.status(200).json({
      success: true,
      data: course,
      message: "Get Course Successfully",
    });
  }
);

export const findCourseCategoryAndSubCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page, sort } = req.query as any;
    const { categoryId, subCategoryId } = req.params;
    const courses = await courseService.findCourseCategoryAndSubCategory({
      categoryId,
      subCategoryId,
      pageQuery: page,
      sortQuery: sort,
    });
    res
      .status(200)
      .json({
        success: true,
        data: courses,
        message: "Get Courses Category Successfully",
      });
  }
);
