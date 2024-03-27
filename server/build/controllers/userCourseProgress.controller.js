"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgessByUserId = exports.getProgressLectureUserByCourseId = exports.updateIsCompleted = exports.updateLengthWatched = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const userCourseProgress_service_1 = __importDefault(require("../services/userCourseProgress.service"));
exports.updateLengthWatched = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { courseId, lectureId, lengthWatched, lectureTitle, lectureUrl } = req.body;
    const progress = await userCourseProgress_service_1.default.updateLenghtWatched({
        courseId: courseId,
        lectureId,
        userId,
        lengthWatched,
        lectureTitle,
        lectureUrl,
    });
    res.status(200).json({
        success: true,
        data: progress,
        message: "Update Length Watched Succeessfully",
    });
});
exports.updateIsCompleted = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { courseId, lectureId, isCompleted, lectureTitle, lectureUrl } = req.body;
    const progress = await userCourseProgress_service_1.default.updateIsCompleted({
        courseId,
        isCompleted,
        lectureId,
        userId,
        lectureTitle,
        lectureUrl,
    });
    res.status(200).json({
        success: true,
        data: progress,
        message: "Update Is Completed Successfully",
    });
});
exports.getProgressLectureUserByCourseId = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { courseId } = req.params;
    const progress = await userCourseProgress_service_1.default.getProgressLectureUserByCourseId({
        courseId: courseId,
        userId: userId,
    });
    res.status(200).json({
        success: true,
        data: progress,
        message: "GET Progress Lecture User By CourseId",
    });
});
exports.getProgessByUserId = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const progress = await userCourseProgress_service_1.default.getProgessByUserId(userId);
    res.status(200).json({
        success: true,
        data: progress,
        message: "GET Progress By UserId",
    });
});
