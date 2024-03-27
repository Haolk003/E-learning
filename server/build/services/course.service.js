"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importStar(require("lodash"));
const course_model_1 = __importDefault(require("../models/course.model"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const cloudinary_1 = require("../utils/cloudinary");
const category_model_1 = __importDefault(require("../models/category.model"));
const cloudinary_2 = require("../utils/cloudinary");
const user_model_1 = __importDefault(require("../models/user.model"));
const redis_1 = require("../utils/redis");
//save data when the user completes step 1
async function updateCourseInRedis(courseId, updatedData) {
    // Các key Redis cho các danh mục khóa học
    const categories = ["courses:popular", "courses:new", "courses:overrated"];
    for (const category of categories) {
        // Lấy dữ liệu hiện tại từ Redis
        const coursesData = await redis_1.redis.get(category);
        if (coursesData) {
            // Phân tích dữ liệu JSON để lấy danh sách các khóa học
            const courses = JSON.parse(coursesData);
            // Tìm khóa học trong danh sách
            const courseIndex = courses.findIndex((course) => course.id === courseId);
            if (courseIndex !== -1) {
                // Cập nhật dữ liệu cho khóa học này
                courses[courseIndex] = { ...courses[courseIndex], ...updatedData };
                // Lưu lại danh sách đã cập nhật vào Redis
                await redis_1.redis.set(category, JSON.stringify(courses));
            }
        }
    }
}
const createCourseStep1 = async (data, userId, courseId) => {
    if (courseId && courseId !== "undefined") {
        const updateCourse = await course_model_1.default.findByIdAndUpdate(courseId, {
            $set: { ...data },
        });
        const isExistCategory = await category_model_1.default.findById(data.category);
        if (!isExistCategory)
            throw new errorHandle_1.default(400, "Category not found");
        return updateCourse;
    }
    else {
        const newCourse = await course_model_1.default.create({
            ...data,
            author: userId,
            status: "draft",
            progress: 33,
        });
        return newCourse;
    }
};
const editCourseStep1 = async (data, courseId) => {
    const updateCourse = await course_model_1.default.findByIdAndUpdate(courseId, { $set: data }, { new: true });
    const findRedis = await redis_1.redis.get(courseId);
    if (findRedis) {
        await redis_1.redis.hset(courseId, data);
    }
    await updateCourseInRedis(courseId, data);
    return updateCourse;
};
const uploadImageCourse = async (file) => {
    const result = await (0, cloudinary_1.uploadFile)("course", file.path);
    return { public_id: result.public_id, url: result.url };
};
const createEditCourseStep2 = async (data, courseId) => {
    const updateCourse = await course_model_1.default.findByIdAndUpdate(courseId, {
        $set: {
            prerequisites: data.prerequisites,
            benefits: data.benefits,
            progress: 66,
        },
    }, { new: true });
    const findRedis = await redis_1.redis.get(courseId);
    if (findRedis) {
        await redis_1.redis.hset(courseId, data);
        await updateCourseInRedis(courseId, data);
    }
    return updateCourse;
};
const createEditCourseStep3 = async (data, courseId) => {
    const newData = data.map((item, index) => {
        const totalCourseLength = item.lectures.reduce((total, item) => {
            return total + item.duration;
        }, 0);
        return { ...item, videoLength: totalCourseLength };
    });
    const updateCourse = await course_model_1.default.findByIdAndUpdate(courseId, { $set: { courseData: newData, progress: 100 } }, { new: true });
    const findRedis = await redis_1.redis.get(courseId);
    if (findRedis) {
        await redis_1.redis.hset(courseId, { courseData: newData, progress: 100 });
        await updateCourseInRedis(courseId, data);
    }
    return updateCourse;
};
//convert status to public
const publicCourse = async (courseId) => {
    const findCourse = await course_model_1.default.findById(courseId);
    if (!findCourse) {
        throw new errorHandle_1.default(400, "Course not found");
    }
    if ((0, lodash_1.isEmpty)(findCourse.prerequisites) ||
        (0, lodash_1.isEmpty)(findCourse.benefits) ||
        (0, lodash_1.isEmpty)(findCourse.courseData) ||
        (0, lodash_1.isEmpty)(findCourse.thumbnail)) {
        throw new errorHandle_1.default(400, "Please fill in the fields");
    }
    findCourse.status = "public";
    const categoryExist = await category_model_1.default.findById(findCourse.category);
    if (categoryExist) {
        categoryExist.courseCount = categoryExist.courseCount + 1;
        await categoryExist.save();
    }
    await findCourse.save();
    return findCourse;
};
//convert status to private
const privateCourse = async (courseId) => {
    const findCourse = await course_model_1.default.findById(courseId);
    if (!findCourse) {
        throw new errorHandle_1.default(400, "Course not found");
    }
    findCourse.status = "private";
    const categoryExist = await category_model_1.default.findById(findCourse.category);
    if (categoryExist) {
        categoryExist.courseCount -= 1;
        await categoryExist.save();
    }
    await findCourse.save();
    return findCourse;
};
//delete course
const deleteCourse = async (courseId) => {
    const deleteCourse = await course_model_1.default.findByIdAndDelete(courseId);
    if (!deleteCourse) {
        throw new errorHandle_1.default(400, "Course deleted successfully");
    }
    return deleteCourse;
};
//get course darf admin
const findCourseById = async (courseId) => {
    const course = await course_model_1.default.findById(courseId);
    if (!course) {
        throw new errorHandle_1.default(400, "Course not found");
    }
    return course;
};
const findCourseByIdPublic = async (courseId) => {
    let courseRedis = await redis_1.redis.get(courseId);
    if (!courseRedis) {
        const course = await course_model_1.default
            .findOne({ _id: courseId, status: "public" })
            .select("-courseData.lectures.videoUrl")
            .populate("author", "avatar firstName lastName email");
        if (!course) {
            throw new errorHandle_1.default(400, "Course not found");
        }
        await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        return course;
    }
    return JSON.parse(courseRedis);
};
const getPopularCourses = async (userId) => {
    const findUser = await user_model_1.default.findById(userId);
    const courses = await course_model_1.default
        .find(Object.assign({ status: "public" }, { _id: { $nin: findUser?.myLearning } }))
        .sort("-sold")
        .limit(20);
    return courses;
};
const getNewCourses = async (userId) => {
    const findUser = await user_model_1.default.findById(userId);
    const courses = await course_model_1.default
        .find(Object.assign({ status: "public" }, { _id: { $nin: findUser?.myLearning } }))
        .sort("-createdAt")
        .limit(20);
    return courses;
};
const getOverratedCourses = async (userId) => {
    const findUser = await user_model_1.default.findById(userId);
    const courses = await course_model_1.default
        .find(Object.assign({ status: "public" }, { _id: { $nin: findUser?.myLearning } }))
        .sort("-ratings")
        .limit(20);
    return courses;
};
const getCoursePurhaser = async (courseId, userId) => {
    const findCourseInUser = await user_model_1.default.findById(userId);
    if (!findCourseInUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    if (!findCourseInUser.myLearning.find((item) => item.toString() === courseId.toString())) {
        throw new errorHandle_1.default(400, "You haven't purchased this course yet");
    }
    const findCourse = await course_model_1.default
        .findById(courseId)
        .populate("author", "avatar firstName lastName email")
        .populate({
        path: "reviews",
        populate: { path: "user", select: "firstName lastName avatar" },
    });
    if (!findCourse) {
        throw new errorHandle_1.default(400, "Course not found");
    }
    return findCourse;
};
// upload video to vdocipher
const uploadVideo = async (file, id) => {
    const { path } = file;
    const data = await (0, cloudinary_2.uploadVideo)(path, id);
    return data;
};
const deleteImageVideo = async (public_id) => {
    await (0, cloudinary_2.deleteVideo)(public_id);
    return;
};
const getAllCourseByAdmin = async (queryObj, userId) => {
    const filteredObject = lodash_1.default.omitBy(queryObj, lodash_1.default.isEmpty);
    const findUser = await user_model_1.default.findById(userId);
    if (typeof filteredObject.level === "string" &&
        filteredObject.level.split("").includes(",")) {
        filteredObject.level = filteredObject.level.split(",");
    }
    const queryObjCopy = filteredObject;
    const limit = (filteredObject.limit ? filteredObject.limit : 20);
    const page = (filteredObject.page ? filteredObject.page : 1);
    const excludeField = ["page", "sort", "limit", "keyword"];
    const filteredQueryObj = lodash_1.default.omit(queryObjCopy, excludeField);
    let queryStr = JSON.stringify(filteredQueryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);
    let query;
    if (!(0, lodash_1.isEmpty)(filteredObject.keyword)) {
        query = course_model_1.default.find(Object.assign({ title: { $regex: filteredObject.keyword, $options: "i" } }, { status: "public" }, { _id: { $nin: findUser?.myLearning } }, queryStr));
    }
    else {
        query = course_model_1.default.find(Object.assign({ status: "public" }, { _id: { $nin: findUser?.myLearning } }, queryStr));
    }
    if (filteredObject && typeof filteredObject.sort === "string") {
        const sortBy = filteredObject.sort.split(",").join(" ");
        query = query.sort(sortBy);
    }
    else {
        query = query.sort("-reviews");
    }
    query = query
        .select(" -prerequisites -tags")
        .skip((page - 1) * limit)
        .limit(limit);
    const totalCount = await course_model_1.default.countDocuments(query.getFilter()).exec();
    const courses = await query
        .populate([
        { path: "category" },
        { path: "author", select: "firstName lastName email" },
    ])
        .exec();
    return { courses, totalCount };
};
const deleteCourseById = async (id) => {
    const course = await course_model_1.default.findByIdAndDelete(id);
    if (!course) {
        throw new errorHandle_1.default(400, "Delete Course Failure");
    }
    return course;
};
const getMyCourseIntructor = async ({ userId, sort = "-createdAt", limit = 20, page = 1, keyword, }) => {
    let query;
    if (!(0, lodash_1.isEmpty)(keyword)) {
        query = course_model_1.default.find({
            title: { $regex: keyword, $options: "i" },
            author: userId,
        });
    }
    else {
        query = course_model_1.default.find({ author: userId });
    }
    const countQuery = await query.model.countDocuments(query.getFilter()).exec();
    const skip = (page - 1) * limit;
    query = query
        .populate("author category")
        .select("-courseData -prerequisites -benefits -description -tags")
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const courses = await query;
    return { courses, countQuery };
};
const findCourseCategoryAndSubCategory = async ({ categoryId, pageQuery, sortQuery, subCategoryId, }) => {
    const sort = sortQuery || "-sold";
    const page = pageQuery || 1;
    const skip = (page - 1) * 10;
    if (!(0, lodash_1.isEmpty)(subCategoryId)) {
        const findCourses = await course_model_1.default
            .find({
            category: categoryId,
            subCategory: subCategoryId,
            status: "public",
        })
            .populate("author", "firstName lastName email")
            .populate([{ path: "category" }, { path: "subCategory" }])
            .select("-tags -prerequisites -courseData.description -courseData.lectures -demoUrl")
            .sort(sort)
            .skip(skip)
            .limit(10);
        const totalCount = await course_model_1.default
            .countDocuments({
            category: categoryId,
            subCategory: subCategoryId,
            status: "public",
        })
            .exec();
        return { courses: findCourses, totalCount };
    }
    else {
        const findCourses = await course_model_1.default
            .find({ category: categoryId, status: "public" })
            .select("-tags -prerequisites -courseData.description -courseData.lectures -demoUrl")
            .populate("author", "firstName lastName email")
            .populate([{ path: "category" }, { path: "subCategory" }])
            .sort(sort)
            .limit(10)
            .skip(skip);
        const totalCount = await course_model_1.default
            .countDocuments({
            category: categoryId,
            status: "public",
        })
            .exec();
        return { courses: findCourses, totalCount };
    }
};
const getMyCourseOfInstructor = async (instructorId, page) => {
    const findIntructor = await user_model_1.default.findById(instructorId);
    if (!findIntructor || findIntructor.role !== "instructor") {
        throw new errorHandle_1.default(400, "The user doesn't exist or you don't have access to this user's profile");
    }
    const courses = await course_model_1.default
        .find({ author: instructorId })
        .limit(10)
        .skip((page - 1) * 10);
    return courses;
};
const courseService = {
    createCourseStep1,
    createEditCourseStep2,
    createEditCourseStep3,
    uploadImageCourse,
    editCourseStep1,
    findCourseById,
    uploadVideo,
    deleteImageVideo,
    publicCourse,
    privateCourse,
    getAllCourseByAdmin,
    deleteCourse,
    getMyCourseIntructor,
    deleteCourseById,
    findCourseByIdPublic,
    getCoursePurhaser,
    findCourseCategoryAndSubCategory,
    getMyCourseOfInstructor,
    getOverratedCourses,
    getPopularCourses,
    getNewCourses,
};
exports.default = courseService;
