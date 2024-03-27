"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCouponToCart = exports.getCouponDetails = exports.deleteCoupon = exports.updateCoupon = exports.createCoupon = void 0;
const coupon_service_1 = __importDefault(require("../services/coupon.service"));
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
exports.createCoupon = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { code, discount, expiryDate } = req.body;
    const coupon = await coupon_service_1.default.addCoupon({
        code,
        discount,
        expiryDate,
    });
    res.status(201).json({
        success: true,
        data: coupon,
        message: "Coupon created successfully",
    });
});
exports.updateCoupon = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { couponId } = req.params;
    const { code, discount, expiryDate } = req.body;
    const coupon = await coupon_service_1.default.updateCoupon(couponId, couponId, {
        code,
        discount,
        expiryDate,
    });
    res.status(200).json({
        success: true,
        data: coupon,
        message: "Coupon updated successfully",
    });
});
exports.deleteCoupon = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { couponId } = req.params;
    await coupon_service_1.default.deleteCoupon(couponId);
    res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
    });
});
exports.getCouponDetails = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { couponId } = req.params;
    const coupon = await coupon_service_1.default.getCouponDetails(couponId);
    res.status(200).json({
        success: true,
        data: coupon,
        message: "Coupon details retrieved successfully",
    });
});
exports.applyCouponToCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { couponCode } = req.body;
    const userId = req.me._id; // Adjust based on how user ID is accessed
    const result = await coupon_service_1.default.applyCoupon(userId, couponCode);
    res.status(200).json({
        success: true,
        data: result,
        message: "Coupon applied to cart successfully",
    });
});
