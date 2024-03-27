"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    parent_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    name: String,
    description: String,
    isCategory: {
        type: Boolean,
        default: true,
    },
    courseCount: {
        type: Number,
        default: 0,
    },
});
const CategoryModel = mongoose_1.default.model("Category", categorySchema);
exports.default = CategoryModel;
