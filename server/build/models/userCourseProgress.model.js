"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userCourseProgressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    progress: [
        {
            lectureId: String,
            lengthWatched: { type: Number, default: 0 },
            isCompleted: { type: Boolean, default: false },
        },
    ],
    lastWatchedLecture: {
        lectureTitle: String,
        lectureUrl: String,
        lectureId: String,
    },
}, { timestamps: true });
const UserCourseProgressModel = mongoose_1.default.model("UserCourseProgress", userCourseProgressSchema);
exports.default = UserCourseProgressModel;
