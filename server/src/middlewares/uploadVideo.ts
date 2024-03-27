import multer from "multer";
import { Request, Response, NextFunction } from "express";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/video"));
  },
  filename(req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + uniqueSuffix + ".mp4");
  },
});

export const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
export const uploadVideoMulter = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
