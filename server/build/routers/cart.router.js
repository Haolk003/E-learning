"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// 导入controller中的方法
// Thêm đường dẫn để thêm khóa học vào giỏ hàng
router.post("/addToCart", auth_1.protect, cart_controller_1.addToCart);
// Thêm đường dẫn để xóa tất cả khóa học khỏi giỏ hàng
router.delete("/deleteAllCourseInCart", auth_1.protect, cart_controller_1.deleteAllCourseInCart);
// Thêm đường dẫn để xóa khóa học theo id khỏi giỏ hàng
router.delete("/deleteCourseIdInCart/:courseId", auth_1.protect, cart_controller_1.deleteCourseIdInCart);
// Thêm đường dẫn để lấy thông tin giỏ hàng
router.get("/getCart", auth_1.protect, cart_controller_1.getCart);
// Thêm đường dẫn để cập nhật thông tin giỏ hàng
router.put("/updateCart", auth_1.protect, cart_controller_1.updateCart);
router.put("/apply-coupon-cart", auth_1.protect, cart_controller_1.applyCouponToCart);
router.put("/delete-coupon-in-cart", auth_1.protect, cart_controller_1.deleteCouponInCart);
exports.default = router;
