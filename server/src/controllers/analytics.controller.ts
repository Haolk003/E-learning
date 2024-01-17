import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import analyticsService from "../services/analytics.service";
import CategoryModel from "../models/category.model";

export const generalCountAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const analytics = await analyticsService.generalCountAnalytics();
    res.status(200).json({ success: true, data: analytics });
  }
);

export const generateEarningsReport = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { period } = req.query as any;
    const analytics = await analyticsService.generateEarningsReport(period);
    res.status(200).json({ success: true, data: analytics });
  }
);
