import mongoose, { Types } from "mongoose";
import cartModel from "../models/cart.model";
import couponModel from "../models/coupon.model";
import courseModel from "../models/course.model";
import ErrorHandle from "../utils/errorHandle";

interface AddCartType {
  userId: string;
  courseId: string;
  price: number;
}

class CartService {
  async addCart({ courseId, userId, price }: AddCartType) {
    const cart = await cartModel.findOne({ userId });
    const findCourse = await courseModel.findById(courseId);

    if (!findCourse) {
      throw new ErrorHandle(400, "Course not found");
    }

    if (cart) {
      const item = cart.items.find(
        (item) => item.courseId.toString() === courseId
      );
      if (!item) {
        cart.items.push({ courseId: findCourse._id, price });
        cart.totalPrice += price;
      }
      await cart.save();
      return cart;
    } else {
      const newCart = await cartModel.create({
        userId,
        items: [{ courseId, price }],
        totalPrice: price,
      });
      return newCart;
    }
  }

  async editCart({ courseId, price, userId }: AddCartType) {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.courseId.toString() === courseId
    );
    if (itemIndex >= 0) {
      cart.items[itemIndex].price = price;
      // Recalculate total price
      cart.totalPrice = cart.items.reduce((acc, curr) => acc + curr.price, 0);
    } else {
      throw new ErrorHandle(400, "Item not found in cart");
    }

    await cart.save();
    return cart;
  }

  async applyCoupon(userId: Types.ObjectId, couponCode: string) {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }

    if (cart.isApplyCoupon) {
      throw new ErrorHandle(400, "Coupon has already been applied");
    }

    const coupon = await couponModel.findOne({ code: couponCode });
    if (
      !coupon ||
      coupon.expiryDate < new Date() ||
      coupon.usedBy.includes(cart.userId)
    ) {
      throw new ErrorHandle(400, "Invalid coupon");
    }

    cart.totalPrice -= (cart.totalPrice * coupon.discount) / 100;
    coupon.usedBy.push(cart.userId);
    cart.isApplyCoupon = true;

    await cart.save();
    await coupon.save();

    return cart;
  }

  async deleteAllCourseInCart(userId: string) {
    const cart = await cartModel.findOneAndDelete({ userId });
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }
    return cart;
  }

  async deleteCourseIdInCart(userId: string, courseId: string) {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }

    const index = cart.items.findIndex(
      (item) => item.courseId.toString() === courseId
    );
    if (index === -1) {
      throw new ErrorHandle(400, "Item not found in cart");
    }

    cart.totalPrice -= cart.items[index].price;
    cart.items.splice(index, 1);

    await cart.save();
    return cart;
  }

  async getAddedCart(userId: string) {
    const cart = await cartModel.findOne({ userId }).populate({
      path: "items.courseId",
      select: "title thumbnail price sale author",
      populate: {
        path: "author",
        select: "firstName lastName",
      },
    });
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }
    return cart;
  }
}

export default new CartService();
