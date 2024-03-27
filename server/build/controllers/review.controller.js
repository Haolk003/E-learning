"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReviewsUserId = exports.checkExistReviewPersonal = exports.StarPercentagesByCourseId = exports.EditReviewCourse = exports.getReviewsCourse = exports.getAllReview = exports.addReview = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const review_service_1 = __importDefault(require("../services/review.service"));
exports.addReview = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { courseId, comment, rating } = req.body;
    const newReview = await review_service_1.default.addReview({
        courseId,
        comment,
        rating,
        userId,
    });
    res.status(200).json({
        success: true,
        data: newReview,
        message: "Create Review Successfully",
    });
});
exports.getAllReview = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const reviews = await review_service_1.default.getAllReview();
    res.status(200).json({
        success: true,
        data: reviews,
        message: "Get All Course Successfully",
    });
});
//get Reviews in Course
exports.getReviewsCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { courseId } = req.params;
    const reviews = await review_service_1.default.getReviewsCourse(courseId);
    res.status(200).json({
        success: true,
        data: reviews,
        message: "Get Reviews Successfully",
    });
});
//Edit Review By Id
exports.EditReviewCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.me._id;
    const data = req.body;
    const updateCourse = await review_service_1.default.EditReviews(id, userId, data);
    res.status(200).json({
        success: true,
        data: updateCourse,
        message: "Review Updated Successfully",
    });
});
exports.StarPercentagesByCourseId = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const percentage = await review_service_1.default.starPercentageByCourseId(id);
    if (!percentage) {
        res
            .status(200)
            .json({ success: true, message: "No reviews found for this course" });
    }
    else {
        res.status(200).json({
            success: true,
            data: percentage,
            message: "Calculate Percentage of Star Successfully",
        });
    }
});
exports.checkExistReviewPersonal = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { courseId } = req.params;
    const userId = req.me._id;
    const checkExist = await review_service_1.default.checkExistReviewPersonal(courseId, userId);
    if (checkExist) {
        res
            .status(200)
            .json({ success: true, data: checkExist, message: "Exist Review" });
    }
    else {
        res
            .status(200)
            .json({ success: true, data: checkExist, message: "Not Exist Review" });
    }
});
const getAllReviewsUserId = async (req, res, next) => {
    const userId = req.me._id;
    const reviews = await review_service_1.default.getAllReviewUserId(userId);
    res
        .status(200)
        .json({
        success: true,
        data: reviews,
        message: "Get All Reviews for user successfully",
    });
};
exports.getAllReviewsUserId = getAllReviewsUserId;
