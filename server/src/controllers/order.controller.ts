import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import orderService from "../services/order.service";

export const newPaymentIntent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, currency } = req.body;
    const paymentInfo = await orderService.newPaymentIntent(amount, currency);
    res.status(200).json({
      success: true,
      data: paymentInfo,
      message: "Create Payment Inter successfully",
    });
  }
);

export const newOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const { payment_intent_id, courseId } = req.body;
    const order = await orderService.newOrder(
      userId,
      courseId,
      payment_intent_id
    );
    res
      .status(200)
      .json({ status: 200, data: order, message: "Create Order Successfully" });
  }
);

export const checkUserPurchaseCousre = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const { courseId } = req.params;
    const isPurchased = await orderService.checkUserPurchaseCousre(
      courseId,
      userId
    );
    res
      .status(200)
      .json({
        success: true,
        data: isPurchased,
        message: "Check User Is Purchased Successfully",
      });
  }
);
