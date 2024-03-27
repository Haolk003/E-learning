"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.extractUserId = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const catchAsyncError_1 = require("./catchAsyncError");
exports.protect = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    let accessToken = req.cookies.access_token;
    if (!accessToken) {
        const refeshToken = req.cookies.refesh_token;
        if (!refeshToken) {
            throw new errorHandle_1.default(400, "Please login to access this resource");
        }
        const decodeToken = jsonwebtoken_1.default.verify(refeshToken, process.env.REFESH_TOKEN);
        if (!decodeToken) {
            throw new errorHandle_1.default(400, "Token is not valid");
        }
        accessToken = jsonwebtoken_1.default.sign({ id: decodeToken.id, role: decodeToken.role }, process.env.ACCESS_TOKEN);
        const newRefeshToken = jsonwebtoken_1.default.sign({ id: decodeToken.id, role: decodeToken.role }, process.env.REFESH_TOKEN);
        res.cookie("access_token", accessToken, jwt_1.accessTokenOptions);
        res.cookie("refesh_token", newRefeshToken, jwt_1.refeshTokenOptions);
    }
    const decodeToken = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN);
    if (!decodeToken) {
        throw new errorHandle_1.default(400, "Token is not valid");
    }
    const findUser = await user_model_1.default
        .findById(decodeToken.id)
        .select("-password");
    if (!findUser) {
        throw new errorHandle_1.default(400, "user not found");
    }
    if (findUser.isBanned) {
        throw new errorHandle_1.default(400, "user is banned");
    }
    req.me = findUser;
    next();
});
exports.extractUserId = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    let accessToken = req.cookies.access_token;
    if (!accessToken) {
        const refeshToken = req.cookies.refesh_token;
        if (!refeshToken) {
            return next();
        }
        const decodeToken = jsonwebtoken_1.default.verify(refeshToken, process.env.REFESH_TOKEN);
        if (!decodeToken) {
            return next();
        }
    }
    const decodeToken = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN);
    if (!decodeToken) {
        return next();
    }
    const findUser = await user_model_1.default
        .findById(decodeToken.id)
        .select("-password");
    if (!findUser) {
        return next();
    }
    if (findUser.isBanned) {
        return next();
    }
    req.me = findUser;
    next();
});
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.me?.role) {
            throw new errorHandle_1.default(400, "Please login to access this course");
        }
        else {
            if (!roles.includes(req.me.role) || "") {
                throw new errorHandle_1.default(400, `Role:${req.me?.role} is not allowed to access this resource`);
            }
            next();
        }
    };
};
exports.authorizeRoles = authorizeRoles;
