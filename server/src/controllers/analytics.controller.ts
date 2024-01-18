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

export const calculateUserSum = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const analytics = await analyticsService.calculateUserSum();
    res.status(200).json({ success: true, data: analytics });
  }
);

export const calculateMetricsSum = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const analytics = await analyticsService.calculateMetricsSum();
    res.status(200).json({ success: true, data: analytics });
  }
);

export const calculateBounceRateAndSessions = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const analytics = await analyticsService.calculateBounceRateAndSessions();
    res.status(200).json({ success: true, data: analytics });
  }
);

export const calculateDevideTypePercentage = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const analytics = await analyticsService.calculateDevideTypePercentage();
    res.status(200).json({ success: true, data: analytics });
  }
);

export const calculateMonthNewUserSessionDuration = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const analytics =
      await analyticsService.calculateMonthNewUserSessionDuration();
    res.status(200).json({ success: true, data: analytics });
  }
);
