"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFailure = exports.resendEmail = exports.facebookCallback = exports.googleCallback = exports.resetPassword = exports.forgotPassword = exports.me = exports.logoutUser = exports.loginUser = exports.verifyUser = exports.registrationUser = void 0;
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const jwt_1 = require("../utils/jwt");
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const redis_1 = require("../utils/redis");
const jwt_2 = require("../utils/jwt");
const registrationUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    const { token, user } = await auth_service_1.default.registrationUser({
        email,
        password,
        firstName,
        lastName,
    });
    res.status(200).json({ status: 200, data: { token, user } });
});
exports.registrationUser = registrationUser;
const verifyUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { token, activation_code } = req.body;
    const user = await auth_service_1.default.verifyUser({
        token,
        activationCode: activation_code,
    });
    res
        .status(200)
        .json({ status: 200, message: "User verified successfully", data: user });
});
exports.verifyUser = verifyUser;
const loginUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await auth_service_1.default.loginUser({ email, password });
    await (0, jwt_1.sendToken)(user, res);
    res
        .status(200)
        .json({ status: 200, message: "User login successfully", user: user });
});
exports.loginUser = loginUser;
const me = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const user = req.me;
    res
        .status(200)
        .json({ status: 200, data: user, message: "Load user successfully" });
});
exports.me = me;
const forgotPassword = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { email } = req.body;
    const token = await auth_service_1.default.forgotPassword({ email });
    res
        .status(200)
        .json({ status: 200, data: token, message: "Please check your email" });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { token, newPassword } = req.body;
    await auth_service_1.default.resetPassword({ token, newPassword });
    res.status(200).json({
        status: 200,
        data: null,
        message: "Reset Password is succesfully",
    });
});
exports.resetPassword = resetPassword;
const logoutUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    res.clearCookie("access_token", jwt_2.accessTokenOptions);
    res.clearCookie("refesh_token", jwt_2.refeshTokenOptions);
    const userId = req.me?._id;
    redis_1.redis.del(userId);
    req.logout(function (err) {
        if (err)
            return next(new errorHandle_1.default(400, err.message));
    });
    res.status(200).json({ status: 200, message: "Logout is successfully" });
});
exports.logoutUser = logoutUser;
//set cookies into header
const googleCallback = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const user = req.user;
    await (0, jwt_1.sendToken)(user, res);
    res
        .status(200)
        .redirect(process.env.NODE_ENV === "production"
        ? process.env.CLIENT_HOST2
        : process.env.CLIENT_HOST);
});
exports.googleCallback = googleCallback;
// set cookies into header
const facebookCallback = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const user = req.user;
    await (0, jwt_1.sendToken)(user, res);
    res
        .status(200)
        .redirect(process.env.NODE_ENV === "production"
        ? process.env.CLIENT_HOST2
        : process.env.CLIENT_HOST);
});
exports.facebookCallback = facebookCallback;
const resendEmail = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { email, firstName, lastName } = req.body;
    const token = await auth_service_1.default.resendEmail({ email, firstName, lastName });
    res
        .status(200)
        .json({ status: 200, data: token, message: "Resend Email Successfully" });
});
exports.resendEmail = resendEmail;
const loginFailure = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    res.status(200).json({ message: "error login " });
});
exports.loginFailure = loginFailure;
