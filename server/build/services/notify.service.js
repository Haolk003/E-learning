"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notify_model_1 = __importDefault(require("../models/notify.model"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
class NotifyService {
    async createNotify(data) {
        try {
            const newNotify = await notify_model_1.default.create(data);
            return newNotify;
        }
        catch (error) {
            throw new errorHandle_1.default(500, "Cannot create notification");
        }
    }
    async updateNotify(id, status) {
        try {
            const updatedNotify = await notify_model_1.default.findByIdAndUpdate(id, { $set: { status: status } }, { new: true, runValidators: true });
            if (!updatedNotify) {
                throw new errorHandle_1.default(400, "Notification not found");
            }
            return updatedNotify;
        }
        catch (error) {
            throw new errorHandle_1.default(500, "Cannot update notification");
        }
    }
    async getNotifyById(id) {
        try {
            const notify = await notify_model_1.default.findById(id).populate("sender");
            if (!notify) {
                throw new errorHandle_1.default(400, "Notification not found");
            }
            return notify;
        }
        catch (error) {
            throw new errorHandle_1.default(500, "Error getting notification");
        }
    }
    async getAllNotificationsUser(userId) {
        try {
            const notifications = await notify_model_1.default.find({
                receiver: userId.toString(),
            }).populate("sender");
            return notifications;
        }
        catch (error) {
            throw new errorHandle_1.default(500, "Error getting notifications");
        }
    }
    async deleteNotify(id) {
        try {
            const notify = await notify_model_1.default.findByIdAndDelete(id);
            if (!notify) {
                throw new errorHandle_1.default(400, "Notification not found");
            }
            return id;
        }
        catch (error) {
            throw new errorHandle_1.default(500, "Cannot delete notification");
        }
    }
}
exports.default = new NotifyService();
