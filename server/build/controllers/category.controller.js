"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubCategoryFromCategoryId = exports.deleteCategory = exports.getAllCategory = exports.getCategoryById = exports.updateCategory = exports.newCategory = void 0;
const category_service_1 = __importDefault(require("../services/category.service"));
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
exports.newCategory = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const data = req.body;
    const newCategory = await category_service_1.default.newCategory(data);
    res.status(200).json({
        success: true,
        data: newCategory,
        message: "Create Category Successfully",
    });
});
exports.updateCategory = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const data = req.body;
    const { id } = req.params;
    const updateCategory = await category_service_1.default.updateCategory(id, data);
    res.status(200).json({
        success: true,
        data: updateCategory,
        message: "Update Category Successfully",
    });
});
exports.getCategoryById = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const category = await category_service_1.default.getCategoryById(id);
    res.status(200).json({
        success: true,
        data: category,
        message: "Get Category By Id Successfully",
    });
});
exports.getAllCategory = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const categories = await category_service_1.default.getAllCategory();
    res.status(200).json({
        success: true,
        data: categories,
        message: "Get All Categories Successfully",
    });
});
exports.deleteCategory = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const deleteCategory = await category_service_1.default.deleteCategory(id);
    res.status(200).json({
        success: true,
        data: deleteCategory,
        message: "Category deleted Successfully",
    });
});
exports.getAllSubCategoryFromCategoryId = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { categoryId } = req.params;
    const categories = await category_service_1.default.getAllSubCategory(categoryId);
    res
        .status(200)
        .json({
        success: true,
        data: categories,
        message: "Get All SubCategories from parentID successfully",
    });
});
