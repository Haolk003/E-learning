import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";
import courseInteractModel from "../models/courseInteract.model";
import dayjs from "dayjs";

import fillMissingIntervals from "../utils/fillMissingInterval";
import {
  createExpectedIntervals,
  createExpectedIntervalsInstructor,
} from "../utils/createdExpectdInterval";
import reviewModel from "../models/review.model";

// Function to calculate general count analytics
const generalCountAnalytics = async () => {
  // Query to calculate total earnings and total students for the current month

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Add 1 to represent the current month correctly

  const startOfMonth = new Date(currentYear, currentMonth - 2, 1); // Start of the previous month
  const endOfMonth = new Date(currentYear, currentMonth - 1, 0); // End of the previous month

  const totalCourseCurrentMonth = await courseModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: 1,
        },
      },
    },
  ]);
  // Query to calculate total earnings and total students for the previous month
  // Aggregate orders by month
  const orderGenerateMonth = await orderModel.aggregate([
    {
      $project: {
        payment_info: 1,
        createdAt: 1,
        monthInteral: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
    },
    {
      $group: {
        _id: { monthInteral: "$monthInteral" }, // Group all matched documents
        totalRevenue: {
          $sum: "$payment_info.amount", // Sum the amount fields
        },
        totalStudent: {
          $sum: 1,
        },
      },
    },
  ]);

  // Calculate total earning for the month
  const totalEarning = orderGenerateMonth.reduce((total, item) => {
    return total + item.totalRevenue;
  }, 0);

  const generateTotalEarningLastMonth = orderGenerateMonth.find(
    (item) =>
      item._id.monthInteral.month === startOfMonth.getMonth() + 1 &&
      item._id.monthInteral.year === startOfMonth.getFullYear()
  );

  // Calculate total number of students for the month
  const totalStudent = orderGenerateMonth.reduce((total, item) => {
    return total + item.totalStudent;
  }, 0);

  // Calculate average earning per month
  const averageMonthEarning = totalEarning / orderGenerateMonth.length;

  // Calculate average number of students per month
  const averageMonthStudent = totalStudent / orderGenerateMonth.length;

  const totalCourseMonth = await courseModel.aggregate([
    // Match documents with createdAt field within the desired range
    {
      $match: {
        status: "public",
      },
    },
    {
      $project: {
        createdAt: 1,
        monthInteral: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
    },
    {
      $group: {
        _id: { monthInteral: "$monthInteral" },
        total: {
          $sum: 1,
        },
      },
    },
  ]);

  const totalCourse = totalCourseMonth.reduce((total, item) => {
    return total + item.total;
  }, 0);
  const averageMonthTotalCourse = totalCourse / totalCourseMonth.length;

  const instructorMonthGenerate = await userModel.aggregate([
    {
      $match: { role: "instructor", timeBeginInstructors: { $lt: endOfMonth } },
    },
    {
      $project: {
        timeBeginInstructors: 1,
        monthInteral: {
          month: { $month: "$timeBeginInstructors" },
          year: { $year: "$timeBeginInstructors" },
        },
      },
    },
    {
      $group: {
        _id: { monthInteral: "$monthInteral" },
        total: { $sum: 1 },
      },
    },
  ]);

  const generateTotalIntructorLastMonth = instructorMonthGenerate.find(
    (item) =>
      item._id.monthInteral.month === startOfMonth.getMonth() + 1 &&
      item._id.monthInteral.year === startOfMonth.getFullYear()
  );

  const totalIntructor = instructorMonthGenerate.reduce((total, item) => {
    return total + item.total;
  }, 0);

  const averageMonthTotalIntructor =
    totalIntructor / instructorMonthGenerate.length;

  // Calculate student fluctuation percentage
  const studentFluctuationMonth = generateTotalEarningLastMonth
    ? ((generateTotalEarningLastMonth.totalStudent - averageMonthStudent) /
        averageMonthStudent) *
      100
    : -100;

  // Calculate earnings fluctuation percentage
  const earningFluctuationMonth = generateTotalEarningLastMonth
    ? ((generateTotalEarningLastMonth.totalRevenue - averageMonthEarning) /
        averageMonthEarning) *
      100
    : -100;

  const courseFluturationMonth = totalCourseCurrentMonth[0]
    ? ((totalCourseCurrentMonth[0].total - averageMonthTotalCourse) /
        averageMonthTotalCourse) *
      100
    : -100;

  const totalIntructorFluturationMonth = generateTotalIntructorLastMonth
    ? ((generateTotalIntructorLastMonth.total - averageMonthTotalIntructor) /
        averageMonthTotalIntructor) *
      100
    : -100;

  return {
    totalCourse,
    totalStudent,
    totalIntructor,
    totalEarning,
    studentFluctuationMonth,
    earningFluctuationMonth,
    courseFluturationMonth,
    totalIntructorFluturationMonth,
  };
};
// Function to get the start date based on the given period

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

// Function to generate earnings report based on the give
async function generateEarningsReport(period: string) {
  let earningTotal;
  if (period === "D") {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 10);

    const query = {
      createdAt: {
        $gte: startDate,
        $lt: new Date(),
      },
    };
    earningTotal = await orderModel.aggregate([
      {
        $match: query,
      },
      {
        $project: {
          amount: "$payment_info.amount",
          createdAt: 1,
          dayOfYear: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            day: "$dayOfYear",
            month: "$month",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervals("D");
    const filledResults = fillMissingIntervals(
      "D",
      earningTotal,
      expectedIntervals
    );
    earningTotal = filledResults;
  } else if (period === "1M") {
    const query = {
      createdAt: {
        $gte: getStartDate("1M"),
        $lt: new Date(),
      },
    };

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
          _id: "$monthInteral",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervals("1M");

    const filledResults = fillMissingIntervals(
      "1M",
      earningTotal,
      expectedIntervals
    );
    earningTotal = filledResults;
  } else if (period === "6M") {
    const query = {
      createdAt: {
        $gte: getStartDate("6M"),
        $lt: new Date(),
      },
    };

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

          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.sixMonthInterval": 1 } },
    ]);

    const expectedIntervals = createExpectedIntervals("6M");
    const filledResults = fillMissingIntervals(
      "6M",
      earningTotal,
      expectedIntervals
    );
    earningTotal = filledResults;
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
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    const expectedIntervals = createExpectedIntervals("1Y");
    const filledResults = fillMissingIntervals(
      "1Y",
      earningTotal,
      expectedIntervals
    );
    earningTotal = filledResults;
  }
  return earningTotal;
}

async function generateEarningReportForInstructor(
  period: string,
  userId: string
) {
  let earningTotal;
  const now = new Date();
  if (period === "7D") {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const query = {
      createdAt: {
        $gte: startDate,
        $lt: new Date(),
      },
      instructorId: userId,
    };
    earningTotal = await orderModel.aggregate([
      {
        $match: query,
      },
      {
        $project: {
          amount: "$payment_info.amount",
          createdAt: 1,
          dayOfMonth: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            day: "$dayOfMonth",
            month: "$month",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervalsInstructor("7D");
    const filledResults = fillMissingIntervals(
      "D",
      earningTotal,
      expectedIntervals
    );

    earningTotal = filledResults;
  } else if (period === "30D") {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const query = {
      createdAt: {
        $gte: startDate,
        $lt: new Date(),
      },
      instructorId: userId,
    };

    earningTotal = await orderModel.aggregate([
      { $match: query },
      {
        $project: {
          amount: "$payment_info.amount",
          createdAt: 1,
          dayOfMonth: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            day: "$dayOfMonth",
            month: "$month",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervals("30D");

    const filledResults = fillMissingIntervals(
      "D",
      earningTotal,
      expectedIntervals
    );
    earningTotal = filledResults;
  } else if (period === "1Y") {
    const query = {
      createdAt: {
        $gte: getStartDate("1M"),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
      instructorId: userId,
    };

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
          _id: "$monthInteral",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervals("1M");

    const filledResults = fillMissingIntervals(
      "1M",
      earningTotal,
      expectedIntervals
    );
    earningTotal = filledResults;
  } else {
    const query = {
      instructorId: userId,
    };

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
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    const expectedIntervals = createExpectedIntervals("1Y");
    const filledResults = fillMissingIntervals(
      "1Y",
      earningTotal,
      expectedIntervals
    );
    earningTotal = filledResults;
  }
  return earningTotal;
}

async function generateReviewReportForInstructor(
  period: string,
  userId: string
) {
  let reviewTotal;
  const now = new Date();
  if (period === "7D") {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const query = {
      createdAt: {
        $gte: startDate,
        $lt: new Date(),
      },
      instructorId: userId,
    };
    reviewTotal = await reviewModel.aggregate([
      {
        $match: query,
      },
      {
        $project: {
          amount: "$rating",
          createdAt: 1,
          dayOfMonth: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            day: "$dayOfMonth",
            month: "$month",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $addFields: {
          average: { $divide: ["$totalAmount", "$count"] },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervalsInstructor("7D");
    const filledResults = fillMissingIntervals(
      "D",
      reviewTotal,
      expectedIntervals
    );

    reviewTotal = filledResults;
  } else if (period === "30D") {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const query = {
      createdAt: {
        $gte: startDate,
        $lt: new Date(),
      },
      instructorId: userId,
    };

    reviewTotal = await reviewModel.aggregate([
      { $match: query },
      {
        $project: {
          amount: "$rating",
          createdAt: 1,
          dayOfMonth: { $dayOfMonth: "$createdAt" },
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            day: "$dayOfMonth",
            month: "$month",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $addFields: {
          average: { $divide: ["$totalAmount", "$count"] },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervals("30D");

    const filledResults = fillMissingIntervals(
      "D",
      reviewTotal,
      expectedIntervals
    );
    reviewTotal = filledResults;
  } else if (period === "1Y") {
    const query = {
      createdAt: {
        $gte: getStartDate("1M"),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
      instructorId: userId,
    };

    reviewTotal = await reviewModel.aggregate([
      { $match: query },
      {
        $project: {
          amount: "$rating",
          createdAt: 1,
          monthInteral: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
        },
      },
      {
        $group: {
          _id: "$monthInteral",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $addFields: {
          average: { $divide: ["$totalAmount", "$count"] },
        },
      },
    ]);

    const expectedIntervals = createExpectedIntervals("1M");

    const filledResults = fillMissingIntervals(
      "1M",
      reviewTotal,
      expectedIntervals
    );
    reviewTotal = filledResults;
  } else {
    const query = {
      instructorId: userId,
    };

    reviewTotal = await reviewModel.aggregate([
      { $match: query },
      {
        $project: {
          amount: "$rating",
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
          count: { $sum: 1 },
        },
      },
      {
        $addFields: {
          average: { $divide: ["$totalAmount", "$count"] },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    const expectedIntervals = createExpectedIntervals("1Y");
    const filledResults = fillMissingIntervals(
      "1Y",
      reviewTotal,
      expectedIntervals
    );
    reviewTotal = filledResults;
  }
  return reviewTotal;
}

const calculateMetricsSum = async () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const startDate = new Date(currentYear, currentMonth - 2, 1);
  const endDate = new Date(currentYear, currentMonth - 1, 0);

  const lastYearStartDate = new Date(currentYear - 1, currentMonth - 2, 1);
  const lastYearEndDate = new Date(currentYear - 1, currentMonth - 1, 0);

  const [currentMonthData, lastMonthData] = await Promise.all([
    courseInteractModel.aggregate([
      {
        $match: {
          createdAt: {
            $lt: endDate,
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          totalBounces: {
            $sum: {
              $cond: [{ $eq: [{ $size: "$pageView" }, 1] }, 1, 0],
            },
          },
        },
      },
    ]),
    courseInteractModel.aggregate([
      {
        $match: {
          createdAt: {
            $lt: lastYearEndDate,
            $gte: lastYearStartDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          totalBounces: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: [{ $size: "$pageView" }, 1] }, // Kiểm tra nếu chỉ có một pageView
                    {
                      $eq: [
                        {
                          $size: {
                            $filter: {
                              input: "$pageView.interactions",
                              as: "interaction",
                              cond: { $eq: ["$$interaction", 0] },
                            },
                          },
                        },
                        0,
                      ],
                    }, // Kiểm tra nếu interactions bằng 0
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]),
  ]);

  const currentMonthTotalVisits = currentMonthData[0]
    ? currentMonthData[0].totalVisits
    : 0;
  const currentMonthBounces = currentMonthData[0]
    ? currentMonthData[0].totalBounces
    : 0;
  const lastMonthTotalVisits = lastMonthData[0]
    ? lastMonthData[0].totalVisits
    : 0;
  const lastMonthBounces = lastMonthData[0] ? lastMonthData[0].totalBounces : 0;

  const currentMonthBounceRate =
    (currentMonthBounces / currentMonthTotalVisits) * 100;
  const bounceRateChange =
    currentMonthBounceRate - (lastMonthBounces / lastMonthTotalVisits) * 100;
  const totalVisitsChange =
    ((currentMonthTotalVisits - lastMonthTotalVisits) / lastMonthTotalVisits) *
    100;
  return {
    currentMonthBounceRate,
    bounceRateChange,
    currentMonthTotalVisits,
    totalVisitsChange,
  };
};

const calculateUserSum = async () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const startDate = new Date(currentYear, currentMonth - 2, 1);
  const endDate = new Date(currentYear, currentMonth - 1, 0);

  const monthStartDateLastYear = new Date(currentYear - 1, currentMonth - 2, 1);
  const monthEndDateLastYear = new Date(currentYear - 1, currentMonth - 1, 0);
  const totalUser = await userModel.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
      },
    },
  ]);

  const currentMonthData = await userModel.aggregate([
    {
      $match: {
        createdAt: {
          $lt: endDate,
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
      },
    },
  ]);
  const lastMonthData = await userModel.aggregate([
    {
      $match: {
        createdAt: {
          $lt: monthEndDateLastYear,
          $gte: monthStartDateLastYear,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
      },
    },
  ]);

  const currentMonthTotalUser = currentMonthData[0]
    ? currentMonthData[0].total
    : 0;

  const lastMonthTotalUser = lastMonthData[0] ? lastMonthData[0].total : 0;

  const totalUserFluturationMonth =
    ((currentMonthTotalUser - lastMonthTotalUser) / lastMonthTotalUser) * 100;
  return { totalUser, totalUserFluturationMonth };
};

const calculateDevideTypePercentage = async () => {
  const totalCount = await courseInteractModel.countDocuments();

  const deviceTypeCounts = await courseInteractModel.aggregate([
    {
      $group: {
        _id: "$deviceType",
        count: { $sum: 1 },
      },
    },
  ]);

  const deviceTypePercentages = deviceTypeCounts.map((type) => ({
    deviceType: type._id,
    percentage: ((type.count / totalCount) * 100).toFixed(2), // Làm tròn đến hai chữ số thập phân
  }));

  return deviceTypePercentages;
};

const calculateBounceRateAndSessions = async () => {
  const lastYearEndDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0
  );
  const lastYearStartDate = new Date(
    new Date().setFullYear(lastYearEndDate.getFullYear() - 1)
  );

  const pipeline = await courseInteractModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: lastYearStartDate,
          $lt: lastYearEndDate,
        },
      },
    },
    {
      $project: {
        createdAt: 1,
        pageView: 1,
        monthInteral: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
    },
    {
      $group: {
        _id: "$monthInteral",
        totalSessions: { $sum: 1 },
        totalBounces: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: [{ $size: "$pageView" }, 1] }, // Single page view in a session
                  {
                    $eq: [{ $arrayElemAt: ["$pageView.interactions", 0] }, []],
                  }, // No interactions in the single page view
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);
  const intervals = [];
  for (let i = 12; i >= 1; i--) {
    const month = dayjs().subtract(i, "month").get("month");
    const year = dayjs().subtract(i, "month").get("year");
    intervals.push({
      _id: { month: month, year: year },
      totalSessions: 0,
      totalBounces: 0,
    });
  }
  const newData = intervals.map((item) => {
    const newData = pipeline.find(
      (item2) =>
        item._id.month == item2._id.month - 1 && item._id.year == item2._id.year
    );

    if (newData) {
      return {
        ...item,
        totalBounces: newData.totalBounces,
        totalSessions: newData.totalSessions,
      };
    } else {
      return item;
    }
  });
  return newData;
};

const calculateMonthNewUserSessionDuration = async () => {
  const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
  const startDate = new Date(new Date().setFullYear(endDate.getFullYear() - 1));
  const newUserIds = await userModel
    .find({ createdAt: { $gte: startDate, $lt: endDate } })
    .select("_id");

  const newUserIsArray = newUserIds.map((user) => user._id);

  const newUserPerMonth = await userModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        total: { $sum: 1 },
      },
    },
  ]);

  const newUserSessions = await courseInteractModel.aggregate([
    {
      $match: { userId: { $in: newUserIsArray } },
    },

    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalDuration: { $sum: "$totalTimeSpent" },
        sessionCount: { $sum: 1 },
      },
    },
    {
      $project: {
        userId: 1,
        createdAt: 1,
        month: "$_id.month",
        year: "$_id.year",
        averageSessionDuration: {
          $divide: ["$totalDuration", "$sessionCount"],
        },
        sessionCount: "$sessionCount",
      },
    },
  ]);
  const expectedIntervals = createExpectedIntervals("1M");

  const newDataUserSession = expectedIntervals.map((interval) => {
    const newData = newUserSessions.find(
      (item2) =>
        interval._id.month == item2._id.month - 1 &&
        interval._id.year == item2._id.year
    );

    if (newData) {
      return {
        ...interval,
        totalDuration: newData.totalDuration,
        sessionCount: newData.sessionCount,
        averageSessionDuration: newData.averageSessionDuration,
      };
    } else {
      return {
        ...interval,
        sessionCount: 0,
        averageSessionDuration: 0,
      };
    }
  });

  const newDataUserPerMonth = expectedIntervals.map((interval) => {
    const newData = newUserPerMonth.find(
      (item2) =>
        interval._id.month == item2._id.month - 1 &&
        interval._id.year == item2._id.year
    );

    if (newData) {
      return {
        ...interval,
        total: newData.total,
      };
    } else {
      return { ...interval, total: 0 };
    }
  });

  return { newDataUserPerMonth, newDataUserSession };
};

const getCurrentMonthStart = () => {
  let date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getLastMonthStart = () => {
  let date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getLastMonthEnd = () => {
  let date = getCurrentMonthStart();
  date.setSeconds(date.getSeconds() - 1);
  return date;
};

const genarateBrowser = async () => {
  const startOfLastMonth = getLastMonthStart();
  const endOfLastMonth = getLastMonthEnd();
  const startOfCurrentMonth = getCurrentMonthStart();

  const trafficData = await courseInteractModel.aggregate([
    {
      $facet: {
        currentMonth: [
          { $match: { startTime: { $gte: startOfCurrentMonth } } },
          { $group: { _id: "$userAgent", count: { $sum: 1 } } },
        ],
        lastMonth: [
          {
            $match: {
              startTime: { $gte: startOfLastMonth, $lt: endOfLastMonth },
            },
          },
          { $group: { _id: "$userAgent", count: { $sum: 1 } } },
        ],
      },
    },
    {
      $project: {
        browserStats: {
          $map: {
            input: "$currentMonth",
            as: "current",
            in: {
              browser: "$$current._id",
              currentMonthCount: "$$current.count",
              lastMonthCount: {
                $let: {
                  vars: {
                    lastMonthData: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$lastMonth",
                            as: "last",
                            cond: { $eq: ["$$last._id", "$$current._id"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: "$$lastMonthData.count",
                },
              },
            },
          },
        },
      },
    },
    {
      $unwind: "$browserStats",
    },
    {
      $project: {
        browser: "$browserStats.browser",
        currentMonthCount: "$browserStats.currentMonthCount",
        lastMonthCount: "$browserStats.lastMonthCount",
        difference: {
          $subtract: [
            "$browserStats.currentMonthCount",
            "$browserStats.lastMonthCount",
          ],
        },
        percentChange: {
          $cond: [
            { $eq: ["$browserStats.lastMonthCount", 0] },
            null,
            {
              $multiply: [
                {
                  $divide: [
                    {
                      $subtract: [
                        "$browserStats.currentMonthCount",
                        "$browserStats.lastMonthCount",
                      ],
                    },
                    "$browserStats.lastMonthCount",
                  ],
                },
                100,
              ],
            },
          ],
        },
      },
    },
  ]);
  return trafficData;
};

const analyticsService = {
  generalCountAnalytics,
  generateEarningsReport,
  calculateMetricsSum,
  calculateUserSum,
  calculateBounceRateAndSessions,
  calculateDevideTypePercentage,
  calculateMonthNewUserSessionDuration,
  genarateBrowser,
  generateEarningReportForInstructor,
  generateReviewReportForInstructor,
};

export default analyticsService;
