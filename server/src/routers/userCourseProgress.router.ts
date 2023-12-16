import express from "express";
import {
  updateLengthWatched,
  updateIsCompleted,
  getProgressLectureUserByCourseId,
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
export default router;
