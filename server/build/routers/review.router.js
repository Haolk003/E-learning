"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_controller_1 = require("../controllers/review.controller");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-review", auth_1.protect, review_controller_1.addReview);
router.get("/get-all-reviews", review_controller_1.getAllReview);
router.get("/get-review-courseId/:courseId", review_controller_1.getReviewsCourse);
router.put("/update-review/:id", auth_1.protect, review_controller_1.EditReviewCourse);
router.get("/reviews/percentage/:id", review_controller_1.StarPercentagesByCourseId);
router.get("/reviews/check-exist-review/:courseId", auth_1.protect, review_controller_1.checkExistReviewPersonal);
router.get("/reviews/get-all-reviews-userId", auth_1.protect, review_controller_1.getAllReviewsUserId);
exports.default = router;
