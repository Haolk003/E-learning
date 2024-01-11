import { Request, Response, NextFunction } from "express";

import categoryService from "../services/category.service";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

export const newCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const newCategory = await categoryService.newCategory(data);
    res.status(200).json({
      success: true,
      data: newCategory,
      message: "Create Category Successfully",
    });
  }
);

export const updateCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { id } = req.params;
    const updateCategory = await categoryService.updateCategory(id, data);
    res.status(200).json({
      success: true,
      data: updateCategory,
      message: "Update Category Successfully",
    });
  }
);

export const getCategoryById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    res.status(200).json({
      success: true,
      data: category,
      message: "Get Category By Id Successfully",
    });
  }
);

export const getAllCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      data: categories,
      message: "Get All Categories Successfully",
    });
  }
);

export const deleteCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deleteCategory = await categoryService.deleteCategory(id);

    res
      .status(200)
      .json({
        success: true,
        data: deleteCategory,
        message: "Category deleted Successfully",
      });
  }
);
