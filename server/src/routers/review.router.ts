import {
  getAllReview,
  addReview,
  getReviewsCourse,
  EditReviewCourse,
} from "../controllers/review.controller";
import express from "express";
import { protect } from "../middlewares/auth";
const router = express.Router();

router.post("/create-review", protect, addReview);

router.get("/get-all-reviews", getAllReview);

router.get("/get-review-courseId/:courseId", getReviewsCourse);

router.put("/update-review/:id", protect, EditReviewCourse);
export default router;
