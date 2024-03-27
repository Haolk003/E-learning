"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartShema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            courseId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Course",
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: { type: Number, default: 0 },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
    applyCoupon: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Coupon",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Cart", cartShema);
