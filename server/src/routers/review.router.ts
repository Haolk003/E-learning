import {
  getAllReview,
  addReview,
  getReviewsCourse,
  EditReviewCourse,
  StarPercentagesByCourseId,
} from "../controllers/review.controller";
import express from "express";
import { protect } from "../middlewares/auth";
const router = express.Router();

router.post("/create-review", protect, addReview);

router.get("/get-all-reviews", getAllReview);

router.get("/get-review-courseId/:courseId", getReviewsCourse);

router.put("/update-review/:id", protect, EditReviewCourse);

router.get("/reviews/percentage/:id", StarPercentagesByCourseId);
export default router;
