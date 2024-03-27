"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/new-category", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), category_controller_1.newCategory);
router.put("/update-category/:id", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), category_controller_1.updateCategory);
router.get("/get-category-id/:id", category_controller_1.getCategoryById);
router.get("/get-all-categories", category_controller_1.getAllCategory);
router.delete("/delete-category/:id", auth_1.protect, (0, auth_1.authorizeRoles)("admin"), category_controller_1.deleteCategory);
router.get("/get-all-subCategory-categoryId/:categoryId", category_controller_1.getAllSubCategoryFromCategoryId);
exports.default = router;
