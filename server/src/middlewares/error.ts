import { NextFunction, Request, Response } from "express";
import ErrorHandle from "../utils/errorHandle";

export const ErrorMiddleWare = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Invalid server error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandle(400, message);
  }

  //Duticate key error
  if (err.code === 11000) {
    const message = `Duticate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandle(400, message);
  }

  // wrong jwt error
  if (err.name === "jsonWebTokenError") {
    const message = `Json web token is valid, try again`;
    err = new ErrorHandle(400, message);
  }

  // Jwt expried error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired try again`;
    err = new ErrorHandle(400, message);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
