"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReviewReportForInstructor = exports.generateBrowser = exports.calculateMonthNewUserSessionDuration = exports.calculateDevideTypePercentage = exports.calculateBounceRateAndSessions = exports.calculateMetricsSum = exports.calculateUserSum = exports.generateEarningReportForInstructor = exports.generateEarningsReport = exports.generalCountAnalytics = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const analytics_service_1 = __importDefault(require("../services/analytics.service"));
exports.generalCountAnalytics = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const analytics = await analytics_service_1.default.generalCountAnalytics();
    res.status(200).json({ success: true, data: analytics });
});
exports.generateEarningsReport = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { period } = req.query;
    const analytics = await analytics_service_1.default.generateEarningsReport(period);
    res.status(200).json({ success: true, data: analytics });
});
exports.generateEarningReportForInstructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { period } = req.query;
    const analytics = await analytics_service_1.default.generateEarningReportForInstructor(period, userId);
    res.status(200).json({ success: true, data: analytics });
});
exports.calculateUserSum = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const analytics = await analytics_service_1.default.calculateUserSum();
    res.status(200).json({ success: true, data: analytics });
});
exports.calculateMetricsSum = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const analytics = await analytics_service_1.default.calculateMetricsSum();
    res.status(200).json({ success: true, data: analytics });
});
exports.calculateBounceRateAndSessions = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const analytics = await analytics_service_1.default.calculateBounceRateAndSessions();
    res.status(200).json({ success: true, data: analytics });
});
exports.calculateDevideTypePercentage = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const analytics = await analytics_service_1.default.calculateDevideTypePercentage();
    res.status(200).json({ success: true, data: analytics });
});
exports.calculateMonthNewUserSessionDuration = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const analytics = await analytics_service_1.default.calculateMonthNewUserSessionDuration();
    res.status(200).json({ success: true, data: analytics });
});
exports.generateBrowser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const analytics = await analytics_service_1.default.genarateBrowser();
    res.status(200).json({ success: true, data: analytics });
});
exports.generateReviewReportForInstructor = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { period } = req.query;
    const userId = req.me._id;
    const analytics = await analytics_service_1.default.generateReviewReportForInstructor(period, userId);
    res.status(200).json({ success: true, data: analytics });
});
