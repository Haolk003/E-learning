"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userCourseProgress_controller_1 = require("../controllers/userCourseProgress.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.put("/update-lengthWatched-video", auth_1.protect, userCourseProgress_controller_1.updateLengthWatched);
router.put("/update-isCompleted-video", auth_1.protect, userCourseProgress_controller_1.updateIsCompleted);
router.get("/get-progress-lecture/:courseId", auth_1.protect, userCourseProgress_controller_1.getProgressLectureUserByCourseId);
router.get("/get-progress", auth_1.protect, userCourseProgress_controller_1.getProgessByUserId);
exports.default = router;
