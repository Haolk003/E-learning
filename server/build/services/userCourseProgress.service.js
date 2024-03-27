"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userCourseProgress_model_1 = __importDefault(require("../models/userCourseProgress.model"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const updateLenghtWatched = async ({ courseId, lectureId, lengthWatched, userId, lectureTitle, lectureUrl, }) => {
    let userProgress = await userCourseProgress_model_1.default.findOne({
        userId,
        courseId,
    });
    if (!userProgress) {
        throw new errorHandle_1.default(400, "Can not find User Progress");
    }
    const checkLecture = userProgress.progress.find((item) => item.lectureId === lectureId);
    if (!checkLecture) {
        userProgress.progress.push({
            isCompleted: false,
            lectureId,
            lengthWatched,
        });
    }
    else {
        checkLecture.lengthWatched = lengthWatched;
    }
    userProgress.lastWatchedLecture = { lectureTitle, lectureId, lectureUrl };
    await userProgress.save();
    return userProgress;
};
const updateIsCompleted = async ({ courseId, isCompleted, lectureId, userId, lectureTitle, lectureUrl, }) => {
    let userProgress = await userCourseProgress_model_1.default.findOne({
        userId,
        courseId,
    });
    if (!userProgress) {
        throw new errorHandle_1.default(400, "Can not find User Progress");
    }
    const checkLecture = userProgress.progress.find((item) => item.lectureId === lectureId);
    if (!checkLecture) {
        userProgress.progress.push({
            lectureId,
            lengthWatched: 0,
            isCompleted: isCompleted,
        });
    }
    else {
        checkLecture.isCompleted = isCompleted;
    }
    userProgress.lastWatchedLecture = { lectureTitle, lectureId, lectureUrl };
    await userProgress.save();
    return userProgress;
};
const getProgressLectureUserByCourseId = async ({ courseId, userId, }) => {
    const userProgress = await userCourseProgress_model_1.default.findOne({
        courseId,
        userId,
    });
    return userProgress;
};
const getProgessByUserId = async (userId) => {
    const userProgress = await userCourseProgress_model_1.default.find({
        userId: userId,
    }).populate({
        path: "courseId",
        select: "title courseData author thumbnail category",
        populate: [
            {
                path: "author",
                select: "firstName lastName email",
            },
            {
                path: "category",
            },
        ],
    });
    return userProgress;
};
const userCourseProgressService = {
    updateIsCompleted,
    updateLenghtWatched,
    getProgressLectureUserByCourseId,
    getProgessByUserId,
};
exports.default = userCourseProgressService;
