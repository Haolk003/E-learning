"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.registrationUser);
router.post("/verify-user", auth_controller_1.verifyUser);
router.post("/login-user", auth_controller_1.loginUser);
router.get("/me", auth_1.protect, auth_controller_1.me);
router.post("/forgot-password", auth_controller_1.forgotPassword);
router.post("/reset-password", auth_controller_1.resetPassword);
router.post("/logout", auth_controller_1.logoutUser);
router.get("/google/callback", passport_1.default.authenticate("oauth2", {
    failureRedirect: "/api/v1/login-failure",
}), auth_controller_1.googleCallback);
router.get("/login-failure", auth_controller_1.loginFailure);
router.get("/google", passport_1.default.authenticate("oauth2", {
    scope: ["email", "profile"],
    session: true,
}));
router.get("/facebook-login", passport_1.default.authenticate("facebook"));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/login" }), auth_controller_1.facebookCallback);
router.post("/resend-email", auth_controller_1.resendEmail);
exports.default = router;
