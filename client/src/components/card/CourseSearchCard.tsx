import React from "react";
import Image from "next/image";
import Rating from "../ui/Rating";
type Props = {
  thumnail: string;
  title: string;
  description: string;
  ratings: number;
  totalLecture: number;
  totalHours: number;
  level: string;
  price: number;
  estimatePrice: number;
  _id: string;
  author: string;
};
const CourseSearchCard: React.FC<Props> = ({
  _id,
  description,
  estimatePrice,
  level,
  price,
  ratings,
  thumnail,
  title,
  totalHours,
  totalLecture,
  author,
}) => {
  return (
    <div className="flex gap-3 justify-between border-b border-gray8 dark:border-gray6 pb-4">
      <div className="w-[25%] ">
        <Image
          src={thumnail}
          alt=""
          width={300}
          height={250}
          className="object-cover w-full h-[140px] "
        />
      </div>
      <div className="flex flex-col gap-1 w-[70%]">
        <h3 className="text-[16px] font-semibold ">{title}</h3>
        <p className="text-[13px] dark:text-gray10 text-gray3">{description}</p>
        <p className="text-[12px] dark:text-gray9 text-gray5">{author}</p>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-[16px]">{ratings.toFixed(1)}</p>
          <Rating ratings={ratings} />
        </div>
        <div className="flex items-center gap-1 text-gray9 text-[12px]">
          <p>{totalHours} total hours</p>
          <span>·</span>
          <p>{totalLecture} lectures</p>
          <span>·</span>
          <p>{level}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-[16px]">${estimatePrice.toFixed(2)}</p>
        <p className="line-through text-gray8 font-thin text-[14px]">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CourseSearchCard;
