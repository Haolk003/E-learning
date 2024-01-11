import {
  generalCountAnalytics,
  generateEarningsReport,
} from "../controllers/analytics.controller";
import express from "express";

const router = express.Router();

router.get("/analytics/general-all", generalCountAnalytics);

router.get("/analytics/generate-report", generateEarningsReport);
export default router;
