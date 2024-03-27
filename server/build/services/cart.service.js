"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = __importDefault(require("../models/cart.model"));
const coupon_model_1 = __importDefault(require("../models/coupon.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
class CartService {
    async addCart({ courseId, userId, price }) {
        const findCourse = await course_model_1.default
            .findById(courseId)
            .populate("author", "firstName lastName");
        if (!findCourse) {
            throw new errorHandle_1.default(400, "Course not found");
        }
        const cart = await cart_model_1.default.findOne({ userId }).populate("applyCoupon");
        if (cart) {
            const item = cart.items.find((item) => item.courseId.toString() === courseId);
            if (!item) {
                const coupon = cart.applyCoupon;
                cart.items.push({ courseId: findCourse._id, price });
                cart.totalPrice += coupon ? (coupon.discount * price) / 100 : price;
            }
            else {
                throw new errorHandle_1.default(400, "Item is Exist");
            }
            await cart.save();
            return findCourse;
        }
        else {
            const newCart = await cart_model_1.default.create({
                userId,
                items: [{ courseId, price }],
                totalPrice: price,
            });
            return findCourse;
        }
    }
    async editCart({ courseId, price, userId }) {
        const cart = await cart_model_1.default.findOne({ userId }).populate([
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
            throw new errorHandle_1.default(400, "Cart not found");
        }
        const itemIndex = cart.items.findIndex((item) => item.courseId.toString() === courseId);
        if (itemIndex >= 0) {
            cart.items[itemIndex].price = price;
            // Recalculate total price
            cart.totalPrice = cart.items.reduce((acc, curr) => acc + curr.price, 0);
        }
        else {
            throw new errorHandle_1.default(400, "Item not found in cart");
        }
        await cart.save();
        return cart;
    }
    async applyCoupon(userId, couponCode) {
        const cart = await cart_model_1.default.findOne({ userId }).populate([
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
            throw new errorHandle_1.default(400, "Cart not found");
        }
        if (cart?.applyCoupon) {
            throw new errorHandle_1.default(400, "Coupon has already been applied");
        }
        const coupon = await coupon_model_1.default.findOne({ code: couponCode });
        if (!coupon ||
            coupon.expiryDate < new Date() ||
            coupon.usedBy.includes(cart.userId)) {
            throw new errorHandle_1.default(400, "Invalid coupon");
        }
        cart.totalPrice =
            cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
        coupon.usedBy.push(cart.userId);
        cart.applyCoupon = coupon._id;
        await cart.save();
        await coupon.save();
        return coupon;
    }
    async deleteAllCourseInCart(userId) {
        const cart = await cart_model_1.default.findOneAndDelete({ userId });
        if (!cart) {
            throw new errorHandle_1.default(400, "Cart not found");
        }
        return cart;
    }
    async deleteCourseIdInCart(userId, courseId) {
        const cart = await cart_model_1.default.findOne({ userId }).populate("applyCoupon");
        if (!cart) {
            throw new errorHandle_1.default(400, "Cart not found");
        }
        const index = cart.items.findIndex((item) => item.courseId._id.toString() === courseId);
        if (index === -1) {
            throw new errorHandle_1.default(400, "Item not found in cart");
        }
        const discount = cart.applyCoupon;
        cart.totalPrice = discount
            ? cart.totalPrice - (cart.totalPrice * discount.discount) / 100
            : cart.totalPrice - cart.items[index].price;
        cart.items.splice(index, 1);
        await cart.save();
        return courseId;
    }
    async getAddedCart(userId) {
        const cart = await cart_model_1.default.findOne({ userId }).populate([
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
            throw new errorHandle_1.default(400, "Cart not found");
        }
        return cart;
    }
    async deleteCouponInCart(couponId, userId) {
        const cart = await cart_model_1.default.findOne({ userId });
        const findCoupon = await coupon_model_1.default.findById(couponId);
        if (!cart) {
            throw new errorHandle_1.default(400, "Cart not found");
        }
        if (!cart?.applyCoupon) {
            throw new errorHandle_1.default(400, "Coupon in cart not found");
        }
        if (!findCoupon) {
            throw new errorHandle_1.default(400, "Coupon not found");
        }
        findCoupon.usedBy = findCoupon.usedBy.filter((item, index) => item.toString() !== userId.toString());
        await findCoupon.save();
        cart.applyCoupon = null;
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.price;
        }, 0);
        await cart.save();
        return findCoupon;
    }
}
exports.default = new CartService();
