"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-payment-intent", auth_1.protect, order_controller_1.newPaymentIntent);
router.post("/create-order", auth_1.protect, order_controller_1.newOrder);
router.get("/check-purcharse/:courseId", auth_1.protect, order_controller_1.checkUserPurchaseCousre);
router.post("/new-order-cart", auth_1.protect, order_controller_1.newOrderCart);
exports.default = router;
