import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandle from "../utils/errorHandle";
import userModel from "../models/user.model";
import { accessTokenOptions, refeshTokenOptions } from "../utils/jwt";
import reviewModel from "../models/review.model";
import { CatchAsyncError } from "./catchAsyncError";
import { redis } from "../utils/redis";
export const protect = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let accessToken = req.cookies.access_token as string;

    if (!accessToken) {
      const refeshToken = req.cookies.refesh_token as string;
      if (!refeshToken) {
        throw new ErrorHandle(400, "Please login to access this resource");
      }
      const decodeToken = jwt.verify(
        refeshToken,
        process.env.REFESH_TOKEN as string
      ) as { id: string; role: string };
      if (!decodeToken) {
        throw new ErrorHandle(400, "Token is not valid");
      }
      accessToken = jwt.sign(
        { id: decodeToken.id, role: decodeToken.role },
        process.env.ACCESS_TOKEN as string
      );
      const newRefeshToken = jwt.sign(
        { id: decodeToken.id, role: decodeToken.role },
        process.env.REFESH_TOKEN as string
      );
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refesh_token", newRefeshToken, refeshTokenOptions);
    }
    const decodeToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN as string
    ) as { id: string; role: string };
    if (!decodeToken) {
      throw new ErrorHandle(400, "Token is not valid");
    }

    const findRedis = await redis.get(decodeToken.id);
    if (!findRedis) {
      const findUser = await userModel
        .findById(decodeToken.id)
        .select("-password");
      if (!findUser) {
        throw new ErrorHandle(400, "user not found");
      }
      if (findUser.isBanned) {
        throw new ErrorHandle(400, "user is banned");
      }
      redis.set(decodeToken.id, JSON.stringify(findUser), "EX", 604800);
      req.me = findUser;
    } else {
      req.me = JSON.parse(findRedis as string);
    }
    next();
  }
);

export const extractUserId = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let accessToken = req.cookies.access_token as string;
    if (!accessToken) {
      const refeshToken = req.cookies.refesh_token as string;
      if (!refeshToken) {
        return next();
      }
      const decodeToken = jwt.verify(
        refeshToken,
        process.env.REFESH_TOKEN as string
      ) as { id: string; role: string };
      if (!decodeToken) {
        return next();
      }
    }
    const decodeToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN as string
    ) as { id: string; role: string };
    if (!decodeToken) {
      return next();
    }

    const findRedis = await redis.get(decodeToken.id);
    if (!findRedis) {
      const findUser = await userModel
        .findById(decodeToken.id)
        .select("-password");
      if (!findUser) {
        return next();
      }
      if (findUser.isBanned) {
        return next();
      }

      req.me = findUser;
    } else {
      req.me = JSON.parse(findRedis as string);
    }
    next();
  }
);
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.me?.role) {
      throw new ErrorHandle(400, "Please login to access this course");
    } else {
      if (!roles.includes(req.me.role) || "") {
        throw new ErrorHandle(
          400,
          `Role:${req.me?.role} is not allowed to access this resource`
        );
      }
      next();
    }
  };
};
