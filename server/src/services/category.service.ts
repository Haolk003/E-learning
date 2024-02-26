import CategoryModel from "../models/category.model";
import ErrorHandle from "../utils/errorHandle";

type newCategoryType = {
  name: string;
  icon?: string;
  parent_id?: string;
  description?: string;
};
const newCategory = async (data: newCategoryType) => {
  const newCategory = await CategoryModel.create(data);
  return newCategory;
};

const updateCategory = async (id: string, data: newCategoryType) => {
  const updateCategory = await CategoryModel.findByIdAndUpdate(
    id,
    { $set: { data } },
    { new: true }
  );
  if (!updateCategory) {
    throw new ErrorHandle(400, "Can not update category");
  }
  return updateCategory;
};

const getCategoryById = async (id: string) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw new ErrorHandle(400, "Category not found");
  }
  return category;
};

const getAllCategory = async () => {
  const resultCategories = await CategoryModel.aggregate([
    {
      $match: {
        parent_id: null,
      },
    },
    {
      $lookup: {
        from: "categories", // your collection name
        localField: "_id",
        foreignField: "parent_id",
        as: "subcategories",
      },
    },
  ]);

  return resultCategories;
};

const deleteCategory = async (id: string) => {
  const deleteCategory = await CategoryModel.findByIdAndDelete(id);
  if (!deleteCategory) {
    throw new ErrorHandle(400, "Category not found");
  }
  return deleteCategory;
};

const getAllSubCategory = async (id: string) => {
  const subCategories = await CategoryModel.find({ parent_id: id })
    .populate("parent_id", "name")
    .select("parent_id name");
  return subCategories;
};

const categoryService = {
  newCategory,
  updateCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  getAllSubCategory,
};

export default categoryService;
