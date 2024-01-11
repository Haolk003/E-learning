import { generalCountAnalytics } from "../controllers/analytics.controller";
import express from "express";

const router = express.Router();

router.get("/analytics/general-all", generalCountAnalytics);

export default router;
