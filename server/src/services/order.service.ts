import { CatchAsyncError } from "../middlewares/catchAsyncError";
import orderModel from "../models/order.model";
import Stripe from "stripe";
import ErrorHandle from "../utils/errorHandle";
import courseModel from "../models/course.model";
import UserCourseProgressModel from "../models/userCourseProgress.model";
import cartModel from "../models/cart.model";
import NotifyModel from "../models/notify.model";
import userModel from "../models/user.model";

const stripe = new Stripe(process.env.SECRECT_STRIPE_KEY as string, {
  apiVersion: "2023-10-16",
});

const newOrder = async (
  userId: string,
  courseId: string,
  stripePaymentInfoId: string
) => {
  if (!stripePaymentInfoId) {
    throw new ErrorHandle(400, "Don't not find stripe payment info id");
  }
  const paymentIntent = await stripe.paymentIntents.retrieve(
    stripePaymentInfoId
  );
  if (paymentIntent.status !== "succeeded") {
    throw new ErrorHandle(400, "Payment not authorized");
  }
  const courseExistUser = await orderModel.findOne({
    userId: userId,
    courseId: courseId,
  });

  if (courseExistUser) {
    throw new ErrorHandle(400, "Users who have registered for the course");
  }
  const findCourse = await courseModel.findById(courseId);
  if (!findCourse) {
    throw new ErrorHandle(400, "Course not found");
  }
  const findUser = await userModel.findById(userId);
  if (!findUser) {
    throw new ErrorHandle(400, "User not found");
  }

  findUser.myLearning.push(findCourse._id);
  findUser.lastJoinedAt = new Date();
  const newOrder = await orderModel.create({
    products: [courseId],
    userId: userId,
    payment_info: paymentIntent,
    instructorId: findCourse.author,
  });
  findCourse.sold = Number(findCourse.sold) + 1;
  await userModel.findByIdAndUpdate(userId, {
    $push: { myLearning: findCourse._id },
  });
  await NotifyModel.create({
    message: `purchased ${findCourse.title.slice(0, 40)} course`,
    sender: userId,
    receiver: findCourse.author,
  });
  await findCourse.save();
  await findUser.save();
  await UserCourseProgressModel.create({
    userId,
    courseId,
  });
  return newOrder;
};

const newOrderCart = async (stripePaymentInfoId: string, userId: string) => {
  const findCart = await cartModel.findOne({ userId });
  const findUser = await userModel.findById(userId);
  if (!findUser) {
    throw new ErrorHandle(400, "User not found");
  }
  if (!findCart || findCart.items.length === 0) {
    throw new ErrorHandle(
      400,
      "Unable to pay because there are no products in the cart"
    );
  }

  if (!stripePaymentInfoId) {
    throw new ErrorHandle(400, "Don't not find stripe payment info id");
  }
  const paymentIntent = await stripe.paymentIntents.retrieve(
    stripePaymentInfoId
  );
  if (paymentIntent.status !== "succeeded") {
    throw new ErrorHandle(400, "Payment not authorized");
  }

  const coursesToUpdate = findCart.items.map((item) => item.courseId);

  await Promise.all(
    coursesToUpdate.map(async (courseId) => {
      const findCourse = await courseModel.findByIdAndUpdate(
        { _id: courseId },
        { $inc: { sold: 1 } }
      );
      if (findCourse) {
        await NotifyModel.create({
          message: `purchased ${findCourse.title.slice(0, 40)} course`,
          sender: userId,
          receiver: findCourse.author,
        });
        findUser.myLearning.push(findCourse._id);
        findUser.lastJoinedAt = new Date();
      }

      await UserCourseProgressModel.create({
        userId,
        courseId,
      });
    })
  );

  const newOrder = await orderModel.create({
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

const newPaymentIntent = async (amount: number, currency: string) => {
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

const checkUserPurchaseCousre = async (courseId: string, userId: string) => {
  const findOrder = await orderModel.findOne({
    products: { $in: [courseId] },
    userId,
  });
  if (!findOrder) {
    return false;
  } else {
    return true;
  }
};
const orderService = {
  newPaymentIntent,
  newOrder,
  checkUserPurchaseCousre,
  newOrderCart,
};
export default orderService;
