"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const course_controller_1 = require("../controllers/course.controller");
const uploadImage_1 = require("../middlewares/uploadImage");
const uploadVideo_1 = require("../middlewares/uploadVideo");
const router = express_1.default.Router();
router.post("/create-course-step1/:id", auth_1.protect, (0, auth_1.authorizeRoles)("instructor", "admin"), course_controller_1.createEditCourseStep1);
router;
router.put("/create-edit-course-step2/:id", auth_1.protect, (0, auth_1.authorizeRoles)("instructor", "admin"), course_controller_1.createEditCourseStep2);
router.put("/create-edit-course-step3/:id", auth_1.protect, (0, auth_1.authorizeRoles)("instructor", "admin"), course_controller_1.createEditCourseStep3);
router.post("/upload-image-course", auth_1.protect, 
// authorizeRoles("admin"),
uploadImage_1.uploadPhoto.single("myFile"), 
// ImgResize,
course_controller_1.uploadImageCourse);
router.get("/get-course-instructor/:id", auth_1.protect, (0, auth_1.authorizeRoles)("instructor", "admin"), course_controller_1.findCourseById);
router.get("/get-course-client/:id");
router.put("/uploadVideo/:count", uploadVideo_1.uploadVideoMulter.single("myFile"), course_controller_1.uploadVideo);
router.put("/deleteFile", auth_1.protect, course_controller_1.deleteImageOrVideo);
router.put("/public-course/:id", auth_1.protect, course_controller_1.publicCourse);
router.get("/get-all-courses", auth_1.extractUserId, course_controller_1.getAllCoursePublic);
router.delete("/delete-course/:id", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), course_controller_1.deleteCourseById);
router.get("/get-intructor-courses", auth_1.protect, course_controller_1.getMyCourseIntructor);
router.get("/get-purchased-course/:id", auth_1.protect, course_controller_1.pucharserCourse);
router.get("/get-course-public/:id", course_controller_1.getCoursePublic);
router.get("/get-courses-category/:categoryId/:subCategoryId", course_controller_1.findCourseCategoryAndSubCategory);
router.get("/get-courses-category/:categoryId", course_controller_1.findCourseCategoryAndSubCategory);
router.get("/get-courses-instructor/:instructorId", course_controller_1.getCourseOfInstructor);
router.get("/get-new-courses-home", auth_1.extractUserId, course_controller_1.getNewCourse);
router.get("/get-popular-courses-home", auth_1.extractUserId, course_controller_1.getPopularCourses);
router.get("/get-overrated-courses-home", auth_1.extractUserId, course_controller_1.getOverratedCourses);
exports.default = router;
