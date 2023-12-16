import { find, isEmpty } from "lodash";

import courseModel, { ICourseData } from "../models/course.model";
import userModel from "../models/user.model";
import ErrorHandle from "../utils/errorHandle";
import sendEmail from "../utils/sendEmail";
import { uploadFile } from "../utils/cloudinary";
import orderModel from "../models/order.model";

import {
  uploadVideo as handleUploadVideo,
  deleteImage,
  deleteVideo,
} from "../utils/cloudinary";

type CreateCourseType = {
  title: string;
  price: number;
  demoUrl: string;
  thumbnail?: { public_id: string; url: string };
  description: string;
  level: string;
  category: string;
  courseData?: ICourseData[];
};

type CreateCourseStep1 = {
  title: string;
  price: number;
  estimatedPrice: number;
  demoUrl: { url: string; public_id: string };
  description: string;
  level: string;
  category: string;
};

//save data when the user completes step 1

const createCourseStep1 = async (
  data: CreateCourseStep1,
  userId: string,
  courseId: string
) => {
  if (courseId && courseId !== "undefined") {
    const updateCourse = await courseModel.findByIdAndUpdate(courseId, {
      $set: { ...data },
    });
    return updateCourse;
  } else {
    const newCourse = await courseModel.create({
      ...data,
      author: userId,
      status: "draft",
    });
    return newCourse;
  }
};

const editCourseStep1 = async (data: CreateCourseStep1, courseId: string) => {
  const updateCourse = await courseModel.findByIdAndUpdate(
    courseId,
    { $set: data },
    { new: true }
  );
  return updateCourse;
};
type CreateCoursseStep2 = {
  prerequisites?: { title: string }[];
  benefits?: { title: string }[];
};

const uploadImageCourse = async (file: any) => {
  const result = await uploadFile("course", file.path);
  return { public_id: result.public_id, url: result.url };
};
const createEditCourseStep2 = async (
  data: CreateCoursseStep2,
  courseId: string
) => {
  const updateCourse = await courseModel.findByIdAndUpdate(
    courseId,
    { $set: { prerequisites: data.prerequisites, benefits: data.benefits } },
    { new: true }
  );
  return updateCourse;
};

const createEditCourseStep3 = async (data: ICourseData[], courseId: string) => {
  const newData = data.map((item, index) => {
    const totalCourseLength = item.lectures.reduce((total, item) => {
      return total + item.duration;
    }, 0);
    return { ...item, videoLength: totalCourseLength };
  });

  const updateCourse = await courseModel.findByIdAndUpdate(
    courseId,
    { $set: { courseData: newData } },
    { new: true }
  );
  return updateCourse;
};

//convert status to public
const publicCourse = async (courseId: string) => {
  const findCourse = await courseModel.findById(courseId);
  if (!findCourse) {
    throw new ErrorHandle(400, "Course not found");
  }
  if (
    isEmpty(findCourse.prerequisites) ||
    isEmpty(findCourse.benefits) ||
    isEmpty(findCourse.courseData) ||
    isEmpty(findCourse.thumbnail)
  ) {
    throw new ErrorHandle(400, "Please fill in the fields");
  }
  findCourse.status = "public";
  await findCourse.save();
  return findCourse;
};

//delete course
const deleteCourse = async (courseId: string) => {
  const deleteCourse = await courseModel.findByIdAndDelete(courseId);
  if (!deleteCourse) {
    throw new ErrorHandle(400, "Course deleted successfully");
  }
  return deleteCourse;
};

//get course darf admin

const findCourseById = async (courseId: string) => {
  const course = await courseModel.findById(courseId);
  if (!course) {
    throw new ErrorHandle(400, "Course not found");
  }
  return course;
};

const findCourseByIdPublic = async (courseId: string) => {
  const course = await courseModel
    .findOne({ _id: courseId, status: "public" })
    .select("-courseData.lectures.videoUrl")
    .populate("author", "avatar firstName lastName email")
    .populate({
      path: "reviews",
      populate: { path: "user", select: "firstName lastName avatar" },
    });

  if (!course) {
    throw new ErrorHandle(400, "Course not found");
  }
  return course;
};

const getCoursePurhaser = async (courseId: string, userId: string) => {
  const checkOrder = await orderModel.findOne({ userId, courseId });
  if (!checkOrder) {
    throw new ErrorHandle(400, "You haven't purchased this course yet");
  }
  const findCourse = await courseModel
    .findById(courseId)
    .populate("author", "avatar firstName lastName email")
    .populate({
      path: "reviews",
      populate: { path: "user", select: "firstName lastName avatar" },
    });
  if (!findCourse) {
    throw new ErrorHandle(400, "Course not found");
  }
  return findCourse;
};
// upload video to vdocipher
const uploadVideo = async (file: any, id: string) => {
  const { path } = file;

  const data = await handleUploadVideo(path, id);
  return data;
};

const deleteImageVideo = async (public_id: string) => {
  await deleteVideo(public_id);
  return;
};

type filterGetAllCourse = {
  sort?: string;
  keyword?: string;
  page?: number;
  limit?: number;
};
const getAllCourseByAdmin = async ({
  sort = "-createdAt",
  limit = 20,
  page = 1,
  keyword,
}: filterGetAllCourse) => {
  let query;
  if (!isEmpty(keyword)) {
    query = courseModel.find({
      title: { $regex: keyword, $options: "i" },
      status: "public",
    });
  } else {
    query = courseModel.find({ status: "public" });
  }

  const countQuery = await query.model.countDocuments(query.getFilter()).exec();

  const skip = (page - 1) * limit;
  query = query
    .populate("author")
    .select("-courseData -prerequisites -benefits -description -tags")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const courses = await query;
  return { courses, countQuery };
};

const deleteCourseById = async (id: string) => {
  const course = await courseModel.findByIdAndDelete(id);
  if (!course) {
    throw new ErrorHandle(400, "Delete Course Failure");
  }
  return course;
};

type filterGetCoursesIntructor = {
  sort?: string;
  keyword?: string;
  page?: number;
  limit?: number;
  userId: string;
};
const getMyCourseIntructor = async ({
  userId,
  sort = "-createdAt",
  limit = 20,
  page = 1,
  keyword,
}: filterGetCoursesIntructor) => {
  let query;
  if (!isEmpty(keyword)) {
    query = courseModel.find({
      title: { $regex: keyword, $options: "i" },
      author: userId,
    });
  } else {
    query = courseModel.find({ author: userId });
  }

  const countQuery = await query.model.countDocuments(query.getFilter()).exec();

  const skip = (page - 1) * limit;
  query = query
    .populate("author")
    .select("-courseData -prerequisites -benefits -description -tags")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const courses = await query;
  return { courses, countQuery };
};

type addReviewType = {
  title: string;
  rating: number;
  userId: string;
  courseId: string;
};

const courseService = {
  createCourseStep1,
  createEditCourseStep2,
  createEditCourseStep3,
  uploadImageCourse,
  editCourseStep1,
  findCourseById,
  uploadVideo,
  deleteImageVideo,
  publicCourse,
  getAllCourseByAdmin,
  deleteCourse,
  getMyCourseIntructor,
  deleteCourseById,
  findCourseByIdPublic,
  getCoursePurhaser,
};

export default courseService;
