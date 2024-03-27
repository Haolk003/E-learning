"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.getNoteCourse = exports.updateNoteCourseById = exports.createNoteCourse = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const noteCourse_service_1 = __importDefault(require("../services/noteCourse.service"));
exports.createNoteCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { courseId, timing, lectureId, content } = req.body;
    const newNoteCourse = await noteCourse_service_1.default.createNoteCourse({
        content,
        courseId,
        lectureId,
        timing,
        userId,
    });
    res.status(200).json({
        success: true,
        data: newNoteCourse,
        message: "Create Note Course Sucessfully",
    });
});
exports.updateNoteCourseById = (0, catchAsyncError_1.CatchAsyncError)(async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const updateNoteCourse = await noteCourse_service_1.default.updateNoteCourseById(id, content);
    res.status(200).json({
        success: 200,
        data: updateNoteCourse,
        message: "Note Course Successfully",
    });
});
exports.getNoteCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.me._id;
    const noteCourses = await noteCourse_service_1.default.getNoteCourse(courseId, userId);
    res
        .status(200)
        .json({
        success: true,
        data: noteCourses,
        message: "Get Note Coures Successfully",
    });
});
exports.deleteCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res) => {
    const { id } = req.params;
    const deleteCourse = await noteCourse_service_1.default.deleteNoteCourseById(id);
    res
        .status(200)
        .json({
        success: true,
        data: deleteCourse,
        message: "Note Courses Deleted Successfully",
    });
});
