import express from "express";
import {
  newPaymentIntent,
  newOrder,
  checkUserPurchaseCousre,
} from "../controllers/order.controller";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/create-payment-intent", protect, newPaymentIntent);

router.post("/create-order", protect, newOrder);

router.get("/check-purcharse/:courseId", protect, checkUserPurchaseCousre);

export default router;
