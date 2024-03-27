"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteCourse_controller_1 = require("../controllers/noteCourse.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-note-course", auth_1.protect, noteCourse_controller_1.createNoteCourse);
router.put("/update-note-course/:id", auth_1.protect, noteCourse_controller_1.updateNoteCourseById);
router.get("/get-note-course/:courseId", auth_1.protect, noteCourse_controller_1.getNoteCourse);
router.delete("/delete-note-course/:id", auth_1.protect, noteCourse_controller_1.deleteCourse);
exports.default = router;
