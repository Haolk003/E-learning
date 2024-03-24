import Image from "next/image";
import React, { FC } from "react";
import Rating from "../ui/Rating";
import { IoCheckmarkDoneOutline, IoListOutline } from "react-icons/io5";
import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import dayjs from "dayjs";
import dompurify from "dompurify";

import { useAddToCartMutation } from "@/features/cart/cartApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openLogin } from "@/features/layout/layoutSlice";
type Props = {
  image: string;
  title: string;
  sold: number;
  lectureLength: number;
  star: number;
  price: number;
  estimatePrice: number;
  _id: string;
  updatedAt: string;
  totalVideoLength: number;
  description: string;
  benefits: { title: string; _id: string }[];
  level: string;
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
  totalVideoLength,
  benefits,
  description,
  updatedAt,
  level,
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
        <div className="md:w-full min-w-[250px]  px-3 py-4 dark:bg-blackA9 bg-mauve3 text-black  dark:text-white rounded-lg border border-gray4">
          <div className="relative w-full min-h-[200px]">
            <Image
              src={image}
              alt={image}
              fill
              className="w-[300px] h-[200px] object-cover"
            />
          </div>
          <Link href={`/course/${_id}`}>
            <h3 className="text-[14px] leading-6 mt-2 mb-2  whitespace-wrap  overflow-ellipsis overflow-hidden line-clamp-2">
              {title}
            </h3>
          </Link>
          <div className="flex md:flex-row flex-col md:items-center md:justify-between">
            <Rating ratings={star} />
            <p className="text-sm md:mt-0 mt-2">{sold} Students</p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3">
              <span className="text-[17px] font-semibold">
                $ {price.toFixed(2)}
              </span>
              {/* <span className="line-through text-[12px]">$ {price}</span> */}
            </div>
            <div className="flex items-center gap-3">
              <IoListOutline />
              <span className="text-sm">{lectureLength} Lectures</span>
            </div>
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="right"
          align="center"
          className="min-h-[200px] w-[350px] px-5 py-4 data-[side=right]:animate-slideLeftAndFade data-[state=open]:transition-all dark:bg-gray3 bg-mauve7 shadow-sm shadow-mauve7 dark:text-mauve2 text-mauve12 rounded-md"
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
                className="bg-violet11 text-white w-full h-[45px]"
                onClick={handleAddCart}
              >
                Add to cart
              </button>
              {/* <button className="rounded-full w-[50px] h-[50px] border border-gray9 flex items-center justify-center">
                <CiHeart size={25} />
              </button> */}
            </div>
          </div>

          <HoverCard.Arrow className="dark:fill-gray2 fill-mauve7 text-xl" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default CoureCardItem;
