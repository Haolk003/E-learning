"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgResize = exports.uploadPhoto = void 0;
const sharp_1 = __importDefault(require("sharp"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const muterStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../public/images"));
    },
    filename(req, file, callback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        callback(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb({ message: "Unsupported file format" }, false);
    }
};
exports.uploadPhoto = (0, multer_1.default)({
    storage: muterStorage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000 },
});
const ImgResize = async (req, res, next) => {
    const file = req.file;
    if (file) {
        await (0, sharp_1.default)(file.path)
            .toFormat("jpeg")
            .resize(300, 300)
            .jpeg({ quality: 100 })
            .toFile(`src/public/images/resize/${file.filename}`);
        fs_1.default.unlinkSync(`src/public/images/${file.filename}`);
        file.path = `src/public/images/resize/${file.filename}`;
    }
    else {
        return next();
    }
    next();
};
exports.ImgResize = ImgResize;
