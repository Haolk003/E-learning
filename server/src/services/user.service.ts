import userModel from "../models/user.model";
import { uploadFile, deleteImage } from "../utils/cloudinary";
import ErrorHandle from "../utils/errorHandle";

const getAllUser = async () => {
  const user = await userModel.find().select("-password");

  return user;
};

type updateUserType = {
  firstName?: string;
  lastName?: string;
  headline?: string;
  website?: string;
  bio?: string;
  linkedin?: string;
  youtubeLink?: string;
  facebookLink?: string;
  twitterLink?: string;
};
const updateProfileUser = async (id: string, data: updateUserType) => {
  const findUser = await userModel.findById(id);
  if (!findUser) {
    throw new ErrorHandle(400, "User not found");
  }
  findUser.firstName = data.firstName || findUser.firstName;
  findUser.lastName = data.lastName || findUser.lastName;
  findUser.headline = data.headline || findUser.headline;
  findUser.bio = data.bio || findUser.bio;
  findUser.facebookLink = data.facebookLink || findUser.facebookLink;
  findUser.linkedin = data.linkedin || findUser.linkedin;
  findUser.youtubeLink = data.youtubeLink || findUser.youtubeLink;
  findUser.website = data.website || findUser.website;
  findUser.twitterLink = data.twitterLink || findUser.twitterLink;
  await findUser.save();
  return findUser;
};

const uploadAvatarUser = async (id: string, file: any) => {
  const { path } = file;
  console.log(id);

  const findUser = await userModel
    .findById(id.toString())
    .select("-password -role");
  if (!findUser) {
    throw new ErrorHandle(400, "User not found");
  }
  if (findUser?.avatar?.public_id) {
    await deleteImage(findUser.avatar.public_id);
  }
  const result = await uploadFile("avatar", path);
  findUser.avatar = { public_id: result.public_id, url: result.url };
  await findUser.save();

  return findUser;
};

const blockUser = async (id: string) => {
  const blockUser = await userModel.findByIdAndUpdate(
    id,
    { $set: { isBanned: true } },
    { new: true }
  );
  if (!blockUser) {
    throw new ErrorHandle(400, "User not found");
  }
  return;
};

const unBlockUser = async (id: string) => {
  const blockUser = await userModel.findByIdAndUpdate(
    id,
    { $set: { isBanned: false } },
    { new: true }
  );
  if (!blockUser) {
    throw new ErrorHandle(400, "User not found");
  }
  return;
};

const removeUser = async (id: string) => {
  const removeUser = await userModel.findByIdAndDelete(id);
  if (!removeUser) {
    throw new ErrorHandle(400, "User not found");
  }
  return;
};

const getUserById = async (id: string) => {
  const user = await userModel
    .findById(id)
    .select(
      "-password -isBanned -isVerified -googleUserId -facebookUserId -loginType -role"
    );
  if (!user) {
    throw new ErrorHandle(400, "User not found");
  }
  return user;
};

// change password by user
type ChangePasswordType = {
  newPassword: string;
  oldPassword: string;
};
const updatePassword = async (
  id: string,
  { newPassword, oldPassword }: ChangePasswordType
) => {
  const findUser = await userModel.findById(id);
  if (!findUser) {
    throw new ErrorHandle(400, "User not found");
  }
  if (findUser.loginType !== "password") {
    throw new ErrorHandle(400, "This account can't update the password");
  }
  const isMatchPassword = await findUser.comparePassword(oldPassword);
  if (!isMatchPassword) {
    throw new ErrorHandle(400, "Password is not match");
  }
  if (newPassword) {
    findUser.password = newPassword;
  } else {
    throw new ErrorHandle(400, "New Password not found");
  }
  await findUser.save();
  return;
};
const userService = {
  updateProfileUser,
  getAllUser,
  uploadAvatarUser,
  blockUser,
  unBlockUser,
  removeUser,
  getUserById,
  updatePassword,
};

export default userService;
