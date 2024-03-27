"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const noteCourse_model_1 = __importDefault(require("../models/noteCourse.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const createNoteCourse = async ({ content, courseId, lectureId, timing, userId, }) => {
    const findCourse = course_model_1.default.findById(courseId);
    if (!findCourse) {
        throw new errorHandle_1.default(400, "Course not found");
    }
    const newNoteCourse = await noteCourse_model_1.default.create({
        content,
        courseId,
        timing,
        lectureId,
        userId,
    });
    return newNoteCourse;
};
const getNoteCourse = async (courseId, userId) => {
    const findCourse = course_model_1.default.findById(courseId);
    if (!findCourse) {
        throw new errorHandle_1.default(400, "Course not found");
    }
    const noteCourse = await noteCourse_model_1.default.find({ courseId, userId });
    return noteCourse;
};
const updateNoteCourseById = async (id, content) => {
    const updateNoteCourse = await noteCourse_model_1.default.findByIdAndUpdate(id, { $set: { content: content } }, { new: true });
    if (!updateNoteCourse) {
        throw new errorHandle_1.default(400, "Update Note Course Failure");
    }
    return updateNoteCourse;
};
const deleteNoteCourseById = async (id) => {
    const deleteNoteCourse = await noteCourse_model_1.default.findByIdAndDelete(id);
    if (!deleteNoteCourse) {
        throw new errorHandle_1.default(400, "Note Courses Deleted Failure");
    }
    return deleteNoteCourse;
};
const noteCourseService = {
    createNoteCourse,
    deleteNoteCourseById,
    updateNoteCourseById,
    getNoteCourse,
};
exports.default = noteCourseService;
