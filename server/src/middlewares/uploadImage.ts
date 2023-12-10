import sharp from "sharp";
import multer from "multer";
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

const muterStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename(req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

export const uploadPhoto = multer({
  storage: muterStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

interface File {
  path: string;
  filename: string;
}

export const ImgResize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  if (file) {
    await sharp(file.path)
      .toFormat("jpeg")
      .resize(300, 300)
      .jpeg({ quality: 100 })
      .toFile(`src/public/images/resize/${file.filename}`);
    fs.unlinkSync(`src/public/images/${file.filename}`);

    file.path = `src/public/images/resize/${file.filename}`;
  } else {
    return next();
  }
  next();
};
