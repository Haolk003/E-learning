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

export type progressCourseMylearning = {
  lastWatchedLecture: {
    lectureTitle: string;
    lectureUrl: string;
    lectureId: string;
  };
  _id: string;
  userId: string;
  courseId: {
    _id: string;
    title: string;
    author: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    thumbnail: {
      public_id: string;
      url: string;
    };
    courseData: {
      description: string;
      lectures: {
        title: string;
        _id: string;
        videoUrl: {
          public_id: string;
          url: string;
        };
      }[];
      videoSection: string;
    }[];
    category: {
      _id: string;

      name: string;

      description: string;

      isCategory: boolean;
    };
  };
  progress: {
    lectureId: string;
    lenghtWatched: number;
    _id: string;
    isCompleted: boolean;
  }[];
  updatedAt: Date;
  createdAt: Date;
};
