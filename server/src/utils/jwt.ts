import userModel from "../models/user.model";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";

export const accessTokenOptions: CookieOptions = {
  sameSite: "lax",
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
  secure: false,
  expires: new Date(Date.now() + 60 * 60 * 1000),
};
export const refeshTokenOptions: CookieOptions = {
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: false,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};
export const sendToken = async (user: IUser, res: Response) => {
  const accessToken = await user.signAccessToken();
  const refeshToken = await user.signRefeshToken();
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refesh_token", refeshToken, refeshTokenOptions);
};
type IActivationToken = {
  email: string;
  firstName: string;
  lastName: string;
};

export const createActiveToken = ({
  email,
  firstName,
  lastName,
}: IActivationToken) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000);
  const token = jwt.sign(
    { user: { email, firstName, lastName }, activationCode: activationCode },
    process.env.ACTIVATION_KEY as string,
    { expiresIn: "1d" }
  );
  return { activationCode, token };
};
