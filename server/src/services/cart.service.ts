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
    const findCourse = await courseModel
      .findById(courseId)
      .populate("author", "firstName lastName");
    if (!findCourse) {
      throw new ErrorHandle(400, "Course not found");
    }
    const cart = await cartModel.findOne({ userId }).populate("applyCoupon");

    if (cart) {
      const item = cart.items.find(
        (item) => item.courseId.toString() === courseId
      );

      if (!item) {
        const coupon = cart.applyCoupon as any;
        cart.items.push({ courseId: findCourse._id, price });
        cart.totalPrice += coupon ? (coupon.discount * price) / 100 : price;
      } else {
        throw new ErrorHandle(400, "Item is Exist");
      }
      await cart.save();
      return findCourse;
    } else {
      const newCart = await cartModel.create({
        userId,
        items: [{ courseId, price }],
        totalPrice: price,
      });
      return findCourse;
    }
  }

  async editCart({ courseId, price, userId }: AddCartType) {
    const cart = await cartModel.findOne({ userId }).populate([
      {
        path: "items.courseId",

        populate: {
          path: "author",
          select: "firstName lastName",
        },
      },
      { path: "applyCoupon" },
    ]);
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
    const cart = await cartModel.findOne({ userId }).populate([
      {
        path: "items.courseId",

        populate: {
          path: "author",
          select: "firstName lastName",
        },
      },
      { path: "applyCoupon" },
    ]);
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }

    if (cart?.applyCoupon) {
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

    cart.totalPrice =
      cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
    coupon.usedBy.push(cart.userId);
    cart.applyCoupon = coupon._id;

    await cart.save();
    await coupon.save();

    return coupon;
  }

  async deleteAllCourseInCart(userId: string) {
    const cart = await cartModel.findOneAndDelete({ userId });
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }
    return cart;
  }

  async deleteCourseIdInCart(userId: string, courseId: string) {
    const cart = await cartModel.findOne({ userId }).populate("applyCoupon");

    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }

    const index = cart.items.findIndex(
      (item) => item.courseId._id.toString() === courseId
    );
    if (index === -1) {
      throw new ErrorHandle(400, "Item not found in cart");
    }
    const discount = cart.applyCoupon as any;
    cart.totalPrice = discount
      ? cart.totalPrice - (cart.totalPrice * discount.discount) / 100
      : cart.totalPrice - cart.items[index].price;
    cart.items.splice(index, 1);

    await cart.save();
    return courseId;
  }

  async getAddedCart(userId: string) {
    const cart = await cartModel.findOne({ userId }).populate([
      {
        path: "items.courseId",

        populate: {
          path: "author",
          select: "firstName lastName",
        },
      },
      { path: "applyCoupon" },
    ]);
    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }
    return cart;
  }

  async deleteCouponInCart(couponId: string, userId: string) {
    const cart = await cartModel.findOne({ userId });
    const findCoupon = await couponModel.findById(couponId);

    if (!cart) {
      throw new ErrorHandle(400, "Cart not found");
    }
    if (!cart?.applyCoupon) {
      throw new ErrorHandle(400, "Coupon in cart not found");
    }
    if (!findCoupon) {
      throw new ErrorHandle(400, "Coupon not found");
    }
    findCoupon.usedBy = findCoupon.usedBy.filter(
      (item, index) => item.toString() !== userId.toString()
    );
    await findCoupon.save();
    cart.applyCoupon = null;
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.price;
    }, 0);
    await cart.save();
    return findCoupon;
  }
}

export default new CartService();
