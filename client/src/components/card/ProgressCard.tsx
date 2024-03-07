import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
type Props = {
  thumbnail: string;
  title: string;
  lectureTitle: string;
  lengthWatched: number;
  duration: number;
};
const ProgressCard: React.FC<Props> = ({
  lectureTitle,
  thumbnail,
  title,
  lengthWatched,
  duration,
}) => {
  return (
    <div className="border border-gray4 flex h-[150px] max-w-[500px] overflow-hidden cursor-pointer">
      <div className="w-[150px] h-[150px] relative cursor-pointer">
        <Image
          src={thumbnail}
          alt="thumbnail"
          fill
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full bg-blackA5/60  absolute top-0 left-0 flex items-center justify-center">
          <FaPlayCircle fill="#fff" className="text-2xl" />
        </div>
      </div>
      <div className="px-4 py-1 flex flex-col justify-between h-full w-full overflow-hidden relative">
        <div className="">
          <p className="text-gray7 text-[13px] whitespace-nowrap overflow-ellipsis overflow-hidden">
            {title}
          </p>
          <h4 className="text-[13px] text-black dark:text-gray9  font-semibold leading-4">
            {lectureTitle}
          </h4>
        </div>
        <div className="flex items-center gap-1">
          <h4 className="text-gray11 text-[13px] ">Lecture</h4>
          <span className="dark:text-white">·</span>
          <p className="text-gray7 font-thin text-[13px]">
            {Math.round((duration - lengthWatched) / 60)} left
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[6px] dark:bg-gray4">
          <div
            className="h-full bg-violet11"
            style={{ width: `${(lengthWatched / duration) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
