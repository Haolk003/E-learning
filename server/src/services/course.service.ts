import _, { isEmpty } from "lodash";

import courseModel, { ICourseData } from "../models/course.model";
import ErrorHandle from "../utils/errorHandle";
import sendEmail from "../utils/sendEmail";
import { uploadFile } from "../utils/cloudinary";
import orderModel from "../models/order.model";
import CategoryModel from "../models/category.model";
import {
  uploadVideo as handleUploadVideo,
  deleteImage,
  deleteVideo,
} from "../utils/cloudinary";
import userModel from "../models/user.model";

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
  subCategory: string;
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
    const isExistCategory = await CategoryModel.findById(data.category);

    if (!isExistCategory) throw new ErrorHandle(400, "Category not found");
    isExistCategory.courseCount = isExistCategory.courseCount++;
    await isExistCategory.save();
    return updateCourse;
  } else {
    const newCourse = await courseModel.create({
      ...data,
      author: userId,
      status: "draft",
      progress: 33,
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
    {
      $set: {
        prerequisites: data.prerequisites,
        benefits: data.benefits,
        progress: 66,
      },
    },
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
    { $set: { courseData: newData, progress: 100 } },
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
  const categoryExist = await CategoryModel.findById(findCourse.category);
  if (categoryExist) {
    categoryExist.courseCount = categoryExist.courseCount + 1;
    await categoryExist.save();
  }
  await findCourse.save();
  return findCourse;
};

//convert status to private
const privateCourse = async (courseId: string) => {
  const findCourse = await courseModel.findById(courseId);
  if (!findCourse) {
    throw new ErrorHandle(400, "Course not found");
  }
  findCourse.status = "private";
  const categoryExist = await CategoryModel.findById(findCourse.category);
  if (categoryExist) {
    categoryExist.courseCount -= 1;
    await categoryExist.save();
  }

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
  category?: string;
  price?: string | string[];
  ratings?: number;
  level?: string | string[];
};
const getAllCourseByAdmin = async (queryObj: filterGetAllCourse) => {
  const filteredObject = _.omitBy(queryObj, _.isEmpty);

  if (
    typeof filteredObject.level === "string" &&
    filteredObject.level.split("").includes(",")
  ) {
    filteredObject.level = filteredObject.level.split(",");
  }
  // Loại bỏ dấu ngoặc vuông từ chuỗi
  //   const strippedString = filteredObject.level.replace(/\[|\]/g, "");

  //   // Phân tích chuỗi và chuyển đổi thành mảng
  //   const parsedArray = strippedString.split(",");

  //   // Gán mảng mới cho thuộc tính 'price'
  //   filteredObject.level = parsedArray;
  // }
  console.log(filteredObject);
  const queryObjCopy = filteredObject;
  const limit = (filteredObject.limit ? filteredObject.limit : 20) as number;
  const page = (filteredObject.page ? filteredObject.page : 1) as number;

  const excludeField = ["page", "sort", "limit", "keyword"];

  const filteredQueryObj = _.omit(queryObjCopy, excludeField);
  let queryStr = JSON.stringify(filteredQueryObj);

  queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, (match) => `$${match}`);
  queryStr = JSON.parse(queryStr);

  let query;
  if (!isEmpty(filteredObject.keyword)) {
    query = courseModel.find(
      Object.assign(
        { title: { $regex: filteredObject.keyword, $options: "i" } },
        { status: "public" },
        queryStr
      )
    );
  } else {
    query = courseModel.find(Object.assign({ status: "public" }, queryStr));
  }

  if (filteredObject && typeof filteredObject.sort === "string") {
    const sortBy = filteredObject.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-reviews");
  }

  query = query
    .select("-courseData -prerequisites -benefits -description -tags")
    .skip((page - 1) * limit)
    .limit(limit);

  const totalCount = await courseModel.countDocuments(query.getFilter()).exec();
  const courses = await query.exec();

  return { courses, totalCount };
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
    .populate("author category")
    .select("-courseData -prerequisites -benefits -description -tags")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const courses = await query;
  return { courses, countQuery };
};

type findCourseCategoryType = {
  categoryId: string;
  subCategoryId?: string;
  sortQuery?: string;
  pageQuery?: number;
};
const findCourseCategoryAndSubCategory = async ({
  categoryId,
  pageQuery,
  sortQuery,
  subCategoryId,
}: findCourseCategoryType) => {
  const sort = sortQuery || "-sold";
  const page = pageQuery || 1;
  const skip = (page - 1) * 10;
  if (!isEmpty(subCategoryId)) {
    const findCourses = await courseModel
      .find({
        category: categoryId,
        subCategory: subCategoryId,
        status: "public",
      })
      .populate("author", "firstName lastName email")
      .populate([{ path: "category" }, { path: "subCategory" }])
      .select(
        "-tags -prerequisites -courseData.description -courseData.lectures -demoUrl"
      )
      .sort(sort)
      .skip(skip)
      .limit(10);
    return findCourses;
  } else {
    const findCourses = await courseModel
      .find({ category: categoryId, status: "public" })
      .select(
        "-tags -prerequisites -courseData.description -courseData.lectures -demoUrl"
      )
      .populate("author", "firstName lastName email")
      .populate([{ path: "category" }, { path: "subCategory" }])
      .sort(sort)
      .limit(10)
      .skip(skip);
    return findCourses;
  }
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
  privateCourse,
  getAllCourseByAdmin,
  deleteCourse,
  getMyCourseIntructor,
  deleteCourseById,
  findCourseByIdPublic,
  getCoursePurhaser,
  findCourseCategoryAndSubCategory,
};

export default courseService;
