import express from "express";
import {
  updateLengthWatched,
  updateIsCompleted,
  getProgressLectureUserByCourseId,
  getProgessByUserId,
} from "../controllers/userCourseProgress.controller";
import { protect } from "../middlewares/auth";
const router = express.Router();

router.put("/update-lengthWatched-video", protect, updateLengthWatched);

router.put("/update-isCompleted-video", protect, updateIsCompleted);

router.get(
  "/get-progress-lecture/:courseId",
  protect,
  getProgressLectureUserByCourseId
);

router.get("/get-progress", protect, getProgessByUserId);

export default router;
