import UserCourseProgressModel from "../models/userCourseProgress.model";

type updateLengthWatchedType = {
  userId: string;
  courseId: string;
  lectureId: string;
  lengthWatched: number;
};
const updateLenghtWatched = async ({
  courseId,
  lectureId,
  lengthWatched,
  userId,
}: updateLengthWatchedType) => {
  let userProgress = await UserCourseProgressModel.findOne({
    userId,
    courseId,
    lectureId,
  });
  if (!userProgress) {
    const newProgress = await UserCourseProgressModel.create({
      userId,
      courseId,
      lectureId,
      lengthWatched,
    });
    return newProgress;
  }
  userProgress.lengthWatched = lengthWatched;
  await userProgress.save();
  return userProgress;
};
type UpdateIsCompletedType = {
  userId: string;
  courseId: string;
  lectureId: string;
  isCompleted: boolean;
};
const updateIsCompleted = async ({
  courseId,
  isCompleted,
  lectureId,
  userId,
}: UpdateIsCompletedType) => {
  let userProgress = await UserCourseProgressModel.findOne({
    userId,
    courseId,
    lectureId,
  });
  if (!userProgress) {
    const newProgress = await UserCourseProgressModel.create({
      userId,
      courseId,
      lectureId,
      isCompleted,
    });
    return newProgress;
  }
  userProgress.isCompleted = isCompleted;
  await userProgress.save();
  return userProgress;
};
const userCourseProgressService = { updateIsCompleted, updateLenghtWatched };

export default userCourseProgressService;
