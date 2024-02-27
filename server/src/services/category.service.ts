import mongoose from "mongoose";
import CategoryModel from "../models/category.model";
import ErrorHandle from "../utils/errorHandle";

interface NewCategoryType {
  name: string;
  icon?: string;
  parent_id?: mongoose.Types.ObjectId | null;
  description?: string;
}

class CategoryService {
  async newCategory(data: NewCategoryType) {
    try {
      const newCategory = await CategoryModel.create(data);
      return newCategory;
    } catch (error) {
      throw new ErrorHandle(500, "Cannot create category");
    }
  }

  async updateCategory(id: string, data: NewCategoryType) {
    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      );
      if (!updatedCategory) {
        throw new ErrorHandle(400, "Category not found");
      }
      return updatedCategory;
    } catch (error) {
      throw new ErrorHandle(500, "Cannot update category");
    }
  }

  async getCategoryById(id: string) {
    const category = await CategoryModel.findById(id);
    if (!category) {
      throw new ErrorHandle(400, "Category not found");
    }
    return category;
  }

  async getAllCategory() {
    const categories = await CategoryModel.aggregate([
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
    ]);
    return categories;
  }

  async deleteCategory(id: string) {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new ErrorHandle(400, "Category not found");
    }
    return category;
  }

  async getAllSubCategory(parentId: string) {
    const subCategories = await CategoryModel.find({ parent_id: parentId })
      .populate("parent_id", "name")
      .select("name icon description");
    return subCategories;
  }
}

export default new CategoryService();
