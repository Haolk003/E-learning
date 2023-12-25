import express from "express";
import {
  createNoteCourse,
  deleteCourse,
  getNoteCourse,
  updateNoteCourseById,
} from "../controllers/noteCourse.controller";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/create-note-course", protect, createNoteCourse);

router.put("/update-note-course/:id", protect, updateNoteCourseById);

router.get("/get-note-course/:courseId", protect, getNoteCourse);

router.delete("/delete-note-course/:id", protect, deleteCourse);

export default router;
