"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = __importDefault(require("../models/course.model"));
const review_model_1 = __importDefault(require("../models/review.model"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const redis_1 = require("../utils/redis");
const addReview = async ({ comment, courseId, rating, userId, }) => {
    const findCourse = await course_model_1.default.findById(courseId);
    if (!findCourse) {
        throw new errorHandle_1.default(400, "Course does not exist");
    }
    const findReviewUser = await review_model_1.default.findOne({
        courseId: courseId,
        user: userId,
    });
    if (findReviewUser) {
        throw new errorHandle_1.default(400, "You have already reviewed this course");
    }
    const newReview = await review_model_1.default.create({
        user: userId,
        courseId: courseId,
        comment: comment,
        rating: rating,
        instructorId: findCourse.author,
    });
    if (newReview) {
        const totalRatingReview = (findCourse.ratings * findCourse.reviews.length + rating) /
            (findCourse.reviews.length + 1);
        findCourse.reviews?.push(newReview._id);
        findCourse.ratings = totalRatingReview;
        await findCourse.save();
        redis_1.redis.set(courseId, JSON.stringify(findCourse), "EX", 604800);
    }
    return newReview;
};
const getAllReview = async () => {
    const reviews = await review_model_1.default
        .find()
        .sort("-createdAt")
        .populate("user courseId");
    return reviews;
};
const getReviewsCourse = async (courseId) => {
    const getReviews = await review_model_1.default
        .find({ courseId: courseId })
        .populate("user", "avatar firstName lastName email");
    return getReviews;
};
const EditReviews = async (reviewId, userId, data) => {
    const updateReview = await review_model_1.default.findOneAndUpdate({ _id: reviewId, user: userId }, {
        $set: { ...data },
    }, { new: true });
    if (!updateReview) {
        throw new errorHandle_1.default(400, "Update Review Failure");
    }
    return updateReview;
};
const starPercentageByCourseId = async (courseId) => {
    const starCounts = await review_model_1.default.aggregate([
        { $match: { courseId: courseId } },
        { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);
    const totalReviews = starCounts.reduce((acc, curr) => acc + curr.count, 0);
    if (totalReviews === 0) {
        return;
    }
    let starPercentages = {};
    for (let i = 1; i <= 5; i++) {
        const starCount = starCounts.find((item) => item._id === i)?.count || 0;
        starPercentages[`${i} stars`] = ((starCount / totalReviews) * 100).toFixed(2);
    }
    return starPercentages;
};
const checkExistReviewPersonal = async (courseId, userId) => {
    const existReview = await review_model_1.default.findOne({
        courseId: courseId,
        user: userId,
    });
    return existReview ? true : false;
};
const getAllReviewUserId = async (userId) => {
    const reviews = await review_model_1.default.find({ user: userId });
    return reviews;
};
const reviewService = {
    addReview,
    getAllReview,
    getReviewsCourse,
    EditReviews,
    starPercentageByCourseId,
    checkExistReviewPersonal,
    getAllReviewUserId,
};
exports.default = reviewService;
