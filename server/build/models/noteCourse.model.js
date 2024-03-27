"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteCourseShema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
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
    lectureId: {
        type: String,
        required: true,
    },
    timing: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const noteCourseModel = mongoose_1.default.model("NoteCourse", noteCourseShema);
exports.default = noteCourseModel;
