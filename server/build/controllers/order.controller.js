"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderCart = exports.checkUserPurchaseCousre = exports.newOrder = exports.newPaymentIntent = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const order_service_1 = __importDefault(require("../services/order.service"));
exports.newPaymentIntent = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { amount, currency } = req.body;
    const paymentInfo = await order_service_1.default.newPaymentIntent(amount, currency);
    res.status(200).json({
        success: true,
        data: paymentInfo,
        message: "Create Payment Inter successfully",
    });
});
exports.newOrder = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { payment_intent_id, courseId } = req.body;
    const order = await order_service_1.default.newOrder(userId, courseId, payment_intent_id);
    res
        .status(200)
        .json({ status: 200, data: order, message: "Create Order Successfully" });
});
exports.checkUserPurchaseCousre = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { courseId } = req.params;
    const isPurchased = await order_service_1.default.checkUserPurchaseCousre(courseId, userId);
    res.status(200).json({
        success: true,
        data: isPurchased,
        message: "Check User Is Purchased Successfully",
    });
});
exports.newOrderCart = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const userId = req.me._id;
    const { paymentId } = req.body;
    const order = await order_service_1.default.newOrderCart(paymentId, userId);
    res
        .status(200)
        .json({ success: true, data: order, message: "Checkout successfully" });
});
