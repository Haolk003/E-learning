import CategoryModel from "../models/category.model";
import ErrorHandle from "../utils/errorHandle";

type newCategoryType = {
  name: string;
  icon?: string;
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
  const categories = await CategoryModel.find().sort("-courseCount");
  return categories;
};

const deleteCategory = async (id: string) => {
  const deleteCategory = await CategoryModel.findByIdAndDelete(id);
  if (!deleteCategory) {
    throw new ErrorHandle(400, "Category not found");
  }
  return deleteCategory;
};
const categoryService = {
  newCategory,
  updateCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
};

export default categoryService;
