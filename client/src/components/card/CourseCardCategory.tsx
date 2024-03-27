import React, { FC } from "react";
import Image from "next/image";
import Rating from "../ui/Rating";
import dayjs from "dayjs";

import * as HoverCard from "@radix-ui/react-hover-card";
import dompurify from "dompurify";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { useAddToCartMutation } from "@/features/cart/cartApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openLogin } from "@/features/layout/layoutSlice";
type Props = {
  title: string;
  _id: string;
  thumbnail: string;
  price: number;
  author: string;
  ratings: number;
  totalRating: number;
  benefits: { title: string; _id: string }[];
  updatedAt: string;
  totalVideoLength: number;
  level: string;
  description: string;
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
  updatedAt,
  description,
  level,
  totalVideoLength,
}) => {
  const [addCart] = useAddToCartMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleAddCart = async () => {
    if (!user) {
      dispatch(openLogin(""));
    } else {
      await addCart({ courseId: _id, price: price });
    }
  };
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="cursor-pointer">
          <div className="w-full">
            <Image
              src={thumbnail}
              alt={thumbnail}
              width={200}
              height={150}
              className="w-full h-[150px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 "></div>
          <h3 className="font-semibold text-[15px] mt-3  whitespace-wrap  overflow-ellipsis overflow-hidden line-clamp-2">
            {title}
          </h3>
          <p className="dark:text-gray7 text-gray8 text-[13px]">{author}</p>
          <div className="flex items-center gap-1">
            <p className="text-[17px] font-semibold">{ratings.toFixed(1)}</p>
            <Rating ratings={ratings} />
            <p className="dark:text-gray3 text-[12px] text-gray8">
              ({totalRating})
            </p>
          </div>
          <p className="font-semibold text-[16px]">${price}</p>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="right"
          align="center"
          className="min-h-[200px] hidden md:block w-[400px] dark:text-white text-black shadow-sm shadow-black px-5 py-4 data-[side=right]:animate-slideLeftAndFade data-[state=open]:transition-all dark:bg-gray4 bg-white rounded-md"
        >
          <div className="">
            <h2 className="text-[16px] font-semibold leading-6">{title}</h2>
            <p className="text-green-green10">
              {dayjs(updatedAt).format("MMMM YYYY")}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[12px] text-gray8 ">
                {totalVideoLength} total hours
              </p>
              <span>·</span>
              <p className="text-[12px] text-gray8 capitalize">{level}</p>
            </div>
            <div
              className="leading-4 text-[13px]"
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(description),
              }}
            ></div>
            <ul className="flex flex-col gap-2 mt-2 text-[13px]">
              {benefits.map((item, index) => (
                <li className="flex items-center gap-3" key={item._id}>
                  <IoCheckmarkDoneOutline size={20} />
                  <p>{item.title}</p>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mt-5">
              <button
                className="bg-violet11 text-white w-[250px] h-[45px]"
                onClick={handleAddCart}
              >
                Add to cart
              </button>
              <button className="rounded-full w-[50px] h-[50px] border border-gray9 flex items-center justify-center">
                <CiHeart size={25} />
              </button>
            </div>
          </div>

          <HoverCard.Arrow className="dark:fill-gray4 fill-gray10  text-xl" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default CourseCardCategory;
