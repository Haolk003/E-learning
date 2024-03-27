"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCouponInCart = exports.applyCouponToCart = exports.getCart = exports.deleteAllCourseInCart = exports.deleteCourseIdInCart = exports.updateCart = exports.addToCart = void 0;
const cart_service_1 = __importDefault(require("../services/cart.service"));
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
exports.addToCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { courseId, price } = req.body;
    const userId = req.me._id;
    const cart = await cart_service_1.default.addCart({
        userId,
        courseId: courseId,
        price,
    });
    res.status(200).json({
        success: true,
        data: cart,
        message: "Product added to cart successfully",
    });
});
exports.updateCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { courseId, price } = req.body;
    const userId = req.me._id;
    const cart = await cart_service_1.default.editCart({
        userId,
        courseId,
        price,
    });
    res.status(200).json({
        success: true,
        data: cart,
        message: "Cart updated successfully",
    });
});
exports.deleteCourseIdInCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { courseId } = req.params;
    const userId = req.me._id;
    const cart = await cart_service_1.default.deleteCourseIdInCart(userId, courseId);
    res.status(200).json({
        success: true,
        data: cart,
        message: "Product removed from cart successfully",
    });
});
exports.deleteAllCourseInCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const cart = await cart_service_1.default.deleteAllCourseInCart(userId);
    res.status(200).json({
        success: true,
        data: cart,
        message: "All Product removed from cart successfully",
    });
});
exports.getCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const cart = await cart_service_1.default.getAddedCart(userId);
    res.status(200).json({
        success: true,
        data: cart,
        message: "Cart retrieved successfully",
    });
});
exports.applyCouponToCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { couponCode } = req.body;
    const cart = await cart_service_1.default.applyCoupon(userId, couponCode);
    res.status(200).json({
        success: true,
        data: cart,
        message: "Apply coupon for cart successfully",
    });
});
exports.deleteCouponInCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { couponId } = req.body;
    const cart = await cart_service_1.default.deleteCouponInCart(couponId, userId);
    res.status(200).json({
        success: true,
        data: cart,
        message: "Remove Coupon successfully",
    });
});
