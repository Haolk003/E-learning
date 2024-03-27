"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandle extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandle;
