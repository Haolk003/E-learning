import React, { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
type Props = {
  time: string | Date;
};
const UseSetTimeAgo: FC<Props> = ({ time }) => {
  return dayjs(time).fromNow();
};

export default UseSetTimeAgo;
