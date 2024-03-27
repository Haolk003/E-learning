"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const user_model_1 = __importDefault(require("../models/user.model"));
const dayjs_1 = __importDefault(require("dayjs"));
const deleteUserWithoutVerification = new cron_1.CronJob("0 0 * * * *", async function () {
    const endTime3day = (0, dayjs_1.default)().subtract(3, "day");
    const findUserWithoutVerify = await user_model_1.default.deleteMany({
        isVerified: false,
        createdAt: { $lte: endTime3day },
    });
});
exports.default = deleteUserWithoutVerification;
