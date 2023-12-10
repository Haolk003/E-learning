import React, { FC } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
type Props = {
  time: string;
};
const useSetTimeAgo: FC<Props> = ({ time }) => {
  return dayjs(time).fromNow();
};

export default useSetTimeAgo;
