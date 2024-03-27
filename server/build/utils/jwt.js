"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActiveToken = exports.sendToken = exports.refeshTokenOptions = exports.accessTokenOptions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.accessTokenOptions = {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    expires: new Date(Date.now() + 60 * 60 * 1000),
    domain: process.env.NODE_ENV === "production"
        ? process.env.BACKEND_DOMAIN
        : "localhost",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
};
exports.refeshTokenOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    domain: process.env.NODE_ENV === "production"
        ? process.env.BACKEND_DOMAIN
        : "localhost",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
};
const sendToken = async (user, res) => {
    const accessToken = await user.signAccessToken();
    const refeshToken = await user.signRefeshToken();
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.cookie("refesh_token", refeshToken, exports.refeshTokenOptions);
};
exports.sendToken = sendToken;
const createActiveToken = ({ email, firstName, lastName, }) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000);
    const token = jsonwebtoken_1.default.sign({ user: { email, firstName, lastName }, activationCode: activationCode }, process.env.ACTIVATION_KEY, { expiresIn: "1d" });
    return { activationCode, token };
};
exports.createActiveToken = createActiveToken;
