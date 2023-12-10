import userModel, { IUser } from "../models/user.model";
import { Response } from "express";
import { createActiveToken } from "../utils/jwt";
import sendEmail from "../utils/sendEmail";
import ErrorHandle from "../utils/errorHandle";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwt";

type registrationUserType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

//register
const registrationUserService = async ({
  email,
  firstName,
  lastName,
  password,
}: registrationUserType) => {
  const isEmailExist = await userModel.findOne({
    email,
    loginType: "password",
  });
  if (isEmailExist) {
    throw new ErrorHandle(400, "Email is Exist");
  }
  const { activationCode, token } = await createActiveToken({
    email,
    firstName,
    lastName,
  });
  await sendEmail({
    data: {
      user: { name: `${firstName} ${lastName}` },
      activationCode: activationCode,
    },
    email: email,
    template: "activation-email.ejs",
    subject: "Activate your account",
  });
  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    loginType: "password",
  });
  return { token, user };
};

type verifyUserProps = {
  token: string;
  activationCode: number;
};
type tokenVerifyType = {
  user: { email: string };
  activationCode: number;
};

//verify user from email
const verifyUser = async ({ activationCode, token }: verifyUserProps) => {
  const verifyToken = jwt.verify(
    token,
    process.env.ACTIVATION_KEY as string
  ) as tokenVerifyType;
  if (verifyToken.activationCode !== activationCode) {
    throw new ErrorHandle(400, "Invalid activation code");
  }
  const existEmail = await userModel.findOne({
    email: verifyToken.user.email,
  });
  if (!existEmail || existEmail.isVerified) {
    throw new ErrorHandle(400, "Invalid token");
  }
  existEmail.isVerified = true;
  await existEmail.save();
  return;
};
type loginUserType = {
  email: string;
  password: string;
};

//login
const loginUser = async ({ email, password }: loginUserType) => {
  const findUser = await userModel.findOne({ email, loginType: "password" });

  if (!findUser) {
    throw new ErrorHandle(400, "Email doesn't exist");
  }
  if (!findUser.isVerified) {
    throw new ErrorHandle(400, "Unverified account");
  }
  const isMatchPassword = await findUser.comparePassword(password);
  if (!isMatchPassword) {
    throw new ErrorHandle(400, "Password is not matched");
  }
  return findUser;
};

// send a link to email to retrieve your password
const forgotPassword = async ({ email }: { email: string }) => {
  const isEmailExist = await userModel.findOne({ email: email });
  if (!isEmailExist) {
    throw new ErrorHandle(400, "Email doesn't exist");
  }
  const token = jwt.sign(
    { id: isEmailExist._id, email: isEmailExist.email },
    process.env.ACTIVATION_KEY as string,
    { expiresIn: "5m" }
  );
  await sendEmail({
    data: {
      user: { name: `${isEmailExist.firstName} ${isEmailExist.lastName}` },
      link: `http://localhost:3000/reset-password/${token}`,
    },
    email: isEmailExist.email,
    subject: "Forgot Password",
    template: "forgot-password.ejs",
  });
  return token;
};

//reset password from mail
const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  const decodeToken = jwt.verify(
    token,
    process.env.ACTIVATION_KEY as string
  ) as { id: string; email: string };
  if (!decodeToken) {
    throw new ErrorHandle(400, "Incorrect token");
  }
  const findUser = await userModel.findById(decodeToken.id);
  if (!findUser || findUser.email !== decodeToken.email) {
    throw new ErrorHandle(400, "User not found");
  }
  findUser.password = newPassword;
  await findUser.save();
  return;
};

//resend email

const resendEmail = async ({
  email,
  firstName,
  lastName,
}: {
  email: string;
  firstName: string;
  lastName: string;
}) => {
  const { activationCode, token } = await createActiveToken({
    email,
    firstName,
    lastName,
  });
  await sendEmail({
    data: {
      user: { name: `${firstName} ${lastName}` },
      activationCode: activationCode,
    },
    email: email,
    template: "activation-email.ejs",
    subject: "Activate your account",
  });
  return token;
};

const authService = {
  registrationUserService,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  resendEmail,
};

export default authService;
