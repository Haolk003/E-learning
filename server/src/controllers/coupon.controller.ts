import { Request, Response, NextFunction } from "express";
import couponService from "../services/coupon.service";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

export const createCoupon = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code, discount, expiryDate } = req.body;
    const coupon = await couponService.addCoupon({
      code,
      discount,
      expiryDate,
    });
    res.status(201).json({
      success: true,
      data: coupon,
      message: "Coupon created successfully",
    });
  }
);

export const updateCoupon = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponId } = req.params;
    const { code, discount, expiryDate } = req.body;
    const coupon = await couponService.updateCoupon(couponId, couponId, {
      code,
      discount,
      expiryDate,
    });
    res.status(200).json({
      success: true,
      data: coupon,
      message: "Coupon updated successfully",
    });
  }
);

export const deleteCoupon = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponId } = req.params;
    await couponService.deleteCoupon(couponId);
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  }
);

export const getCouponDetails = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponId } = req.params;
    const coupon = await couponService.getCouponDetails(couponId);
    res.status(200).json({
      success: true,
      data: coupon,
      message: "Coupon details retrieved successfully",
    });
  }
);

export const applyCouponToCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponCode } = req.body;
    const userId = req.me._id; // Adjust based on how user ID is accessed
    const result = await couponService.applyCoupon(userId, couponCode);
    res.status(200).json({
      success: true,
      data: result,
      message: "Coupon applied to cart successfully",
    });
  }
);
