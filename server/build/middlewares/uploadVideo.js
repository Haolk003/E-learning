"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoMulter = exports.multerFilter = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const multerStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../public/video"));
    },
    filename(req, file, callback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, file.fieldname + uniqueSuffix + ".mp4");
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("video")) {
        cb(null, true);
    }
    else {
        cb({ message: "Unsupported file format" }, false);
    }
};
exports.multerFilter = multerFilter;
exports.uploadVideoMulter = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: exports.multerFilter,
});
