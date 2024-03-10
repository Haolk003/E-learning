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
  convertUserToIntructor,
  becomeIntructor,
  getUserProfileInstructor,
  getAllInstructor,
  getAllStudentsByAdmin,
  getTopInstructor,
} from "../controllers/user.controller";
import { ImgResize, uploadPhoto } from "../middlewares/uploadImage";
import { runInThisContext } from "vm";

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

router.put("/convertUserToIntructor", protect, convertUserToIntructor);

router.get("/getUserById/:id", getUserById);

router.delete("/removeAccount", protect, removeUser);

router.put("/updateProfileUser", protect, updateProfileUser);

router.put("/update-password", protect, updatePassword);

router.put("/become-instructor", protect, becomeIntructor);

router.get("/get-profile-instructor/:id", getUserProfileInstructor);

router.get(
  "/get-all-instructor",
  protect,
  authorizeRoles("admin"),
  getAllInstructor
);

router.get(
  "/get-all-students",
  protect,
  authorizeRoles("admin"),
  getAllStudentsByAdmin
);

router.get(
  "/get-top-instructor",
  protect,
  authorizeRoles("admin"),
  getTopInstructor
);
export default router;
