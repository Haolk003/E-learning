"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = __importDefault(require("../models/order.model"));
const stripe_1 = __importDefault(require("stripe"));
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const course_model_1 = __importDefault(require("../models/course.model"));
const userCourseProgress_model_1 = __importDefault(require("../models/userCourseProgress.model"));
const cart_model_1 = __importDefault(require("../models/cart.model"));
const notify_model_1 = __importDefault(require("../models/notify.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const stripe = new stripe_1.default(process.env.SECRECT_STRIPE_KEY, {
    apiVersion: "2023-10-16",
});
const newOrder = async (userId, courseId, stripePaymentInfoId) => {
    if (!stripePaymentInfoId) {
        throw new errorHandle_1.default(400, "Don't not find stripe payment info id");
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentInfoId);
    if (paymentIntent.status !== "succeeded") {
        throw new errorHandle_1.default(400, "Payment not authorized");
    }
    const courseExistUser = await order_model_1.default.findOne({
        userId: userId,
        courseId: courseId,
    });
    if (courseExistUser) {
        throw new errorHandle_1.default(400, "Users who have registered for the course");
    }
    const findCourse = await course_model_1.default.findById(courseId);
    if (!findCourse) {
        throw new errorHandle_1.default(400, "Course not found");
    }
    const findUser = await user_model_1.default.findById(userId);
    if (!findUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    findUser.myLearning.push(findCourse._id);
    findUser.lastJoinedAt = new Date();
    const newOrder = await order_model_1.default.create({
        products: [courseId],
        userId: userId,
        payment_info: paymentIntent,
        instructorId: findCourse.author,
    });
    findCourse.sold = Number(findCourse.sold) + 1;
    await user_model_1.default.findByIdAndUpdate(userId, {
        $push: { myLearning: findCourse._id },
    });
    await notify_model_1.default.create({
        message: `purchased ${findCourse.title.slice(0, 40)} course`,
        sender: userId,
        receiver: findCourse.author,
    });
    await findCourse.save();
    await findUser.save();
    await userCourseProgress_model_1.default.create({
        userId,
        courseId,
    });
    return newOrder;
};
const newOrderCart = async (stripePaymentInfoId, userId) => {
    const findCart = await cart_model_1.default.findOne({ userId });
    const findUser = await user_model_1.default.findById(userId);
    if (!findUser) {
        throw new errorHandle_1.default(400, "User not found");
    }
    if (!findCart || findCart.items.length === 0) {
        throw new errorHandle_1.default(400, "Unable to pay because there are no products in the cart");
    }
    if (!stripePaymentInfoId) {
        throw new errorHandle_1.default(400, "Don't not find stripe payment info id");
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentInfoId);
    if (paymentIntent.status !== "succeeded") {
        throw new errorHandle_1.default(400, "Payment not authorized");
    }
    const coursesToUpdate = findCart.items.map((item) => item.courseId);
    await Promise.all(coursesToUpdate.map(async (courseId) => {
        const findCourse = await course_model_1.default.findByIdAndUpdate({ _id: courseId }, { $inc: { sold: 1 } });
        if (findCourse) {
            await notify_model_1.default.create({
                message: `purchased ${findCourse.title.slice(0, 40)} course`,
                sender: userId,
                receiver: findCourse.author,
            });
            findUser.myLearning.push(findCourse._id);
            findUser.lastJoinedAt = new Date();
        }
        await userCourseProgress_model_1.default.create({
            userId,
            courseId,
        });
    }));
    const newOrder = await order_model_1.default.create({
        products: findCart.items,
        userId: userId,
        payment_info: {
            id: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
        },
    });
    findCart.totalPrice = 0;
    findCart.applyCoupon = null;
    findCart.items = [];
    await findCart.save();
    await findUser?.save();
    return newOrder;
};
const newPaymentIntent = async (amount, currency) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        // Set confirm to false to wait for confirmation on the client
        metadata: {
            company: "E-Learning",
        },
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return paymentIntent.client_secret;
};
const checkUserPurchaseCousre = async (courseId, userId) => {
    const findOrder = await order_model_1.default.findOne({
        products: { $in: [courseId] },
        userId,
    });
    if (!findOrder) {
        return false;
    }
    else {
        return true;
    }
};
const orderService = {
    newPaymentIntent,
    newOrder,
    checkUserPurchaseCousre,
    newOrderCart,
};
exports.default = orderService;
