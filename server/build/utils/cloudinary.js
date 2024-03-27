"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = exports.deleteVideo = exports.deleteImage = exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const errorHandle_1 = __importDefault(require("./errorHandle"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const socketIo_1 = require("../app/socketIo");
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUND_NAME,
    api_key: process.env.API_KEY_CLOUND,
    api_secret: process.env.API_SECRET_CLOUND,
});
const uploadFile = async (folderName, path) => {
    const result = await cloudinary_1.v2.uploader.upload(path, {
        folder: folderName,
    });
    fs_1.default.unlinkSync(path);
    return result;
};
exports.uploadFile = uploadFile;
const deleteImage = async (public_id) => {
    try {
        const result = await cloudinary_1.v2.uploader.destroy(public_id);
        return result;
    }
    catch (err) {
        throw new errorHandle_1.default(400, err.message);
    }
};
exports.deleteImage = deleteImage;
const deleteVideo = async (public_id) => {
    try {
        const result = await cloudinary_1.v2.api.delete_resources([public_id], {
            type: "upload",
            resource_type: "video",
        });
        return result;
    }
    catch (err) {
        throw new errorHandle_1.default(400, "Delete File Failure");
    }
};
exports.deleteVideo = deleteVideo;
const uploadVideo = async (path, id) => {
    const file = fs_1.default.createReadStream(path);
    const io = (0, socketIo_1.getSocketInstance)();
    // return new Promise((resolve, reject) => {
    const stream = cloudinary_1.v2.uploader.upload_stream({
        resource_type: "video",
        folder: "video",
        format: "mp4",
        transformation: {
            quality: 50,
            width: 1280,
            height: 720,
        },
    }, (error, result) => {
        stream.end();
        fs_1.default.unlinkSync(path);
        if (error) {
            throw new errorHandle_1.default(400, error.message);
        }
        if (result) {
            io.emit(`video-result`, { id: id, result: result });
        }
    });
    const total = fs_1.default.statSync(path).size;
    let resend = 0;
    stream.on("drain", () => {
        const percentUpload = Math.round((file.bytesRead / total) * 100);
        if (resend !== percentUpload) {
            io.emit(`percent-upload`, { result: percentUpload, id: id });
        }
        resend = percentUpload;
    });
    file.pipe(stream);
    // });
};
exports.uploadVideo = uploadVideo;
