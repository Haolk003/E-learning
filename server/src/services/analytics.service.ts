import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";

import ErrorHandle from "../utils/errorHandle";

const generalCountAnalytics = async () => {
  const totalEarningscurrentMonth = await orderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1
          ), // MM is the current month (1-12)
          $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 0), // Last day of the previous month
        },
      },
    },
    {
      $group: {
        _id: null, // Group all matched documents
        totalRevenue: {
          $sum: "$payment_info.amount", // Sum the amount fields
        },
        totalStudent: {
          $sum: 1,
        },
      },
    },
  ]);
  const totalEarninglastMonth = await orderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 2,
            1
          ), // MM is the current month (1-12)
          $lt: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0), // Last day of the previous month
        },
      },
    },
    {
      $group: {
        _id: null, // Group all matched documents
        totalRevenue: {
          $sum: "$payment_info.amount", // Sum the amount fields
        },
        totalStudent: {
          $sum: 1,
        },
      },
    },
  ]);
  const studentFluctuationMonth =
    ((totalEarningscurrentMonth[0].totalStudent -
      totalEarninglastMonth[0].totalStudent) /
      totalEarninglastMonth[0].totalStudent) *
    100;
  const earningFluctuationMonth =
    ((totalEarningscurrentMonth[0].totalRevenue -
      totalEarninglastMonth[0].totalRevenue) /
      totalEarninglastMonth[0].totalRevenue) *
    100;
  return {
    totalEarninglastMonth,
    totalEarningscurrentMonth,
    studentFluctuationMonth,
    earningFluctuationMonth,
  };
};

const analyticsService = {
  generalCountAnalytics,
};

export default analyticsService;
