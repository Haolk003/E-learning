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

const getStartDate = (period: string) => {
  const now = new Date();
  switch (period) {
    case "1M":
      now.setMonth(now.getMonth() - 12);
      now.setDate(1);
      break;
    case "6M":
      now.setFullYear(now.getFullYear() - 6);
      break;
    case "1Y":
      now.setFullYear(now.getFullYear() - 12);
      break;
    default:
      now.setFullYear(now.getFullYear() - 12);
      break;
  }
  return now;
};

const generateEarningsReport = async (period: string) => {
  let earningTotal;
  if (period === "1M") {
    const query = { createdAt: { $gte: getStartDate("1M") } };

    earningTotal = await orderModel.aggregate([
      { $match: query },
      {
        $project: {
          amount: "$payment_info.amount",
          createdAt: 1,
          monthInteral: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
        },
      },
      {
        $group: {
          _id: {
            monthInterval: "$monthInteral",
          },
          totalAmount: { $sum: "$amount" },
          averageAmount: { $avg: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.monthInteral.year": 1, "_id.monthInterval.month": 1 } },
    ]);
    earningTotal.sort((a, b) => {
      // Sắp xếp giảm dần theo năm
      if (a._id.monthInterval.year > b._id.monthInterval.year) return -1;
      if (a._id.monthInterval.year < b._id.monthInterval.year) return 1;

      // Nếu cùng năm, sắp xếp tăng dần theo tháng
      if (a._id.monthInterval.month < b._id.monthInterval.month) return 1;
      if (a._id.monthInterval.month > b._id.monthInterval.month) return -1;

      return 0;
    });
  } else if (period === "6M") {
    const query = { createdAt: { $gte: getStartDate("6M") } };

    earningTotal = await orderModel.aggregate([
      { $match: query },
      {
        $project: {
          amount: "$payment_info.amount",
          createdAt: 1,
          sixMonthInterval: {
            $cond: {
              if: { $lte: [{ $month: "$createdAt" }, 6] },
              then: "Jan-Jun",
              else: "Jul-Dec",
            },
          },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            sixMonthInterval: "$sixMonthInterval",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          averageAmount: { $avg: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.sixMonthInterval": 1 } },
    ]);
  } else {
    const query = { createdAt: { $gte: getStartDate("1Y") } };

    earningTotal = await orderModel.aggregate([
      { $match: query },
      {
        $project: {
          amount: "$payment_info.amount",
          createdAt: 1,
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          averageAmount: { $avg: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);
  }
  return earningTotal;
};
const analyticsService = {
  generalCountAnalytics,
  generateEarningsReport,
};

export default analyticsService;
