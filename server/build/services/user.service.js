"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = __importDefault(require("../models/course.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const review_model_1 = __importDefault(require("../models/review.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const cloudinary_1 = require("../utils/cloudinary");
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const getAllUser = async () => {
    const user = await user_model_1.default.find().select("-password");
    return user;
};
const updateProfileUser = async (id, data) => {
    const findUser = await user_model_1.default.findById(id);
    if (!findUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    findUser.firstName = data.firstName || findUser.firstName;
    findUser.lastName = data.lastName || findUser.lastName;
    findUser.headline = data.headline || findUser.headline;
    findUser.bio = data.bio || findUser.bio;
    findUser.facebookLink = data.facebookLink || findUser.facebookLink;
    findUser.linkedin = data.linkedin || findUser.linkedin;
    findUser.youtubeLink = data.youtubeLink || findUser.youtubeLink;
    findUser.website = data.website || findUser.website;
    findUser.twitterLink = data.twitterLink || findUser.twitterLink;
    await findUser.save();
    return findUser;
};
const uploadAvatarUser = async (id, file) => {
    const { path } = file;
    const findUser = await user_model_1.default
        .findById(id.toString())
        .select("-password -role");
    if (!findUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    if (findUser?.avatar?.public_id) {
        await (0, cloudinary_1.deleteImage)(findUser.avatar.public_id);
    }
    const result = await (0, cloudinary_1.uploadFile)("avatar", path);
    findUser.avatar = { public_id: result.public_id, url: result.url };
    await findUser.save();
    return findUser;
};
const blockUser = async (id) => {
    const blockUser = await user_model_1.default.findByIdAndUpdate(id, { $set: { isBanned: true } }, { new: true });
    if (!blockUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    return;
};
const unBlockUser = async (id) => {
    const blockUser = await user_model_1.default.findByIdAndUpdate(id, { $set: { isBanned: false } }, { new: true });
    if (!blockUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    return;
};
const removeUser = async (id) => {
    const removeUser = await user_model_1.default.findByIdAndDelete(id);
    if (!removeUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    return;
};
const getUserById = async (id) => {
    const user = await user_model_1.default
        .findById(id)
        .select("-password -isBanned -isVerified -googleUserId -facebookUserId -loginType -role");
    if (!user) {
        throw new errorHandle_1.default(400, "User not found");
    }
    return user;
};
const countTotalSoldByIntructor = async (instructorId) => {
    const result = await course_model_1.default.aggregate([
        { $match: { author: instructorId } },
        { $group: { _id: null, totalSold: { $sum: "$sold" } } },
    ]);
    const totalSold = result.length > 0 ? result[0].totalSold : 0;
    return totalSold;
};
const getUserProfileIntructor = async (id) => {
    const user = await user_model_1.default
        .findById(id)
        .select("-googleUserId -password -loginType");
    if (!user || user.role !== "instructor") {
        throw new errorHandle_1.default(400, "The user doesn't exist or you don't have access to this user's profile");
    }
    const totalReviews = await review_model_1.default.countDocuments({
        instructorId: user._id,
    });
    const totalStudents = await countTotalSoldByIntructor(user._id);
    return {
        user,
        totalReviews,
        totalStudents,
    };
};
const updatePassword = async (id, { newPassword, oldPassword }) => {
    const findUser = await user_model_1.default.findById(id);
    if (!findUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    if (findUser.loginType !== "password") {
        throw new errorHandle_1.default(400, "This account can't update the password");
    }
    const isMatchPassword = await findUser.comparePassword(oldPassword);
    if (!isMatchPassword) {
        throw new errorHandle_1.default(400, "Password is not match");
    }
    if (newPassword) {
        findUser.password = newPassword;
    }
    else {
        throw new errorHandle_1.default(400, "New Password not found");
    }
    await findUser.save();
    return;
};
const convertUserToIntructor = async (userId) => {
    const updateUser = await user_model_1.default.findByIdAndUpdate(userId, { $set: { role: "instructor", timeBeginInstructors: new Date() } }, { new: true });
    if (!updateUser) {
        throw new errorHandle_1.default(400, "Update User Failure");
    }
    return updateUser;
};
const becomeIntructor = async (userId) => {
    const updateUser = await user_model_1.default.findByIdAndUpdate(userId, {
        role: "instructor",
    });
    if (!updateUser) {
        throw new errorHandle_1.default(400, "Update User Failure");
    }
    return updateUser;
};
const getAllStudentsByAdmin = async (query) => {
    const limit = query.pageNumber ? query.pageNumber : 10;
    const skip = query.page ? (query.page - 1) * limit : 0;
    const students = await user_model_1.default
        .find({
        $expr: {
            $gt: [{ $size: "$myLearning" }, 0],
        },
    })
        .sort("-lastJoinedAt")
        .skip(skip)
        .limit(limit)
        .select("firstName lastName email myLearning createdAt updatedAt");
    return students;
};
const getAllIntructor = async (query) => {
    const limit = query.pageNumber ? query.pageNumber : 10;
    const skip = query.page ? (query.page - 1) * limit : 0;
    const sort = query.sort ? query.sort : "";
    const students = await user_model_1.default
        .find({ role: "instructor" })
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .select("firstName lastName email avatar");
    return students;
};
const getTopInstructor = async () => {
    const users = order_model_1.default.aggregate([
        // Bước đầu tiên, "giải nén" mảng products
        { $unwind: "$products" },
        // Kết nối đến collection courses
        {
            $lookup: {
                from: "courses",
                localField: "products",
                foreignField: "_id",
                as: "courseDetails",
            },
        },
        // Do $lookup có thể trả về một mảng, nên cần "giải nén" kết quả để xử lý dễ dàng
        { $unwind: "$courseDetails" },
        // Tiếp theo, kết nối đến collection instructors
        {
            $lookup: {
                from: "users",
                localField: "courseDetails.author",
                foreignField: "_id",
                as: "instructorDetails",
            },
        },
        { $unwind: "$instructorDetails" },
        // Nhóm theo giảng viên, tính toán tổng doanh thu và số lượng bán
        {
            $group: {
                _id: "$instructorDetails._id",
                totalSales: { $sum: "$payment_info.amount" },
                courses: { $addToSet: "$courseDetails._id" },
                firstName: { $first: "$instructorDetails.firstName" },
                lastName: { $first: "$instructorDetails.lastName" },
                avatar: { $first: "$instructorDetails.avatar" },
                timeBeginInstructors: {
                    $first: "$instructorDetails.timeBeginInstructors",
                },
                email: {
                    $first: "$instructorDetails.email",
                },
                count: { $sum: 1 },
            },
        },
        // Sắp xếp kết quả dựa trên tổng doanh thu hoặc số lượng bán
        { $sort: { totalSales: -1 } },
        // Giới hạn số lượng kết quả trả về
        { $limit: 10 },
    ]);
    return users;
};
const userService = {
    updateProfileUser,
    getAllUser,
    uploadAvatarUser,
    blockUser,
    unBlockUser,
    removeUser,
    getUserById,
    updatePassword,
    convertUserToIntructor,
    becomeIntructor,
    getUserProfileIntructor,
    getAllIntructor,
    getAllStudentsByAdmin,
    getTopInstructor,
};
exports.default = userService;
