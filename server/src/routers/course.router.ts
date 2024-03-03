import express from "express";
import { protect, authorizeRoles, extractUserId } from "../middlewares/auth";
import {
  createEditCourseStep1,
  createEditCourseStep2,
  createEditCourseStep3,
  uploadImageCourse,
  findCourseById,
  uploadVideo,
  deleteImageOrVideo,
  publicCourse,
  getAllCoursePublic,
  deleteCourseById,
  getMyCourseIntructor,
  getCoursePublic,
  pucharserCourse,
  findCourseCategoryAndSubCategory,
  getCourseOfInstructor,
  getNewCourse,
  getOverratedCourses,
  getPopularCourses,
} from "../controllers/course.controller";
import { ImgResize, uploadPhoto } from "../middlewares/uploadImage";
import { uploadVideoMulter } from "../middlewares/uploadVideo";

const router = express.Router();

router.post(
  "/create-course-step1/:id",
  protect,
  authorizeRoles("instructor", "admin"),
  createEditCourseStep1
);
router;
router.put(
  "/create-edit-course-step2/:id",
  protect,
  authorizeRoles("instructor", "admin"),
  createEditCourseStep2
);

router.put(
  "/create-edit-course-step3/:id",
  protect,
  authorizeRoles("instructor", "admin"),
  createEditCourseStep3
);

router.post(
  "/upload-image-course",
  // protect,
  // authorizeRoles("admin"),
  uploadPhoto.single("myFile"),
  ImgResize,
  uploadImageCourse
);
router.get(
  "/get-course-instructor/:id",
  protect,
  authorizeRoles("instructor", "admin"),
  findCourseById
);

router.get("/get-course-client/:id");

router.put(
  "/uploadVideo/:count",
  uploadVideoMulter.single("myFile"),
  uploadVideo
);

router.put("/deleteFile", protect, deleteImageOrVideo);

router.put(
  "/public-course/:id",
  protect,

  publicCourse
);

router.get("/get-all-courses", extractUserId, getAllCoursePublic);

router.delete(
  "/delete-course/:id",
  protect,
  authorizeRoles("admin"),
  deleteCourseById
);

router.get("/get-intructor-courses", protect, getMyCourseIntructor);

router.get("/get-purchased-course/:id", protect, pucharserCourse);

router.get("/get-course-public/:id", getCoursePublic);

router.get(
  "/get-courses-category/:categoryId/:subCategoryId",
  findCourseCategoryAndSubCategory
);

router.get(
  "/get-courses-category/:categoryId",
  findCourseCategoryAndSubCategory
);

router.get("/get-courses-instructor/:instructorId", getCourseOfInstructor);

router.get("/get-new-courses-home", extractUserId, getNewCourse);

router.get("/get-popular-courses-home", extractUserId, getPopularCourses);

router.get("/get-overrated-courses-home", extractUserId, getOverratedCourses);
export default router;
