import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import authService from "../services/auth.service";
import { sendToken } from "../utils/jwt";
import ErrorHandle from "../utils/errorHandle";
import { redis } from "../utils/redis";

const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName } = req.body;
    const { token, user } = await authService.registrationUser({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(200).json({ status: 200, data: { token, user } });
  }
);

const verifyUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, activation_code } = req.body;
    const user = await authService.verifyUser({
      token,
      activationCode: activation_code,
    });
    res
      .status(200)
      .json({ status: 200, message: "User verified successfully", data: user });
  }
);

const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await authService.loginUser({ email, password });
    await sendToken(user, res);
    res
      .status(200)
      .json({ status: 200, message: "User login successfully", user: user });
  }
);

const me = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.me;
    res
      .status(200)
      .json({ status: 200, data: user, message: "Load user successfully" });
  }
);

const forgotPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const token = await authService.forgotPassword({ email });
    res
      .status(200)
      .json({ status: 200, data: token, message: "Please check your email" });
  }
);

const resetPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;
    await authService.resetPassword({ token, newPassword });
    res.status(200).json({
      status: 200,
      data: null,
      message: "Reset Password is succesfully",
    });
  }
);

const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access_token");
    res.clearCookie("refesh_token");

    const userId = req.me?._id;
    redis.del(userId);
    req.logout(function (err) {
      if (err) return next(new ErrorHandle(400, err.message));
    });
    res.status(200).json({ status: 200, message: "Logout is successfully" });
  }
);
//set cookies into header
const googleCallback = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;

    await sendToken(user, res);
    res.status(200).redirect(process.env.CLIENT_HOST as string);
  }
);

// set cookies into header
const facebookCallback = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    await sendToken(user, res);
    res.status(200).redirect(process.env.CLIENT_HOST as string);
  }
);

const resendEmail = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, firstName, lastName } = req.body;
    const token = await authService.resendEmail({ email, firstName, lastName });

    res
      .status(200)
      .json({ status: 200, data: token, message: "Resend Email Successfully" });
  }
);

const loginFailure = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "error login " });
  }
);
export {
  registrationUser,
  verifyUser,
  loginUser,
  logoutUser,
  me,
  forgotPassword,
  resetPassword,
  googleCallback,
  facebookCallback,
  resendEmail,
  loginFailure,
};
