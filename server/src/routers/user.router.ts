import express from "express";
import { protect, authorizeRoles } from "../middlewares/auth";
import {
  getAllUser,
  updateAvatarUser,
  blockUser,
  getUserById,
  removeUser,
  unBlockUser,
  updateProfileUser,
  updatePassword,
} from "../controllers/user.controller";
import { ImgResize, uploadPhoto } from "../middlewares/uploadImage";
const router = express.Router();

router.put(
  "/update-avatar-profile",
  protect,
  uploadPhoto.single("myFile"),
  ImgResize,
  updateAvatarUser
);

router.get("/get-all-user", protect, authorizeRoles("admin"), getAllUser);

router.put("/block-user/:id", protect, authorizeRoles("admin"), blockUser);

router.put("/unblock-user/:id", protect, authorizeRoles("admin"), unBlockUser);

router.get("/getUserById/:id", getUserById);

router.delete("/removeAccount", protect, removeUser);

router.put("/updateProfileUser", protect, updateProfileUser);

router.put("/update-password", protect, updatePassword);
export default router;
