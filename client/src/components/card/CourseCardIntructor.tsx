import React from "react";
import Image from "next/image";
import Link from "next/link";
type Props = {
  title: string;
  image: string;
  status: string;
  progress: number;
  _id: string;
};
const CourseCardIntructor: React.FC<Props> = ({
  _id,
  image,
  progress,
  status,
  title,
}) => {
  return (
    <div className="border border-gray10 shadow-sm shadow-gray10 flex items-center  h-[150px] dark:text-white text-black">
      <Image src={image} alt="" width={150} height={150} className="" />
      <div className="flex items-center justify-between w-full h-full relative px-5 group">
        <div className="flex flex-col justify-between py-3 h-full">
          <h4 className="text-xl font-semibold capitalize">{title}</h4>
          <p className="font-thin text-[14px] capitalize">{status}</p>
        </div>

        <div className=" md:flex hidden items-center gap-3">
          <p>Finish your course</p>
          <div
            className={`w-[500px] dark:bg-gray8 h-[5px] relative after:content-[""] after:absolute after:left-0 after:top-0 after:h-full after:w-[${progress}%] after:bg-violet11 `}
          >
            <span
              className=" absolute left-0 top-0 h-full  bg-violet11 "
              style={{ width: `${progress}%` }}
            ></span>
          </div>
        </div>
        <Link
          href={`/instructor/create-course/step1/${_id}`}
          className="absolute top-0 left-0 w-full h-full cursor-pointer group-hover:flex items-center justify-center dark:bg-blackA7/80 hidden transition-all duration-200 "
        >
          <p className="text-violet10 text-2xl ">Edit / manage course</p>
        </Link>
      </div>
    </div>
  );
};

export default CourseCardIntructor;
