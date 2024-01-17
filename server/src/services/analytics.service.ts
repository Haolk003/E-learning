import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";

import ErrorHandle from "../utils/errorHandle";

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
  console.log(generateTotalEarningLastMonth);
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
  if (period === "7D") {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const query = {
      createdAt: {
        $gte: startDate,
        $lt: new Date(),
      },
    };
    const earningTotal = await orderModel.aggregate([
      {
        $match: query,
      },
      {
        $project: {
          amount: "$payment_info.amount",
          createdAt: 1,
          dayOfYear: { $dayOfYear: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            monthInterval: "$dayOfYear",
            year: "$year",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.monthInterval": 1 } },
    ]);
  }
  if (period === "1M") {
    const query = {
      createdAt: {
        $gte: getStartDate("1M"),
        $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
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
          _id: {
            monthInterval: "$monthInteral",
          },
          totalAmount: { $sum: "$amount" },
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
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);
  }
  return earningTotal;
}

const genrateStudentReport = async () => {};
const analyticsService = {
  generalCountAnalytics,
  generateEarningsReport,
};

export default analyticsService;
