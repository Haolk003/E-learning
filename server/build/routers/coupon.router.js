"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coupon_controller_1 = require("../controllers/coupon.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-coupon", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), coupon_controller_1.createCoupon);
router.put("/update-coupon/:couponId", auth_1.protect, coupon_controller_1.updateCoupon);
router.delete("/delete-coupon/:couponId", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), coupon_controller_1.deleteCoupon);
router.get("/get-coupon-details/:couponId", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), coupon_controller_1.getCouponDetails);
router.put("/apply-coupon-to-cart", auth_1.protect, coupon_controller_1.applyCouponToCart);
exports.default = router;
