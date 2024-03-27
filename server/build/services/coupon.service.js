"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_model_1 = __importDefault(require("../models/coupon.model")); // Đường dẫn tới file couponModel của bạn
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
class CouponService {
    // Thêm coupon mới
    async addCoupon(couponData) {
        const coupon = new coupon_model_1.default(couponData);
        await coupon.save();
        return coupon;
    }
    // Kiểm tra tính hợp lệ của coupon
    async isValidCoupon(code) {
        const coupon = await coupon_model_1.default.findOne({
            code: code,
            expiryDate: { $gt: new Date() },
            used: false,
        });
        if (!coupon) {
            return { isValid: false, message: "Coupon is not valid or has expired." };
        }
        return { isValid: true, coupon: coupon };
    }
    // Áp dụng coupon vào giỏ hàng
    async applyCoupon(userId, code) {
        const { isValid, coupon } = await this.isValidCoupon(code);
        if (!isValid) {
            throw new errorHandle_1.default(400, "Invalid Coupon");
        }
        // Giả sử bạn đã có logic để tìm và cập nhật giỏ hàng của người dùng ở đây
        // Update cart with the discount from the coupon
        // Ví dụ: await CartModel.findOneAndUpdate({ userId: userId }, { $set: { discount: coupon.discount } });
        // Đánh dấu coupon là đã sử dụng
        await coupon_model_1.default.findOneAndUpdate({ code: code }, { $set: { used: true }, $push: { usedBy: userId } });
        return coupon?.discount;
    }
    // Cập nhật trạng thái của coupon (ví dụ, sau khi đã sử dụng)
    async markCouponAsUsed(code, userId) {
        const result = await coupon_model_1.default.findOneAndUpdate({ code: code }, { $set: { used: true }, $push: { usedBy: userId } });
        if (!result) {
            return { success: false, message: "Failed to mark coupon as used." };
        }
        return { success: true, message: "Coupon marked as used successfully." };
    }
    async getCouponDetails(couponId) {
        const coupon = await coupon_model_1.default.findById(couponId);
        if (!coupon) {
            throw new errorHandle_1.default(400, "Coupon not found");
        }
        return coupon;
    }
    // Cập nhật coupon
    async updateCoupon(couponId, code, updateData) {
        const coupon = await coupon_model_1.default.findByIdAndUpdate(couponId, updateData, {
            new: true,
        });
        return coupon;
    }
    // Xóa coupon
    async deleteCoupon(couponId) {
        const result = await coupon_model_1.default.findByIdAndDelete(couponId);
        if (!result) {
            throw new errorHandle_1.default(400, "Coupon not found");
        }
        return result;
    }
    // Lấy danh sách tất cả coupon
    async listCoupons() {
        const coupons = await coupon_model_1.default.find({});
        return coupons;
    }
}
exports.default = new CouponService();
