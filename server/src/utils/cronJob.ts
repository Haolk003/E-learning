import { CronJob } from "cron";

import userModel from "../models/user.model";
import dayjs from "dayjs";

const deleteUserWithoutVerification = new CronJob(
  "0 0 * * * *",
  async function () {
    const endTime3day = dayjs().subtract(3, "day");
    const findUserWithoutVerify = await userModel.deleteMany({
      isVerified: false,
      createdAt: { $lte: endTime3day },
    });
  }
);

export default deleteUserWithoutVerification;
