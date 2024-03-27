"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("../models/category.model"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
class CategoryService {
    async newCategory(data) {
        try {
            const newCategory = await category_model_1.default.create(data);
            return newCategory;
        }
        catch (error) {
            throw new errorHandle_1.default(500, "Cannot create category");
        }
    }
    async updateCategory(id, data) {
        try {
            const updatedCategory = await category_model_1.default.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
            if (!updatedCategory) {
                throw new errorHandle_1.default(400, "Category not found");
            }
            return updatedCategory;
        }
        catch (error) {
            throw new errorHandle_1.default(500, "Cannot update category");
        }
    }
    async getCategoryById(id) {
        const category = await category_model_1.default.findById(id);
        if (!category) {
            throw new errorHandle_1.default(400, "Category not found");
        }
        return category;
    }
    async getAllCategory() {
        const categories = await category_model_1.default.aggregate([
            {
                $match: {
                    parent_id: null,
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "parent_id",
                    as: "subcategories",
                },
            },
            {
                $sort: {
                    courseCount: -1, // Sắp xếp giảm dần, sử dụng 1 để sắp xếp tăng dần
                },
            },
        ]);
        return categories;
    }
    async deleteCategory(id) {
        const category = await category_model_1.default.findByIdAndDelete(id);
        if (!category) {
            throw new errorHandle_1.default(400, "Category not found");
        }
        const deleteSubCategory = await category_model_1.default.deleteMany({ parent_id: id });
        return category;
    }
    async getAllSubCategory(parentId) {
        const subCategories = await category_model_1.default.find({ parent_id: parentId })
            .populate("parent_id", "name")
            .select("name icon description");
        return subCategories;
    }
}
exports.default = new CategoryService();
