import { CategoryType } from "./categoryType";
import { reviewContentPublic } from "./reviewType";

export type CourseType = {
  _id: string;
  ratings: number;
  tags: string;
  description: string;
  demoUrl: {
    public_id: string;
    url: string;
  };
  thumbnail: {
    public_id: string;
    url: string;
  };
  title: string;
  category: string;
  subCategory: string;
  level: string;
  author: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  price: number;
  sold: number;
  reviews: reviewContentPublic[];
  status: string;
  courseData: CourseContentType[];
  prerequisites: { title: string; _id: string }[];
  benefits: { title: string; _id: string }[];
  sale: { discount: number; startDate?: Date; endDate?: Date };
  createdAt: Date;
  updatedAt: string;
  progress: number;
};

export type CourseContentType = {
  duration: any;
  description: string;
  lectures: {
    videoUrl: {
      public_id: string;
      url: string;
    };
    title: string;
    duration: number;
    _id: string;
  }[];
  videoSection: string;
  videoLength: number;
  _id: string;
};

export interface CourseContentDataTypeForm {
  videoSection: string;
  description: string;
  lectures: {
    title: string;
    videoUrl: { public_id?: string; url: string };
    duration: number;
  }[];
}
