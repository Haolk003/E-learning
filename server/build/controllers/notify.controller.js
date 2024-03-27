"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotify = exports.getAllNotifications = exports.getNotifyById = exports.updateNotify = exports.createNotify = void 0;
const notify_service_1 = __importDefault(require("../services/notify.service"));
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
exports.createNotify = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const data = req.body;
    const newNotify = await notify_service_1.default.createNotify(data);
    res.status(200).json({
        success: true,
        data: newNotify,
        message: "Create Notification Successfully",
    });
});
exports.updateNotify = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { status } = req.body;
    const { id } = req.params;
    const updatedNotify = await notify_service_1.default.updateNotify(id, status);
    res.status(200).json({
        success: true,
        data: updatedNotify,
        message: "Update Notification Successfully",
    });
});
exports.getNotifyById = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const notify = await notify_service_1.default.getNotifyById(id);
    res.status(200).json({
        success: true,
        data: notify,
        message: "Get Notification By Id Successfully",
    });
});
exports.getAllNotifications = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const notifications = await notify_service_1.default.getAllNotificationsUser(userId);
    res.status(200).json({
        success: true,
        data: notifications,
        message: "Get All Notifications Successfully",
    });
});
exports.deleteNotify = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const deletedNotify = await notify_service_1.default.deleteNotify(id);
    res.status(200).json({
        success: true,
        data: deletedNotify,
        message: "Notification Deleted Successfully",
    });
});
