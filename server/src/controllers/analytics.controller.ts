import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import analyticsService from "../services/analytics.service";

export const generalCountAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const analytics = await analyticsService.generalCountAnalytics();
    res.status(200).json({ success: true, data: analytics });
  }
);
