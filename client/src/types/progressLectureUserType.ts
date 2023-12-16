export type progressLectureProgressType = {
  _id: string;
  userId: string;
  progress: ProgressDataLectureType[];
  courseId: string;
  lastWatchedLectureId: string;
  updatedAt: string;
  createdAt: string;
};

export type ProgressDataLectureType = {
  lectureId: string;
  isCompleted: boolean;
  lengthWatched: number;
};
