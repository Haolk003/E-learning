import express from "express";
import * as notifyController from "../controllers/notify.controller";
import { protect, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.post("/create-notify", protect, notifyController.createNotify);

router.put("/update-status-notify/:id", protect, notifyController.updateNotify);

router.get("/get-notify-id/:id", protect, notifyController.getNotifyById);

router.get(
  "/get-all-notify-user",
  protect,
  notifyController.getAllNotifications
);

router.delete("/delete-notify/:id", protect, notifyController.deleteNotify);

export default router;
