import ErrorHandle from "../utils/errorHandle";
import noteCourseModel from "../models/noteCourse.model";
import courseModel from "../models/course.model";

type createNoteCourseType = {
  courseId: string;
  userId: string;
  lectureId: string;
  content: string;
  timing: number;
};
const createNoteCourse = async ({
  content,
  courseId,
  lectureId,
  timing,
  userId,
}: createNoteCourseType) => {
  const findCourse = courseModel.findById(courseId);
  if (!findCourse) {
    throw new ErrorHandle(400, "Course not found");
  }
  const newNoteCourse = await noteCourseModel.create({
    content,
    courseId,
    timing,
    lectureId,
    userId,
  });
  return newNoteCourse;
};

const getNoteCourse = async (courseId: string, userId: string) => {
  const findCourse = courseModel.findById(courseId);
  if (!findCourse) {
    throw new ErrorHandle(400, "Course not found");
  }

  const noteCourse = await noteCourseModel.find({ courseId, userId });
  return noteCourse;
};

const updateNoteCourseById = async (id: string, content: string) => {
  const updateNoteCourse = await noteCourseModel.findByIdAndUpdate(
    id,
    { $set: { content: content } },
    { new: true }
  );
  if (!updateNoteCourse) {
    throw new ErrorHandle(400, "Update Note Course Failure");
  }
  return updateNoteCourse;
};

const deleteNoteCourseById = async (id: string) => {
  const deleteNoteCourse = await noteCourseModel.findByIdAndDelete(id);
  if (!deleteNoteCourse) {
    throw new ErrorHandle(400, "Note Courses Deleted Failure");
  }
  return deleteNoteCourse;
};
const noteCourseService = {
  createNoteCourse,
  deleteNoteCourseById,
  updateNoteCourseById,
  getNoteCourse,
};

export default noteCourseService;
