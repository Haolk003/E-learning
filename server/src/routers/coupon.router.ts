import express from "express";
import {
  applyCouponToCart,
  createCoupon,
  deleteCoupon,
  getCouponDetails,
  updateCoupon,
} from "../controllers/coupon.controller";
import { authorizeRoles, protect } from "../middlewares/auth";
const router = express.Router();

router.post("/create-coupon", protect, authorizeRoles("admin"), createCoupon);

router.put("/update-coupon/:couponId", protect, updateCoupon);

router.delete(
  "/delete-coupon/:couponId",
  protect,
  authorizeRoles("admin"),
  deleteCoupon
);

router.get(
  "/get-coupon-details/:couponId",
  protect,
  authorizeRoles("admin"),
  getCouponDetails
);

router.put("/apply-coupon-to-cart", protect, applyCouponToCart);

export default router;
