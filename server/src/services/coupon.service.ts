import CouponModel from "../models/coupon.model"; // Đường dẫn tới file couponModel của bạn
import { Types } from "mongoose";
import ErrorHandle from "../utils/errorHandle";

interface Coupon {
  code: string;
  discount: number;
  expiryDate: Date;
  used?: boolean;
  usedBy?: Types.ObjectId[];
}

class CouponService {
  // Thêm coupon mới
  async addCoupon(couponData: Coupon): Promise<Coupon> {
    const coupon = new CouponModel(couponData);
    await coupon.save();
    return coupon;
  }

  // Kiểm tra tính hợp lệ của coupon
  async isValidCoupon(
    code: string
  ): Promise<{ isValid: boolean; message?: string; coupon?: Coupon }> {
    const coupon = await CouponModel.findOne({
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
  async applyCoupon(
    userId: Types.ObjectId,
    code: string
  ): Promise<number | undefined> {
    const { isValid, coupon } = await this.isValidCoupon(code);
    if (!isValid) {
      throw new ErrorHandle(400, "Invalid Coupon");
    }
    // Giả sử bạn đã có logic để tìm và cập nhật giỏ hàng của người dùng ở đây
    // Update cart with the discount from the coupon
    // Ví dụ: await CartModel.findOneAndUpdate({ userId: userId }, { $set: { discount: coupon.discount } });
    // Đánh dấu coupon là đã sử dụng
    await CouponModel.findOneAndUpdate(
      { code: code },
      { $set: { used: true }, $push: { usedBy: userId } }
    );

    return coupon?.discount;
  }

  // Cập nhật trạng thái của coupon (ví dụ, sau khi đã sử dụng)
  async markCouponAsUsed(
    code: string,
    userId: Types.ObjectId
  ): Promise<{ success: boolean; message: string }> {
    const result = await CouponModel.findOneAndUpdate(
      { code: code },
      { $set: { used: true }, $push: { usedBy: userId } }
    );
    if (!result) {
      return { success: false, message: "Failed to mark coupon as used." };
    }
    return { success: true, message: "Coupon marked as used successfully." };
  }
  async getCouponDetails(code: string): Promise<Coupon | null> {
    const coupon = await CouponModel.findOne({ code });
    return coupon;
  }

  // Cập nhật coupon
  async updateCoupon(
    code: string,
    updateData: Partial<Coupon>
  ): Promise<Coupon | null> {
    const coupon = await CouponModel.findOneAndUpdate({ code }, updateData, {
      new: true,
    });
    return coupon;
  }

  // Xóa coupon
  async deleteCoupon(code: string): Promise<any> {
    const result = await CouponModel.deleteOne({ code });
    if (result.deletedCount === 0) {
      throw new ErrorHandle(400, "Coupon not found");
    }
    return result;
  }

  // Lấy danh sách tất cả coupon
  async listCoupons(): Promise<Coupon[]> {
    const coupons = await CouponModel.find({});
    return coupons;
  }
}

export default new CouponService();
