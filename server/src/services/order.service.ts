import { CatchAsyncError } from "../middlewares/catchAsyncError";
import orderModel from "../models/order.model";
import Stripe from "stripe";
import ErrorHandle from "../utils/errorHandle";
import courseModel from "../models/course.model";
import UserCourseProgressModel from "../models/userCourseProgress.model";

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
  const newOrder = await orderModel.create({
    courseId: courseId,
    userId: userId,
    payment_info: paymentIntent,
  });
  findCourse.sold = Number(findCourse.sold) + 1;
  await findCourse.save();
  await UserCourseProgressModel.create({
    userId,
    courseId,
    lastWatchedLectureId: findCourse.courseData[0].lectures[0]._id,
  });
  return newOrder;
};

const newPaymentIntent = async (amount: number, currency: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
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
  const findOrder = await orderModel.findOne({ courseId, userId });
  if (!findOrder) {
    return false;
  } else {
    return true;
  }
};
const orderService = { newPaymentIntent, newOrder, checkUserPurchaseCousre };
export default orderService;
