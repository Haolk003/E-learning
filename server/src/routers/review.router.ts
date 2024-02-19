import {
  getAllReview,
  addReview,
  getReviewsCourse,
  EditReviewCourse,
  StarPercentagesByCourseId,
  checkExistReviewPersonal,
} from "../controllers/review.controller";
import express from "express";
import { protect } from "../middlewares/auth";
const router = express.Router();

router.post("/create-review", protect, addReview);

router.get("/get-all-reviews", getAllReview);

router.get("/get-review-courseId/:courseId", getReviewsCourse);

router.put("/update-review/:id", protect, EditReviewCourse);

router.get("/reviews/percentage/:id", StarPercentagesByCourseId);

router.get(
  "/reviews/check-exist-review/:courseId",
  protect,
  checkExistReviewPersonal
);

export default router;
