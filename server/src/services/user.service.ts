import { query } from "express";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";
import reviewModel from "../models/review.model";
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

const countTotalSoldByIntructor = async (instructorId: string) => {
  const result = await courseModel.aggregate([
    { $match: { author: instructorId } },
    { $group: { _id: null, totalSold: { $sum: "$sold" } } },
  ]);

  const totalSold = result.length > 0 ? result[0].totalSold : 0;
  return totalSold;
};

const getUserProfileIntructor = async (id: string) => {
  const user = await userModel
    .findById(id)
    .select("-googleUserId -password -loginType");
  if (!user || user.role !== "instructor") {
    throw new ErrorHandle(
      400,
      "The user doesn't exist or you don't have access to this user's profile"
    );
  }
  const totalReviews = await reviewModel.countDocuments({
    instructorId: user._id,
  });
  const totalStudents = await countTotalSoldByIntructor(user._id);

  return {
    user,
    totalReviews,
    totalStudents,
  };
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

const convertUserToIntructor = async (userId: string) => {
  const updateUser = await userModel.findByIdAndUpdate(
    userId,
    { $set: { role: "instructor", timeBeginInstructors: new Date() } },
    { new: true }
  );
  if (!updateUser) {
    throw new ErrorHandle(400, "Update User Failure");
  }

  return updateUser;
};

const becomeIntructor = async (userId: string) => {
  const updateUser = await userModel.findByIdAndUpdate(userId, {
    role: "instructor",
  });
  if (!updateUser) {
    throw new ErrorHandle(400, "Update User Failure");
  }

  return updateUser;
};

type QueryGetAllStudent = {
  sort?: string;
  page?: number;
  pageNumber?: number;
};
const getAllStudentsByAdmin = async (query: QueryGetAllStudent) => {
  const limit = query.pageNumber ? query.pageNumber : 10;
  const skip = query.page ? (query.page - 1) * limit : 0;
  const students = await userModel
    .find({
      $expr: {
        $gt: [{ $size: "$myLearning" }, 0],
      },
    })
    .sort("-lastJoinedAt")
    .skip(skip)
    .limit(limit)
    .select("firstName lastName email myLearning createdAt updatedAt");

  return students;
};

const getAllIntructor = async (query: QueryGetAllStudent) => {
  const limit = query.pageNumber ? query.pageNumber : 10;
  const skip = query.page ? (query.page - 1) * limit : 0;
  const sort = query.sort ? query.sort : "";
  const students = await userModel
    .find({ role: "instructor" })
    .sort("-createdAt")
    .skip(skip)
    .limit(limit)
    .select("firstName lastName email avatar");

  return students;
};

const getTopInstructor = async () => {
  const users = orderModel.aggregate([
    // Bước đầu tiên, "giải nén" mảng products
    { $unwind: "$products" },

    // Kết nối đến collection courses
    {
      $lookup: {
        from: "courses", // Thay đổi tên collection của bạn ở đây
        localField: "products",
        foreignField: "_id",
        as: "courseDetails",
      },
    },

    // Do $lookup có thể trả về một mảng, nên cần "giải nén" kết quả để xử lý dễ dàng
    { $unwind: "$courseDetails" },

    // Tiếp theo, kết nối đến collection instructors
    {
      $lookup: {
        from: "users", // Thay đổi tên collection của bạn ở đây
        localField: "courseDetails.author", // Giả sử mỗi khóa học có trường này
        foreignField: "_id",
        as: "instructorDetails",
      },
    },
    { $unwind: "$instructorDetails" },

    // Nhóm theo giảng viên, tính toán tổng doanh thu và số lượng bán
    {
      $group: {
        _id: "$instructorDetails._id",
        totalSales: { $sum: "$payment_info.amount" },
        courses: { $addToSet: "$courseDetails._id" },
        firstName: { $first: "$instructorDetails.firstName" },
        lastName: { $first: "$instructorDetails.lastName" },
        avatar: { $first: "$instructorDetails.avatar" },
        timeBeginInstructors: {
          $first: "$instructorDetails.timeBeginInstructors",
        },
        email: {
          $first: "$instructorDetails.email",
        },
        count: { $sum: 1 },
      },
    },

    // Sắp xếp kết quả dựa trên tổng doanh thu hoặc số lượng bán
    { $sort: { totalSales: -1 } },

    // Giới hạn số lượng kết quả trả về
    { $limit: 10 },
  ]);

  return users;
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
  convertUserToIntructor,
  becomeIntructor,
  getUserProfileIntructor,
  getAllIntructor,
  getAllStudentsByAdmin,
  getTopInstructor,
};

export default userService;
