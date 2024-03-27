"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpectedIntervalsInstructor = exports.createExpectedIntervals = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function createExpectedIntervals(period) {
    const intervals = [];
    if (period === "6M") {
        const endYear = (0, dayjs_1.default)().get("year");
        for (let year = (0, dayjs_1.default)().subtract(6, "year").get("year"); year <= endYear; year++) {
            intervals.push({
                _id: { sixMonthInterval: "Jan-Jun", year: year },
            });
            if (year !== (0, dayjs_1.default)().get("year")) {
                intervals.push({
                    _id: { sixMonthInterval: "Jul-Dec", year: year },
                });
            }
        }
    }
    else if (period === "1M") {
        for (let i = 11; i >= 0; i--) {
            const month = (0, dayjs_1.default)().subtract(i, "month").get("month");
            const year = (0, dayjs_1.default)().subtract(i, "month").get("year");
            intervals.push({
                _id: { month: month, year: year },
            });
        }
    }
    else if (period === "1Y") {
        for (let year = (0, dayjs_1.default)().subtract(11, "year").get("year"); year <= (0, dayjs_1.default)().get("year"); year++) {
            intervals.push({ _id: { year: year } });
        }
    }
    else if (period === "D") {
        for (let i = 10; i >= 1; i--) {
            const day = (0, dayjs_1.default)().subtract(i, "day").get("dates");
            const month = (0, dayjs_1.default)().subtract(i, "day").get("month") + 1;
            const year = (0, dayjs_1.default)().subtract(i, "day").get("year");
            intervals.push({
                _id: { day: day, month: month, year: year },
            });
        }
    }
    else if (period === "30D") {
        for (let i = 30; i >= 1; i--) {
            const day = (0, dayjs_1.default)().subtract(i, "day").get("dates");
            const month = (0, dayjs_1.default)().subtract(i, "day").get("month") + 1;
            const year = (0, dayjs_1.default)().subtract(i, "day").get("year");
            intervals.push({
                _id: { day: day, month: month, year: year },
            });
        }
    }
    return intervals;
}
exports.createExpectedIntervals = createExpectedIntervals;
function createExpectedIntervalsInstructor(period) {
    const intervals = [];
    if (period === "6M") {
        const endYear = (0, dayjs_1.default)().get("month") <= 6
            ? (0, dayjs_1.default)().subtract(1, "year").get("year")
            : (0, dayjs_1.default)().get("year");
        for (let year = (0, dayjs_1.default)().subtract(6, "year").get("year"); year <= endYear; year++) {
            intervals.push({
                _id: { sixMonthInterval: "Jan-Jun", year: year },
            });
            if (year !== (0, dayjs_1.default)().get("year")) {
                intervals.push({
                    _id: { sixMonthInterval: "Jul-Dec", year: year },
                });
            }
        }
    }
    else if (period === "1M") {
        for (let i = 12; i >= 1; i--) {
            const month = (0, dayjs_1.default)().subtract(i, "month").get("month");
            const year = (0, dayjs_1.default)().subtract(i, "month").get("year");
            intervals.push({
                _id: { month: month, year: year },
            });
        }
    }
    else if (period === "1Y") {
        for (let year = (0, dayjs_1.default)().subtract(12, "year").get("year"); year <= (0, dayjs_1.default)().subtract(1, "year").get("year"); year++) {
            intervals.push({ _id: { year: year } });
        }
    }
    else if (period === "7D") {
        for (let i = 7; i >= 0; i--) {
            const day = (0, dayjs_1.default)().subtract(i, "day").get("dates");
            const month = (0, dayjs_1.default)().subtract(i, "day").get("month") + 1;
            const year = (0, dayjs_1.default)().subtract(i, "day").get("year");
            intervals.push({
                _id: { day: day, month: month, year: year },
            });
        }
    }
    return intervals;
}
exports.createExpectedIntervalsInstructor = createExpectedIntervalsInstructor;
