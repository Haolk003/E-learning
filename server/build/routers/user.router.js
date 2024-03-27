"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const user_controller_1 = require("../controllers/user.controller");
const uploadImage_1 = require("../middlewares/uploadImage");
const router = express_1.default.Router();
router.put("/update-avatar-profile", auth_1.protect, uploadImage_1.uploadPhoto.single("myFile"), user_controller_1.updateAvatarUser);
router.get("/get-all-user", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), user_controller_1.getAllUser);
router.put("/block-user/:id", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), user_controller_1.blockUser);
router.put("/unblock-user/:id", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), user_controller_1.unBlockUser);
router.put("/convertUserToIntructor", auth_1.protect, user_controller_1.convertUserToIntructor);
router.get("/getUserById/:id", user_controller_1.getUserById);
router.delete("/removeAccount", auth_1.protect, user_controller_1.removeUser);
router.put("/updateProfileUser", auth_1.protect, user_controller_1.updateProfileUser);
router.put("/update-password", auth_1.protect, user_controller_1.updatePassword);
router.put("/become-instructor", auth_1.protect, user_controller_1.becomeIntructor);
router.get("/get-profile-instructor/:id", user_controller_1.getUserProfileInstructor);
router.get("/get-all-instructor", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), user_controller_1.getAllInstructor);
router.get("/get-all-students", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), user_controller_1.getAllStudentsByAdmin);
router.get("/get-top-instructor", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), user_controller_1.getTopInstructor);
exports.default = router;
