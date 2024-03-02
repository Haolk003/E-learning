import { Request, Response, NextFunction } from "express";
import NotifyService from "../services/notify.service";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

export const createNotify = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const newNotify = await NotifyService.createNotify(data);
    res.status(200).json({
      success: true,
      data: newNotify,
      message: "Create Notification Successfully",
    });
  }
);

export const updateNotify = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
    const { id } = req.params;
    const updatedNotify = await NotifyService.updateNotify(id, status);
    res.status(200).json({
      success: true,
      data: updatedNotify,
      message: "Update Notification Successfully",
    });
  }
);

export const getNotifyById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const notify = await NotifyService.getNotifyById(id);
    res.status(200).json({
      success: true,
      data: notify,
      message: "Get Notification By Id Successfully",
    });
  }
);

export const getAllNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const notifications = await NotifyService.getAllNotificationsUser(userId);
    res.status(200).json({
      success: true,
      data: notifications,
      message: "Get All Notifications Successfully",
    });
  }
);

export const deleteNotify = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedNotify = await NotifyService.deleteNotify(id);
    res.status(200).json({
      success: true,
      data: deletedNotify,
      message: "Notification Deleted Successfully",
    });
  }
);
