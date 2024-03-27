"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analytics_controller_1 = require("../controllers/analytics.controller");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/analytics/general-all", analytics_controller_1.generalCountAnalytics);
router.get("/analytics/generate-report", analytics_controller_1.generateEarningsReport);
router.get("/analytics/generate-earning-instructor", auth_1.protect, (0, auth_1.authorizeRoles)("instructor"), analytics_controller_1.generateEarningReportForInstructor);
router.get("/analytics/calculate-sum-metrics", analytics_controller_1.calculateMetricsSum);
router.get("/analytics/calculate-sum-user", analytics_controller_1.calculateUserSum);
router.get("/analytics/calculate-month-bounce-session", analytics_controller_1.calculateBounceRateAndSessions);
router.get("/analytics/calculate-devide-type-percentTage", analytics_controller_1.calculateDevideTypePercentage);
router.get("/analytics/calculate-month-newUser-session", analytics_controller_1.calculateMonthNewUserSessionDuration);
router.get("/analytics/generate-browser", analytics_controller_1.generateBrowser);
router.get("/analytics/generate-report-review-instructor", auth_1.protect, (0, auth_1.authorizeRoles)("instructor"), analytics_controller_1.generateReviewReportForInstructor);
exports.default = router;