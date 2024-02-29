import { CourseContentType, CourseType } from "./couresContentType";

export type cartType = {
  _id: string;
  userId: string;
  items: cartItemType[];
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
  discount: number;
  expiryDate: string;
};
