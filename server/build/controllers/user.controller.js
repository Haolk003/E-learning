"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopInstructor = exports.getAllInstructor = exports.getAllStudentsByAdmin = exports.getUserProfileInstructor = exports.becomeIntructor = exports.convertUserToIntructor = exports.updatePassword = exports.getUserById = exports.removeUser = exports.unBlockUser = exports.blockUser = exports.updateProfileUser = exports.getAllUser = exports.updateAvatarUser = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const user_service_1 = __importDefault(require("../services/user.service"));
exports.updateAvatarUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me?._id;
    const file = req.file;
    const user = await user_service_1.default.uploadAvatarUser(id, file);
    res.status(200).json({
        success: true,
        data: user,
        message: "Avatar updated successfully",
    });
});
exports.getAllUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const users = await user_service_1.default.getAllUser();
    res.status(200).json({ success: true, data: users });
});
exports.updateProfileUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const data = req.body;
    const id = req.me._id;
    const user = await user_service_1.default.updateProfileUser(id, data);
    res.status(200).json({
        status: 200,
        data: user,
        message: "Profile updated successfully",
    });
});
exports.blockUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.params.id;
    await user_service_1.default.blockUser(id);
    res
        .status(200)
        .json({ success: true, messsage: "User is blocked successfully" });
});
exports.unBlockUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.params.id;
    await user_service_1.default.unBlockUser(id);
    res
        .status(200)
        .json({ success: true, message: "User is unBlocked successfully" });
});
exports.removeUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me._id;
    await user_service_1.default.removeUser(id);
    res
        .status(200)
        .json({ success: true, message: "Your Account deleted successfully" });
});
exports.getUserById = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_service_1.default.getUserById(id);
    res
        .status(200)
        .json({ success: true, message: "Get User is successfully", data: user });
});
exports.updatePassword = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me._id;
    const { newPassword, oldPassword } = req.body;
    await user_service_1.default.updatePassword(id, { newPassword, oldPassword });
    res
        .status(200)
        .json({ success: true, message: "Update Password successfully" });
});
exports.convertUserToIntructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const id = req.me._id;
    await user_service_1.default.convertUserToIntructor(id);
    res
        .status(200)
        .json({ success: true, message: "You are now an instructor" });
});
exports.becomeIntructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const response = await user_service_1.default.becomeIntructor(userId);
    res.status(200).json({
        status: 200,
        data: response,
        message: "You became a instructor",
    });
});
exports.getUserProfileInstructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const response = await user_service_1.default.getUserProfileIntructor(id);
    res.status(200).json({
        success: true,
        data: response,
        message: "Get Profile Intructor successfully",
    });
});
exports.getAllStudentsByAdmin = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const query = req.query;
    const response = await user_service_1.default.getAllStudentsByAdmin(query);
    res.status(200).json({
        success: true,
        data: response,
        message: "Get Al Students Successfully",
    });
});
exports.getAllInstructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res) => {
    const query = req.query;
    const response = await user_service_1.default.getAllIntructor(query);
    res.status(200).json({
        status: 200,
        data: response,
        message: "Get All Instructor Successfully",
    });
});
exports.getTopInstructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const response = await user_service_1.default.getTopInstructor();
    res
        .status(200)
        .json({
        success: true,
        data: response,
        message: "Get Top Instructor Successfully",
    });
});
