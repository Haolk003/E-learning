import express from "express";
import {
  newPaymentIntent,
  newOrder,
  checkUserPurchaseCousre,
  newOrderCart,
} from "../controllers/order.controller";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/create-payment-intent", protect, newPaymentIntent);

router.post("/create-order", protect, newOrder);

router.get("/check-purcharse/:courseId", protect, checkUserPurchaseCousre);

router.post("/new-order-cart", protect, newOrderCart);
export default router;
