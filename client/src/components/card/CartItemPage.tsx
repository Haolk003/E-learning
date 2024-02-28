import React from "react";
import Image from "next/image";
import Rating from "../ui/Rating";
import { IoMdTrash } from "react-icons/io";
import {
  useDeleteAllCourseInCartMutation,
  useDeleteCourseInCartMutation,
} from "@/features/cart/cartApi";

type Props = {
  thumbnail: string;
  title: string;
  ratings: number;
  totalReviews: number;
  author: string;
  totalLectures: number;
  totalLenghtVideo: number;
  price: number;
  sale: {
    discount: number;
  };
  _id: string;
  level: string;
  handleDeleteCartItem: (courseId: string) => void;
};
const CartItemPage: React.FC<Props> = ({
  _id,
  author,
  level,
  price,
  ratings,
  sale,
  thumbnail,
  title,
  totalLectures,
  totalLenghtVideo,
  totalReviews,
  handleDeleteCartItem,
}) => {
  return (
    <div className="flex gap-3 justify-between border-t border-gray8 py-4 cursor-pointer">
      <Image
        src={thumbnail}
        alt=""
        width={150}
        height={80}
        className="w-[150px] h-[80px] object-cover"
      />
      <div className="flex flex-col gap-[5px] w-[70%]">
        <h3 className="font-semibold text-[17px] ">{title}</h3>
        <p className="text-[12px]">By {author}</p>
        <div className="flex items-center gap-2">
          <p className="text-[16px] font-semibold">{ratings.toFixed(2)}</p>
          <Rating ratings={ratings} />
          <p className="text-gray7 text-[15px]">({totalReviews} ratings)</p>
        </div>
        <div className="flex items-center gap-1 text-[12px] text-gray8">
          <p>{totalLenghtVideo} total hourss</p>
          <span>•</span>
          <p>{totalLectures} lectures</p>
          <span>•</span>
          <p>{level}</p>
        </div>
      </div>
      <p className="font-semibold text-[18px]">${price.toFixed(2)}</p>
      <button
        className="flex justify-end text-xl w-[100px]"
        onClick={() => handleDeleteCartItem(_id)}
      >
        <IoMdTrash />
      </button>
    </div>
  );
};

export default CartItemPage;
