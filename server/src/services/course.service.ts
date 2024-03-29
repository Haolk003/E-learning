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

import { redis } from "../utils/redis";
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

async function updateCourseInRedis(courseId: string, updatedData: any) {
  // Các key Redis cho các danh mục khóa học
  const categories = ["courses:popular", "courses:new", "courses:overrated"];

  for (const category of categories) {
    // Lấy dữ liệu hiện tại từ Redis
    const coursesData = await redis.get(category);
    if (coursesData) {
      // Phân tích dữ liệu JSON để lấy danh sách các khóa học
      const courses = JSON.parse(coursesData);

      // Tìm khóa học trong danh sách
      const courseIndex = courses.findIndex(
        (course: any) => course.id === courseId
      );

      if (courseIndex !== -1) {
        // Cập nhật dữ liệu cho khóa học này
        courses[courseIndex] = { ...courses[courseIndex], ...updatedData };

        // Lưu lại danh sách đã cập nhật vào Redis
        await redis.set(category, JSON.stringify(courses));
      }
    }
  }
}

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
  const findRedis = await redis.get(courseId);
  if (findRedis) {
    await redis.hset(courseId, data);
  }

  await updateCourseInRedis(courseId, data);
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

  const findRedis = await redis.get(courseId);
  if (findRedis) {
    await redis.hset(courseId, data);
    await updateCourseInRedis(courseId, data);
  }
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
  const findRedis = await redis.get(courseId);
  if (findRedis) {
    await redis.hset(courseId, { courseData: newData, progress: 100 });
    await updateCourseInRedis(courseId, data);
  }
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
  let courseRedis = await redis.get(courseId);
  if (!courseRedis) {
    const course = await courseModel
      .findOne({ _id: courseId, status: "public" })
      .select("-courseData.lectures.videoUrl")
      .populate("author", "avatar firstName lastName email");

    if (!course) {
      throw new ErrorHandle(400, "Course not found");
    }

    await redis.set(courseId, JSON.stringify(course), "EX", 604800);
    return course;
  }

  return JSON.parse(courseRedis);
};

const getPopularCourses = async (userId?: string) => {
  const findUser = await userModel.findById(userId);

  const courses = await courseModel
    .find(
      Object.assign(
        { status: "public" },
        { _id: { $nin: findUser?.myLearning } }
      )
    )
    .sort("-sold")
    .limit(20);

  return courses;
};

const getNewCourses = async (userId?: string) => {
  const findUser = await userModel.findById(userId);

  const courses = await courseModel
    .find(
      Object.assign(
        { status: "public" },
        { _id: { $nin: findUser?.myLearning } }
      )
    )
    .sort("-createdAt")
    .limit(20);

  return courses;
};

const getOverratedCourses = async (userId?: string) => {
  const findUser = await userModel.findById(userId);

  const courses = await courseModel
    .find(
      Object.assign(
        { status: "public" },
        { _id: { $nin: findUser?.myLearning } }
      )
    )
    .sort("-ratings")
    .limit(20);

  return courses;
};
const getCoursePurhaser = async (courseId: string, userId: string) => {
  const findCourseInUser = await userModel.findById(userId);
  if (!findCourseInUser) {
    throw new ErrorHandle(400, "User not found");
  }
  if (
    !findCourseInUser.myLearning.find(
      (item) => item.toString() === courseId.toString()
    )
  ) {
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
  subCategory?: string;
  price?: string | string[];
  ratings?: number;
  level?: string | string[];
};
const getAllCourseByAdmin = async (
  queryObj: filterGetAllCourse,
  userId?: string
) => {
  const filteredObject = _.omitBy(queryObj, _.isEmpty);
  const findUser = await userModel.findById(userId);
  if (
    typeof filteredObject.level === "string" &&
    filteredObject.level.split("").includes(",")
  ) {
    filteredObject.level = filteredObject.level.split(",");
  }

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
        { _id: { $nin: findUser?.myLearning } },
        queryStr
      )
    );
  } else {
    query = courseModel.find(
      Object.assign(
        { status: "public" },
        { _id: { $nin: findUser?.myLearning } },
        queryStr
      )
    );
  }

  if (filteredObject && typeof filteredObject.sort === "string") {
    const sortBy = filteredObject.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-reviews");
  }

  query = query
    .select(" -prerequisites -tags")
    .skip((page - 1) * limit)
    .limit(limit);

  const totalCount = await courseModel.countDocuments(query.getFilter()).exec();
  const courses = await query
    .populate([
      { path: "category" },
      { path: "author", select: "firstName lastName email" },
    ])
    .exec();

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

    const totalCount = await courseModel
      .countDocuments({
        category: categoryId,
        subCategory: subCategoryId,
        status: "public",
      })
      .exec();
    return { courses: findCourses, totalCount };
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
    const totalCount = await courseModel
      .countDocuments({
        category: categoryId,
        status: "public",
      })
      .exec();
    return { courses: findCourses, totalCount };
  }
};

const getMyCourseOfInstructor = async (instructorId: string, page: number) => {
  const findIntructor = await userModel.findById(instructorId);

  if (!findIntructor || findIntructor.role !== "instructor") {
    throw new ErrorHandle(
      400,
      "The user doesn't exist or you don't have access to this user's profile"
    );
  }
  const courses = await courseModel
    .find({ author: instructorId })
    .limit(10)
    .skip((page - 1) * 10);

  return courses;
};

type queryFindCourseCategory = {
  sort?: string;
  page?: number;
  category: string;
  subCategory?: string;
  limit?: number;
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
  getMyCourseOfInstructor,
  getOverratedCourses,
  getPopularCourses,
  getNewCourses,
};

export default courseService;
