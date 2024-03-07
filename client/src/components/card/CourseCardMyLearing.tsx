import React from "react";
import Link from "next/link";
import Image from "next/image";
import Rating from "../ui/Rating";

type Props = {
  title: string;
  author: string;
  thumbnail: string;
  _id: string;
  ratings: number;

  percentCompleted: number;
  isRating: boolean;
};
const CourseCardMyLearing: React.FC<Props> = ({
  _id,
  author,
  isRating,
  percentCompleted,
  ratings,
  thumbnail,
  title,
}) => {
  return (
    <Link
      href={`/course-access/${_id}`}
      className="w-full dark:text-white text-black"
    >
      <div className="w-full ">
        <Image
          src={thumbnail}
          alt=""
          width={200}
          height={100}
          className="w-full h-[150px] object-cover"
        />
      </div>
      <div className="flex flex-col  py-2">
        <h3 className="text-[17px] font-semibold whitespace-wrap  overflow-ellipsis overflow-hidden line-clamp-2">
          {title}
        </h3>
        <p className="dark:text-gray8 text-gray4 text-[13px] mb-3">{author}</p>
        <div className="dark:bg-gray5 bg-gray8 h-[2px] w-full relative">
          <div
            className="absolute top-0 h-full left-0 bg-violet12 dark:bg-violet10"
            style={{ width: `${percentCompleted}%` }}
          ></div>
        </div>
        <div className={`flex justify-between mt-1  `}>
          {percentCompleted > 0 ? (
            <p className="text-[13px]">{percentCompleted}% complete</p>
          ) : (
            <p className="text-[14px]">START COURSE</p>
          )}

          {percentCompleted > 0 && (
            <div className="flex flex-col gap-1">
              <Rating ratings={ratings} />
              <p className="text-[13px]">
                {isRating ? " Your a rating" : "Leave a rating"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCardMyLearing;
