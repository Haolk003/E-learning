import mongoose from "mongoose";
import NotifyModel from "../models/notify.model";
import ErrorHandle from "../utils/errorHandle";

interface NewNotifyType {
  message: string;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
}

class NotifyService {
  async createNotify(data: NewNotifyType) {
    try {
      const newNotify = await NotifyModel.create(data);
      return newNotify;
    } catch (error) {
      throw new ErrorHandle(500, "Cannot create notification");
    }
  }

  async updateNotify(id: string, status: string) {
    try {
      const updatedNotify = await NotifyModel.findByIdAndUpdate(
        id,
        { $set: { status: status } },
        { new: true, runValidators: true }
      );
      if (!updatedNotify) {
        throw new ErrorHandle(400, "Notification not found");
      }
      return updatedNotify;
    } catch (error) {
      throw new ErrorHandle(500, "Cannot update notification");
    }
  }

  async getNotifyById(id: string) {
    try {
      const notify = await NotifyModel.findById(id).populate("sender");
      if (!notify) {
        throw new ErrorHandle(400, "Notification not found");
      }
      return notify;
    } catch (error) {
      throw new ErrorHandle(500, "Error getting notification");
    }
  }

  async getAllNotificationsUser(userId: string) {
    try {
      const notifications = await NotifyModel.find({
        receiver: userId.toString(),
      }).populate("sender");
      return notifications;
    } catch (error) {
      throw new ErrorHandle(500, "Error getting notifications");
    }
  }

  async deleteNotify(id: string) {
    try {
      const notify = await NotifyModel.findByIdAndDelete(id);
      if (!notify) {
        throw new ErrorHandle(400, "Notification not found");
      }
      return id;
    } catch (error) {
      throw new ErrorHandle(500, "Cannot delete notification");
    }
  }
}

export default new NotifyService();
