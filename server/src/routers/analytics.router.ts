import {
  generalCountAnalytics,
  generateEarningsReport,
  calculateMetricsSum,
  calculateUserSum,
  calculateBounceRateAndSessions,
  calculateDevideTypePercentage,
  calculateMonthNewUserSessionDuration,
  generateBrowser,
  generateEarningReportForInstructor,
  generateReviewReportForInstructor,
} from "../controllers/analytics.controller";
import express, { Router } from "express";
import { protect, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.get("/analytics/general-all", generalCountAnalytics);

router.get("/analytics/generate-report", generateEarningsReport);

router.get(
  "/analytics/generate-earning-instructor",
  protect,
  authorizeRoles("instructor"),
  generateEarningReportForInstructor
);

router.get("/analytics/calculate-sum-metrics", calculateMetricsSum);

router.get("/analytics/calculate-sum-user", calculateUserSum);

router.get(
  "/analytics/calculate-month-bounce-session",
  calculateBounceRateAndSessions
);

router.get(
  "/analytics/calculate-devide-type-percentTage",
  calculateDevideTypePercentage
);

router.get(
  "/analytics/calculate-month-newUser-session",
  calculateMonthNewUserSessionDuration
);

router.get("/analytics/generate-browser", generateBrowser);

router.get(
  "/analytics/generate-report-review-instructor",
  protect,
  authorizeRoles("instructor"),
  generateReviewReportForInstructor
);
export default router;
