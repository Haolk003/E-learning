import UserCourseProgressModel from "../models/userCourseProgress.model";
import ErrorHandle from "../utils/errorHandle";

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
  });
  if (!userProgress) {
    throw new ErrorHandle(400, "Can not find User Progress");
  }
  const checkLecture = userProgress.progress.find(
    (item) => item.lectureId === lectureId
  );
  if (!checkLecture) {
    userProgress.progress.push({
      isCompleted: false,
      lectureId,
      lengthWatched,
    });
  } else {
    checkLecture.lengthWatched = lengthWatched;
  }
  userProgress.save();
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
  });
  if (!userProgress) {
    throw new ErrorHandle(400, "Can not find User Progress");
  }
  const checkLecture = userProgress.progress.find(
    (item) => item.lectureId === lectureId
  );
  if (!checkLecture) {
    userProgress.progress.push({
      lectureId,
      lengthWatched: 0,
      isCompleted: isCompleted,
    });
  } else {
    checkLecture.isCompleted = isCompleted;
  }
  console.log(checkLecture);
  userProgress.save();
  return userProgress;
};

const getProgressLectureUserByCourseId = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const userProgress = await UserCourseProgressModel.findOne({
    courseId,
    userId,
  });
  return userProgress;
};
const userCourseProgressService = {
  updateIsCompleted,
  updateLenghtWatched,
  getProgressLectureUserByCourseId,
};

export default userCourseProgressService;
