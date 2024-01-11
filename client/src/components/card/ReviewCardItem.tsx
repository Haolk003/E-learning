import React from "react";
import Rating from "../ui/Rating";
import { BiLike, BiDislike } from "react-icons/bi";
import Image from "next/image";

import convertDuration from "@/utils/convertDuration";
import useSetTimeAgo from "@/hooks/useSetTimeAgo";

import { reviewContentPublic } from "@/types/reviewType";

type Props = {
  data: reviewContentPublic;
};
const ReviewCardItem: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex gap-3">
      <div>
        <Image
          src={data.user.avatar ? data.user.avatar.url : "/assets/avatar.jpg"}
          alt=""
          width={50}
          height={50}
          className="rounded-full overflow-hidden w-[50px] h-[50px]"
        />
      </div>
      <div className="">
        <h4 className="font-[700] text-md">
          {data.user.lastName} {data.user.firstName}
        </h4>
        <div className="flex items-center gap-3 my-2">
          <Rating ratings={data.rating} />
          <span className="text-gray9 text-[13px]">
            {useSetTimeAgo({ time: data.createdAt })}
          </span>
        </div>
        <p className="text-[14px]">{data.comment}</p>
        <div className="flex items-center gap-4 mt-3">
          <button className="flex items-center justify-center w-[40px] h-[40px] text-2xl border dark:border-white border-black rounded-full">
            <BiLike />
          </button>
          <button className="flex items-center justify-center w-[40px] h-[40px] text-2xl border dark:border-white border-black rounded-full">
            <BiDislike />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardItem;
