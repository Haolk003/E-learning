"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseInteractSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
    },
    pageView: [
        {
            url: {
                type: String,
                required: true,
            },
            viewTime: {
                type: Date,
            },
            timeSpent: {
                type: Number,
                default: 0,
            },
            interactions: [
                {
                    type: String,
                },
            ],
        },
    ],
    totalTimeSpent: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
    countryAccess: String,
    userAgent: String,
    deviceType: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model("CourseInteract", CourseInteractSchema);
