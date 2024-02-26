import express from "express";
import {
  getCategoryById,
  deleteCategory,
  getAllCategory,
  newCategory,
  updateCategory,
  getAllSubCategoryFromCategoryId,
} from "../controllers/category.controller";
import { protect, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.post("/new-category", protect, authorizeRoles("admin"), newCategory);

router.put(
  "/update-category/:id",
  protect,
  authorizeRoles("admin"),
  updateCategory
);

router.get("/get-category-id/:id", getCategoryById);

router.get("/get-all-categories", getAllCategory);

router.delete(
  "/delete-category/:id",
  protect,
  authorizeRoles("admin"),
  deleteCategory
);

router.get(
  "/get-all-subCategory-categoryId/:categoryId",
  getAllSubCategoryFromCategoryId
);

export default router;
