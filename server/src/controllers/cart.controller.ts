import { Request, Response, NextFunction } from "express";

import cartService from "../services/cart.service";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

export const addToCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, price } = req.body;
    const userId = req.me._id;
    const cart = await cartService.addCart({
      userId,
      courseId: courseId,
      price,
    });
    res.status(200).json({
      success: true,
      data: cart,
      message: "Product added to cart successfully",
    });
  }
);

export const updateCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, price } = req.body;
    const userId = req.me._id;
    const cart = await cartService.editCart({
      userId,
      courseId,
      price,
    });
    res.status(200).json({
      success: true,
      data: cart,
      message: "Cart updated successfully",
    });
  }
);

export const deleteCourseIdInCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const userId = req.me._id;
    const cart = await cartService.deleteCourseIdInCart(userId, courseId);
    res.status(200).json({
      success: true,
      data: cart,
      message: "Product removed from cart successfully",
    });
  }
);

export const deleteAllCourseInCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const cart = await cartService.deleteAllCourseInCart(userId);
    res.status(200).json({
      success: true,
      data: cart,
      message: "All Product removed from cart successfully",
    });
  }
);

export const getCart = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const cart = await cartService.getAddedCart(userId);
    res.status(200).json({
      success: true,
      data: cart,
      message: "Cart retrieved successfully",
    });
  }
);
