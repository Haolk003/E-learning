import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import userService from "../services/user.service";
import { resolveSoa } from "dns";

export const updateAvatarUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.me?._id;
    const file = req.file;
    const user = await userService.uploadAvatarUser(id, file);

    res.status(200).json({
      success: true,
      data: user,
      message: "Avatar updated successfully",
    });
  }
);
export const getAllUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUser();
    res.status(200).json({ success: true, data: users });
  }
);

export const updateProfileUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const id = req.me._id;
    const user = await userService.updateProfileUser(id, data);
    res.status(200).json({
      status: 200,
      data: user,
      message: "Profile updated successfully",
    });
  }
);

export const blockUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await userService.blockUser(id);

    res
      .status(200)
      .json({ success: true, messsage: "User is blocked successfully" });
  }
);

export const unBlockUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await userService.unBlockUser(id);

    res
      .status(200)
      .json({ success: true, message: "User is unBlocked successfully" });
  }
);

export const removeUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.me._id;
    await userService.removeUser(id);

    res
      .status(200)
      .json({ success: true, message: "Your Account deleted successfully" });
  }
);

export const getUserById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res
      .status(200)
      .json({ success: true, message: "Get User is successfully", data: user });
  }
);

export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.me._id;
    const { newPassword, oldPassword } = req.body;
    await userService.updatePassword(id, { newPassword, oldPassword });

    res
      .status(200)
      .json({ success: true, message: "Update Password successfully" });
  }
);

export const convertUserToIntructor = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.me._id;
    await userService.convertUserToIntructor(id);

    res
      .status(200)
      .json({ success: true, message: "You are now an instructor" });
  }
);

export const becomeIntructor = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.me._id;
    const response = await userService.becomeIntructor(userId);
    res.status(200).json({
      status: 200,
      data: response,
      message: "You became a instructor",
    });
  }
);

export const getUserProfileInstructor = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await userService.getUserProfileIntructor(id);
    res.status(200).json({
      success: true,
      data: response,
      message: "Get Profile Intructor successfully",
    });
  }
);

export const getAllStudentsByAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const response = await userService.getAllStudentsByAdmin(query);
    res.status(200).json({
      success: true,
      data: response,
      message: "Get Al Students Successfully",
    });
  }
);

export const getAllInstructor = CatchAsyncError(
  async (req: Request, res: Response) => {
    const query = req.query;
    const response = await userService.getAllIntructor(query);
    res.status(200).json({
      status: 200,
      data: response,
      message: "Get All Instructor Successfully",
    });
  }
);

export const getTopInstructor = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await userService.getTopInstructor();
    res
      .status(200)
      .json({
        success: true,
        data: response,
        message: "Get Top Instructor Successfully",
      });
  }
);
