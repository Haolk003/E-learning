"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    used: { type: Boolean, default: false },
    usedBy: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
const couponModel = mongoose_1.default.model("Coupon", couponSchema);
exports.default = couponModel;
