import express from "express";
import passport from "passport";

import {
  registrationUser,
  verifyUser,
  loginUser,
  me,
  forgotPassword,
  resetPassword,
  logoutUser,
  googleCallback,
  facebookCallback,
  resendEmail,
  loginFailure,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth";
const router = express.Router();
router.post("/register", registrationUser);

router.post("/verify-user", verifyUser);

router.post("/login-user", loginUser);

router.get("/me", protect, me);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/logout", logoutUser);

router.get(
  "/google/callback",
  passport.authenticate("oauth2", {
    failureRedirect: "/api/v1/login-failure",
  }),
  googleCallback
);

router.get("/login-failure", loginFailure);
router.get(
  "/google",
  passport.authenticate("oauth2", {
    scope: ["email", "profile"],
    session: true,
  })
);
router.get("/facebook-login", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  facebookCallback
);
router.post("/resend-email", resendEmail);
export default router;
