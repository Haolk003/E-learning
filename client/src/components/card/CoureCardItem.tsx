import Image from "next/image";
import React, { FC } from "react";
import Rating from "../ui/Rating";
import { IoListOutline } from "react-icons/io5";
import Link from "next/link";
type Props = {
  image: string;
  title: string;
  sold: number;
  lectureLength: number;
  star: number;
  price: number;
  estimatePrice: number;
  _id: string;
};
const CoureCardItem: FC<Props> = ({
  _id,
  estimatePrice,
  image,
  lectureLength,
  price,
  sold,
  star,
  title,
}) => {
  return (
    <div className="w-full  px-3 py-4 bg-blackA9 text-white rounded-lg border border-gray4">
      <div className="relative w-full min-h-[200px]">
        <Image
          src={image}
          alt={image}
          fill
          className="w-[300px] h-[200px] object-cover"
        />
      </div>
      <Link href={`/course/${_id}`} className="text-[14px] leading-6 mt-2 mb-2">
        {title}
      </Link>
      <div className="flex items-center justify-between">
        <Rating ratings={star} />
        <p className="text-sm">{sold} Students</p>
      </div>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3">
          <span className="text-[15px]">$ {estimatePrice}</span>
          <span className="line-through text-[12px]">$ {price}</span>
        </div>
        <div className="flex items-center gap-3">
          <IoListOutline />
          <span className="text-sm">{lectureLength} Lectures</span>
        </div>
      </div>
    </div>
  );
};

export default CoureCardItem;
