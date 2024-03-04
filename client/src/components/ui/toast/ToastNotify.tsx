import React from "react";
import { FaRegCheckCircle } from "react-icons/fa"; // Import your close icon SVG here
import useSetTimeAgo from "@/hooks/useSetTimeAgo";
import { IoCloseOutline } from "react-icons/io5";
import { notifyType } from "@/types/notifyType";
const ToastNotify = ({ data }: { data: notifyType }) => {
  // Giả sử bạn có một hook `useSetTimeAgo` đã được định nghĩa để tính toán thời gian cách đây
  const timeAgo = useSetTimeAgo({ time: data?.createdAt || new Date() });

  return (
    <div className="flex items-start w-full h-full relative" role="alert">
      <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 bg-blue-800 text-white text-sm rounded-full">
        <FaRegCheckCircle />
      </div>
      <div className="px-3 py-2 flex flex-col justify-between flex-grow">
        <strong className="font-bold dark:text-white text-black">
          Success Alert
        </strong>
        <span className="text-xs dark:text-white text-black">
          {data.message || ""}
        </span>
      </div>

      <div className="absolute bottom-0 right-0 p-2 text-xs">{timeAgo}</div>
    </div>
  );
};

export default ToastNotify;
