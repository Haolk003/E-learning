import mongoose, { Types } from "mongoose";
import cartModel from "../models/cart.model";
import couponModel from "../models/coupon.model";
import courseModel from "../models/course.model";
import ErrorHandle from "../utils/errorHandle";
import { defaultMaxListeners } from "events";

type addCartType = {
  userId: string;
  courseId: string;
  price: number;
};
const addCart = async (data: addCartType) => {
  const { courseId, userId, price } = data;
  const cart = await cartModel.findOne({ userId: userId });
  const findCourse = await courseModel.findById(courseId);
  if (!findCourse) {
    throw new ErrorHandle(400, "Course not found");
  }
  if (cart) {
    let item = cart.items.find((p) => p.courseId === findCourse._id);
    if (!item) {
      // Add new item if it doesn't exist
      cart.items.push({ courseId: findCourse._id, price });
      cart.totalPrice = cart.totalPrice + price;
    }
    await cart.save();
    return cart;
  } else {
    // Create a new cart if not exist
    const newCart = await cartModel.create({
      userId: data.userId,
      items: [{ courseId: data.courseId, price: data.price }],
      totalPrice: price,
    });
    return newCart;
  }
};

const editCart = async (data: addCartType) => {
  const { courseId, price, userId } = data;

  const cart = await cartModel.findOne({ userId: userId });
  const findCourseId = await courseModel.findById(courseId);
  if (!findCourseId) {
    throw new ErrorHandle(400, "Course not found");
  }

  if (!cart) {
    throw new ErrorHandle(400, "Cart not found");
  }

  let item = cart.items.find((p) => p.courseId === findCourseId._id);

  if (item) {
    throw new ErrorHandle(400, "Item exists in cart");
  }

  cart.items.push({ courseId: findCourseId._id, price: price });

  cart.totalPrice = cart.totalPrice + price;

  await cart.save();
  return cart;
};

const applyCoupon = async (
  userId: mongoose.Types.ObjectId,
  couponCode: number
) => {
  const cart = await cartModel.findOne({ userId: userId });
  if (!cart) {
    throw new ErrorHandle(400, "Cart not found");
  }
  if (cart.isApplyCoupon) {
    throw new ErrorHandle(
      400,
      "The coupon code entered is not valid for this course."
    );
  }
  const coupon = await couponModel.findOne({ code: couponCode });
  if (!coupon) {
    throw new ErrorHandle(400, "Coupon not found");
  }

  if (coupon.expiryDate < new Date()) {
    throw new ErrorHandle(400, "Coupon has expired");
  }
  if (coupon.usedBy.includes(userId)) {
    throw new ErrorHandle(400, "Coupon already used by this user");
  }
  cart.totalPrice = cart.totalPrice - coupon.discount;
  coupon.usedBy.push(userId);
  cart.isApplyCoupon = true;
  await cart.save();
  await coupon.save();
  return cart;
};

const deleteAllCourseInCart = async (userId: string) => {
  const cart = await cartModel.findOneAndDelete({ userId: userId });
  if (!cart) {
    throw new ErrorHandle(400, "Cart not found");
  }

  return cart;
};

const deleteCourseIdInCart = async (userId: string, courseId: string) => {
  const cart = await cartModel.findOne({ userId });
  if (!cart) {
    throw new ErrorHandle(400, "Cart not found");
  }
  const index = cart.items.findIndex((p) => p.courseId.toString() === courseId);
  if (index === -1) {
    throw new ErrorHandle(400, "Item not found in cart");
  }

  cart.totalPrice = cart.totalPrice - cart.items[index].price;
  cart.items.splice(index, 1);
  await cart.save();
  return cart;
};

const getAddedCart = async (userId: string) => {
  const cart = await cartModel.findOne({ userId });
  if (!cart) {
    throw new ErrorHandle(400, "Cart not found");
  }
  return cart;
};

const cartService = {
  getAddedCart,
  addCart,
  deleteAllCourseInCart,
  deleteCourseIdInCart,
  editCart,
  applyCoupon,
};

export default cartService;
