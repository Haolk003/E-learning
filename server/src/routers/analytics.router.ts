import {
  generalCountAnalytics,
  generateEarningsReport,
  calculateMetricsSum,
  calculateUserSum,
  calculateBounceRateAndSessions,
  calculateDevideTypePercentage,
  calculateMonthNewUserSessionDuration,
} from "../controllers/analytics.controller";
import express, { Router } from "express";

const router = express.Router();

router.get("/analytics/general-all", generalCountAnalytics);

router.get("/analytics/generate-report", generateEarningsReport);

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
export default router;
