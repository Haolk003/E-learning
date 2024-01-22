import dayjs from "dayjs";

function createExpectedIntervals(period: string) {
  const intervals = [];
  if (period === "6M") {
    const endYear =
      dayjs().get("month") <= 6
        ? dayjs().subtract(1, "year").get("year")
        : dayjs().get("year");
    for (
      let year = dayjs().subtract(6, "year").get("year");
      year <= endYear;
      year++
    ) {
      intervals.push({
        _id: { sixMonthInterval: "Jan-Jun", year: year },
        totalAmount: 0,
        count: 0,
      });
      if (year !== dayjs().get("year")) {
        intervals.push({
          _id: { sixMonthInterval: "Jul-Dec", year: year },
          totalAmount: 0,
          count: 0,
        });
      }
    }
  } else if (period === "1M") {
    for (let i = 12; i >= 1; i--) {
      const month = dayjs().subtract(i, "month").get("month");
      const year = dayjs().subtract(i, "month").get("year");
      intervals.push({
        _id: { month: month, year: year },
        totalAmount: 0,
        count: 0,
      });
    }
  } else if (period === "1Y") {
    for (
      let year = dayjs().subtract(12, "year").get("year");
      year <= dayjs().subtract(1, "year").get("year");
      year++
    ) {
      intervals.push({ _id: { year: year }, totalAmount: 0, count: 0 });
    }
  } else if (period === "D") {
    for (let i = 10; i >= 1; i--) {
      const day = dayjs().subtract(i, "day").get("dates");
      const month = dayjs().subtract(i, "day").get("month") + 1;
      const year = dayjs().subtract(i, "day").get("year");
      intervals.push({
        _id: { day: day, month: month, year: year },
        totalAmount: 0,
        count: 0,
      });
    }
  }

  return intervals;
}

export default createExpectedIntervals;
