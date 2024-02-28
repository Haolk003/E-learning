import { CourseContentType, CourseType } from "./couresContentType";

export type cartType = {
  _id: string;
  userId: string;
  items: {
    courseId: {
      sale: { discount: number };
      thumbnail: {
        public_id: string;
        url: string;
      };
      _id: string;
      title: string;
      price: number;
    };
    price: number;
  }[];
  totalPrice: number;
  applyCoupon: couponType;
};

export type cartItemType = {
  courseId: CourseType;
  price: number;
};

export type couponType = {
  _id: string;
  code: string;
  discount: string;
  expiryDate: string;
};
