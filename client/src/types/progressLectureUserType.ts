import { CourseType } from "./couresContentType";

export type progressLectureProgressType = {
  _id: string;
  userId: string;
  progress: ProgressDataLectureType[];
  courseId: CourseType;
  lastWatchedLecture: {
    lectureTitle: string;
    lectureId: string;
    lectureUrl: string;
  };
  updatedAt: string;
  createdAt: string;
};

export type ProgressDataLectureType = {
  lectureId: string;
  isCompleted: boolean;
  lengthWatched: number;
};
