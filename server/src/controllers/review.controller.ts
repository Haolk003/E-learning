import { Request, Response, NextFunction } from "express";

import { CatchAsyncError } from "../middlewares/catchAsyncError";
import reviewService from "../services/review.service";
import { resolveSoa } from "dns";

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const { courseId, comment, rating } = req.body;

    const newReview = await reviewService.addReview({
      courseId,
      comment,
      rating,
      userId,
    });
    res.status(200).json({
      success: true,
      data: newReview,
      message: "Create Review Successfully",
    });
  }
);

export const getAllReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await reviewService.getAllReview();
    res.status(200).json({
      success: true,
      data: reviews,
      message: "Get All Course Successfully",
    });
  }
);
//get Reviews in Course
export const getReviewsCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const reviews = await reviewService.getReviewsCourse(courseId);
    res.status(200).json({
      success: true,
      data: reviews,
      message: "Get Reviews Successfully",
    });
  }
);
//Edit Review By Id
export const EditReviewCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.me._id;
    const data = req.body;
    const updateCourse = await reviewService.EditReviews(id, userId, data);
    res.status(200).json({
      success: true,
      data: updateCourse,
      message: "Review Updated Successfully",
    });
  }
);

export const StarPercentagesByCourseId = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const percentage = await reviewService.starPercentageByCourseId(id);
    if (!percentage) {
      res
        .status(200)
        .json({ success: true, message: "No reviews found for this course" });
    } else {
      res.status(200).json({
        success: true,
        data: percentage,
        message: "Calculate Percentage of Star Successfully",
      });
    }
  }
);

export const checkExistReviewPersonal = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const userId = req.me._id;
    const checkExist = await reviewService.checkExistReviewPersonal(
      courseId,
      userId
    );
    if (checkExist) {
      res
        .status(200)
        .json({ success: true, data: checkExist, message: "Exist Review" });
    } else {
      res
        .status(200)
        .json({ success: true, data: checkExist, message: "Not Exist Review" });
    }
  }
);

export const getAllReviewsUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.me._id;
  const reviews = await reviewService.getAllReviewUserId(userId);
  res
    .status(200)
    .json({
      success: true,
      data: reviews,
      message: "Get All Reviews for user successfully",
    });
};
