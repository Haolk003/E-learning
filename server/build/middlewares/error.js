"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleWare = void 0;
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const ErrorMiddleWare = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Invalid server error";
    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new errorHandle_1.default(400, message);
    }
    //Duticate key error
    if (err.code === 11000) {
        const message = `Duticate ${Object.keys(err.keyValue)} entered`;
        err = new errorHandle_1.default(400, message);
    }
    // wrong jwt error
    if (err.name === "jsonWebTokenError") {
        const message = `Json web token is valid, try again`;
        err = new errorHandle_1.default(400, message);
    }
    // Jwt expried error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expired try again`;
        err = new errorHandle_1.default(400, message);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.ErrorMiddleWare = ErrorMiddleWare;
