import React, { FC } from "react";
import Image from "next/image";
import Rating from "../ui/Rating";

type Props = {
  title: string;
  _id: string;
  thumbnail: string;
  price: number;
  author: string;
  ratings: number;
  totalRating: number;
  benefits: { title: string; _id: string }[];
};
const CourseCardCategory: FC<Props> = ({
  _id,
  author,
  benefits,
  price,
  ratings,
  thumbnail,
  title,
  totalRating,
}) => {
  return (
    <div className="">
      <div className="w-full">
        <Image
          src={thumbnail}
          alt={thumbnail}
          width={200}
          height={150}
          className="w-full h-[150px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 "></div>
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="dark:text-gray3 text-gray8">{author}</p>
      <div className="flex items-center gap-1">
        <p className="text-[17px] font-semibold">{ratings.toFixed(1)}</p>
        <Rating ratings={ratings} />
        <p className="dark:text-gray3 text-[12px] text-gray8">
          ({totalRating})
        </p>
      </div>
      <p className="font-semibold text-[16px]">${price}</p>
    </div>
  );
};

export default CourseCardCategory;
