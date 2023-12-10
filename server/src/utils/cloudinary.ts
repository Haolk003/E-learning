import { v2 as cloudinary } from "cloudinary";
import ErrorHandle from "./errorHandle";
import dotenv from "dotenv";
import fs from "fs";
import { getSocketInstance } from "../app/socketIo";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.API_KEY_CLOUND,
  api_secret: process.env.API_SECRET_CLOUND,
});

export const uploadFile = async (folderName: string, path: string) => {
  const result = await cloudinary.uploader.upload(path, {
    folder: folderName,
  });
  fs.unlinkSync(path);
  return result;
};

export const deleteImage = async (public_id: string) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (err: any) {
    throw new ErrorHandle(400, err.message);
  }
};
export const deleteVideo = async (public_id: string) => {
  try {
    const result = await cloudinary.api.delete_resources([public_id], {
      type: "upload",
      resource_type: "video",
    });
    return result;
  } catch (err: any) {
    throw new ErrorHandle(400, "Delete File Failure");
  }
};
export const uploadVideo = async (path: string, id: string) => {
  const file = fs.createReadStream(path);
  const io = getSocketInstance();
  // return new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    {
      resource_type: "video",
      folder: "video",
      format: "mp4",
      transformation: {
        quality: 50,
        width: 1280,
        height: 720,
      },
    },
    (error, result) => {
      stream.end();
      fs.unlinkSync(path);
      if (error) {
        console.log(error);
      }
      if (result) {
        io.emit(`video-result`, { id: id, result: result });
        console.log(result);
      }
    }
  );
  const total = fs.statSync(path).size;
  let resend = 0;
  stream.on("drain", () => {
    const percentUpload = Math.round((file.bytesRead / total) * 100);
    if (resend !== percentUpload) {
      io.emit(`percent-upload`, { result: percentUpload, id: id });
      console.log(percentUpload + "%");
    }
    resend = percentUpload;
  });

  file.pipe(stream);
  // });
};
