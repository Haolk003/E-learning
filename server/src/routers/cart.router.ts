import express from "express";

import {
  addToCart,
  deleteAllCourseInCart,
  deleteCourseIdInCart,
  getCart,
  updateCart,
} from "../controllers/cart.controller";
import { protect } from "../middlewares/auth";
const router = express.Router();
// 导入controller中的方法

// Thêm đường dẫn để thêm khóa học vào giỏ hàng
router.post("/addToCart", protect, addToCart);

// Thêm đường dẫn để xóa tất cả khóa học khỏi giỏ hàng
router.delete("/deleteAllCourseInCart", protect, deleteAllCourseInCart);

// Thêm đường dẫn để xóa khóa học theo id khỏi giỏ hàng
router.delete("/deleteCourseIdInCart/:courseId", protect, deleteCourseIdInCart);

// Thêm đường dẫn để lấy thông tin giỏ hàng
router.get("/getCart", protect, getCart);

// Thêm đường dẫn để cập nhật thông tin giỏ hàng
router.put("/updateCart", protect, updateCart);

export default router;
