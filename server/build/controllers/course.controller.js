"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewCourse = exports.getPopularCourses = exports.getOverratedCourses = exports.getCourseOfInstructor = exports.findCourseCategoryAndSubCategory = exports.pucharserCourse = exports.getCoursePublic = exports.getMyCourseIntructor = exports.deleteCourseById = exports.getAllCoursePublic = exports.publicCourse = exports.deleteImageOrVideo = exports.uploadVideo = exports.findCourseById = exports.uploadImageCourse = exports.createEditCourseStep3 = exports.createEditCourseStep2 = exports.createEditCourseStep1 = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const course_service_1 = __importDefault(require("../services/course.service"));
exports.createEditCourseStep1 = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const data = req.body;
    const userId = req.me._id;
    const { id } = req.params;
    const course = await course_service_1.default.createCourseStep1(data, userId, id);
    res.status(200).json({
        status: 200,
        data: course,
        message: "Course create or edit step1 successfully",
    });
});
exports.createEditCourseStep2 = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { benefits, prerequisites } = req.body;
    const courseId = req.params.id;
    const course = await course_service_1.default.createEditCourseStep2({ benefits, prerequisites }, courseId);
    res.status(200).json({
        status: 200,
        data: course,
        message: "Course create or edit step2 successfully",
    });
});
exports.createEditCourseStep3 = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const data = req.body;
    const courseId = req.params.id;
    const course = await course_service_1.default.createEditCourseStep3(data, courseId);
    res.status(200).json({
        status: 200,
        data: course,
        message: "Course create or edit step3 successfully",
    });
});
exports.uploadImageCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const file = req.file;
    const data = await course_service_1.default.uploadImageCourse(file);
    res
        .status(200)
        .json({ status: 200, data: data, message: "Upload file successfully" });
});
exports.findCourseById = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const course = await course_service_1.default.findCourseById(id);
    res.status(200).json({
        success: true,
        data: course,
        message: "Find Course successfully",
    });
});
exports.uploadVideo = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { count } = req.params;
    const file = req.file;
    const data = await course_service_1.default.uploadVideo(file, count);
    res.status(200).json({
        success: true,
        message: "Upload Video successfully",
        data: count,
    });
});
exports.deleteImageOrVideo = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { public_id } = req.body;
    const result = await course_service_1.default.deleteImageVideo(public_id);
    res
        .status(200)
        .json({ success: true, message: "File Deleted successfully" });
});
exports.publicCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const result = await course_service_1.default.publicCourse(id);
    res
        .status(200)
        .json({ success: true, message: "Course Public Successfully" });
});
exports.getAllCoursePublic = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me?._id;
    const { courses, totalCount } = await course_service_1.default.getAllCourseByAdmin({
        ...req.query,
    }, id);
    res.status(200).json({
        success: true,
        data: { courses, totalCount },
        message: "Get Courses Successfully",
    });
});
exports.deleteCourseById = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    await course_service_1.default.deleteCourse(id);
    res
        .status(200)
        .json({ success: true, message: "Course Deleted successfully" });
});
exports.getMyCourseIntructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { _id } = req.me;
    const { keyword, sort, limit, page } = req.query;
    const { countQuery, courses } = await course_service_1.default.getMyCourseIntructor({
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
});
//get Course Publised
exports.getCoursePublic = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const course = await course_service_1.default.findCourseByIdPublic(id);
    res.status(200).json({
        success: true,
        data: course,
        message: "Get Course Successfully",
    });
});
exports.pucharserCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.me._id;
    const course = await course_service_1.default.getCoursePurhaser(id, userId);
    res.status(200).json({
        success: true,
        data: course,
        message: "Get Course Successfully",
    });
});
exports.findCourseCategoryAndSubCategory = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { page, sort } = req.query;
    const { categoryId, subCategoryId } = req.params;
    const courses = await course_service_1.default.findCourseCategoryAndSubCategory({
        categoryId,
        subCategoryId,
        pageQuery: page,
        sortQuery: sort,
    });
    res.status(200).json({
        success: true,
        data: courses,
        message: "Get Courses Category Successfully",
    });
});
exports.getCourseOfInstructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { page } = req.query;
    const { instructorId } = req.params;
    const courses = await course_service_1.default.getMyCourseOfInstructor(instructorId, page);
    res.status(200).json({
        success: true,
        data: courses,
        message: "Get Courses Of Instructor successfully",
    });
});
exports.getOverratedCourses = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me ? req.me._id : undefined;
    const courses = await course_service_1.default.getOverratedCourses(id);
    res.status(200).json({
        success: true,
        data: courses,
        message: "GEt Overrated Courses Successfully",
    });
});
exports.getPopularCourses = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me ? req.me._id : undefined;
    const courses = await course_service_1.default.getPopularCourses(id);
    res.status(200).json({
        success: true,
        data: courses,
        message: "Get Popular Courses Successfully",
    });
});
exports.getNewCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me ? req.me._id : undefined;
    const courses = await course_service_1.default.getNewCourses(id);
    res.status(200).json({
        success: true,
        data: courses,
        message: "Get New Courses Successfully",
    });
});
