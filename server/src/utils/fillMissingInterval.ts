function fillMissingIntervals(
  period: string,
  data: any[],
  expectedIntervals: any[]
) {
  console.log(data);
  const dataMap = new Map();
  if (period === "6M") {
    // Check each expected interval
    const newData = expectedIntervals.map((item) => {
      const newData = data.find(
        (item2) =>
          item._id.sixMonthInterval == item2._id.sixMonthInterval &&
          item._id.year == item2._id.year
      );

      if (newData) {
        return newData;
      } else {
        return item;
      }
    });
    return newData;
  } else if (period === "1M") {
    // Map existing data for easy lookup

    const newData = expectedIntervals.map((item) => {
      const newData = data.find(
        (item2) =>
          item._id.month == item2._id.month - 1 &&
          item._id.year == item2._id.year
      );

      if (newData) {
        return {
          ...item,
          totalAmount: newData.totalAmount,
          count: newData.count,
        };
      } else {
        return item;
      }
    });
    return newData;
  } else if (period === "1Y") {
    const newData = expectedIntervals.map((item) => {
      const newData = data.find((item2) => item._id.year == item2._id.year);

      if (newData) {
        return newData;
      } else {
        return item;
      }
    });
    return newData;
  } else if (period === "D") {
    const newData = expectedIntervals.map((item) => {
      const newData = data.find((item2) => item._id.day == item2._id.day);

      if (newData) {
        return newData;
      } else {
        return item;
      }
    });
    return newData;
  }
  // Loop through each expected interval
  // Check if the interval exists in the data
  // If it does, add it to the map
  // If it doesn't, add it to the map with a value of 0

  // Convert the map back to an array
}

export default fillMissingIntervals;