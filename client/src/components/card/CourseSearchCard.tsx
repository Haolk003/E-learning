import React from "react";
import Image from "next/image";
import Rating from "../ui/Rating";
import * as HoverCard from "@radix-ui/react-hover-card";
import { CiHeart } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import dayjs from "dayjs";
import dompurify from "dompurify";
import { useAddToCartMutation } from "@/features/cart/cartApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openLogin } from "@/features/layout/layoutSlice";
import Link from "next/link";
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
  updatedAt: string;
  totalVideoLength: number;
  benefits: { title: string; _id: string }[];
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
  benefits,
  totalVideoLength,
  updatedAt,
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
        <Link
          href={`/course/${_id}`}
          className="flex gap-3 justify-between border-b border-gray8 dark:border-gray6 pb-4"
        >
          <div className="w-[250px] h-[150px] overflow-hidden ">
            <Image
              src={thumnail}
              alt=""
              width={250}
              height={150}
              className="object-cover w-[250px] h-[150px] "
            />
          </div>
          <div className="flex flex-col gap-1 w-[70%]">
            <h3 className="text-[16px] font-semibold ">{title}</h3>
            <div
              className="leading-4 text-[13px]"
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(description),
              }}
            ></div>
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
            <p className="font-semibold text-[16px]">${price.toFixed(2)}</p>
          </div>
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="bottom"
          align="center"
          className="min-h-[200px] md:block hidden dark:text-white text-black shadow-sm shadow-black w-[400px] px-5 py-4 data-[side=right]:animate-slideLeftAndFade data-[state=open]:transition-all dark:bg-gray4 bg-white rounded-md"
        >
          <div className="">
            <h2 className="text-[16px] font-semibold leading-6">
              What you will learn
            </h2>

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

          <HoverCard.Arrow className="dark:fill-gray4 fill-gray12 text-xl" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default CourseSearchCard;
