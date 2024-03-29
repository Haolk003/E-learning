import dayjs from "dayjs";

function createExpectedIntervals(period: string) {
  const intervals = [];
  if (period === "6M") {
    const endYear = dayjs().get("year");
    for (
      let year = dayjs().subtract(6, "year").get("year");
      year <= endYear;
      year++
    ) {
      intervals.push({
        _id: { sixMonthInterval: "Jan-Jun", year: year },
      });
      if (year !== dayjs().get("year")) {
        intervals.push({
          _id: { sixMonthInterval: "Jul-Dec", year: year },
        });
      }
    }
  } else if (period === "1M") {
    for (let i = 11; i >= 0; i--) {
      const month = dayjs().subtract(i, "month").get("month");
      const year = dayjs().subtract(i, "month").get("year");
      intervals.push({
        _id: { month: month, year: year },
      });
    }
  } else if (period === "1Y") {
    for (
      let year = dayjs().subtract(11, "year").get("year");
      year <= dayjs().get("year");
      year++
    ) {
      intervals.push({ _id: { year: year } });
    }
  } else if (period === "D") {
    for (let i = 10; i >= 1; i--) {
      const day = dayjs().subtract(i, "day").get("dates");
      const month = dayjs().subtract(i, "day").get("month") + 1;
      const year = dayjs().subtract(i, "day").get("year");
      intervals.push({
        _id: { day: day, month: month, year: year },
      });
    }
  } else if (period === "30D") {
    for (let i = 30; i >= 1; i--) {
      const day = dayjs().subtract(i, "day").get("dates");
      const month = dayjs().subtract(i, "day").get("month") + 1;
      const year = dayjs().subtract(i, "day").get("year");
      intervals.push({
        _id: { day: day, month: month, year: year },
      });
    }
  }

  return intervals;
}
function createExpectedIntervalsInstructor(period: string) {
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
      });
      if (year !== dayjs().get("year")) {
        intervals.push({
          _id: { sixMonthInterval: "Jul-Dec", year: year },
        });
      }
    }
  } else if (period === "1M") {
    for (let i = 12; i >= 1; i--) {
      const month = dayjs().subtract(i, "month").get("month");
      const year = dayjs().subtract(i, "month").get("year");
      intervals.push({
        _id: { month: month, year: year },
      });
    }
  } else if (period === "1Y") {
    for (
      let year = dayjs().subtract(12, "year").get("year");
      year <= dayjs().subtract(1, "year").get("year");
      year++
    ) {
      intervals.push({ _id: { year: year } });
    }
  } else if (period === "7D") {
    for (let i = 7; i >= 0; i--) {
      const day = dayjs().subtract(i, "day").get("dates");
      const month = dayjs().subtract(i, "day").get("month") + 1;
      const year = dayjs().subtract(i, "day").get("year");
      intervals.push({
        _id: { day: day, month: month, year: year },
      });
    }
  }

  return intervals;
}

export { createExpectedIntervals, createExpectedIntervalsInstructor };
