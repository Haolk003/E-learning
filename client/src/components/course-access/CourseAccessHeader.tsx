"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import CircularProgress, {
  CircularProgressProps,
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { IoSad, IoStar } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import CreateReview from "./CreateReview";
import { useCheckExistReviewPersonalQuery } from "@/features/review/reviewApi";
type Props = {
  courseTitle: string;
  courseId: string;
  totalLecture: number;
  totalProgressComplete: number;
};
const CourseAccessHeader: React.FC<Props> = ({
  courseId,
  courseTitle,
  totalLecture,
  totalProgressComplete,
}) => {
  const { isLoading, data, refetch } =
    useCheckExistReviewPersonalQuery(courseId);

  const [isOpenCreateRating, setIsOpenCreateRating] = useState(false);
  return (
    <div className="w-screen fixed top-0 left-0 dark:text-white text-black z-50">
      <div className="dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
        <div className="w-[90%] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center md:gap-3 gap-1">
            <Link href="/" className="flex items-center ">
              <Image src="/assets/logo2.png" alt="" width={80} height={80} />
              <h2 className="md:block hidden text-2xl font-semibold ">
                Elearning
              </h2>
            </Link>
            <div className="w-[1px] h-[30px] bg-gray8 "></div>
            <h2 className="text-[14px] dark:text-white text-black md:max-w-[500px] overflow-hidden whitespace-nowrap overflow-ellipsis ">
              {courseTitle}
            </h2>
          </div>
          <div className="flex items-center gap-6 ">
            {data && !data.data && (
              <div
                className="flex items-center gap-2"
                onClick={() => setIsOpenCreateRating(true)}
              >
                <IoStar className="md:block hidden" />
                <p className="text-[13px]">Leave a rating</p>
              </div>
            )}
            <Popover.Root>
              <Popover.Trigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex md:flex-row flex-col-reverse items-center">
                    <div className="relative">
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        sx={{
                          color: (theme) => theme.palette.grey[800],
                        }}
                        thickness={3}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={(totalProgressComplete / totalLecture) * 100}
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === "light"
                              ? "#1a90ff"
                              : "#308fe8",
                          animationDuration: "550ms",
                          position: "absolute",
                          left: 0,
                          [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: "round",
                          },
                        }}
                        thickness={3}
                      />
                    </div>
                    <p className="md:block hidden">Your progress</p>
                  </div>
                  <IoChevronDownOutline />
                </div>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="rounded p-5 w-[260px] z-[999]  bg-blackA10 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade text-center">
                  {totalProgressComplete} of {totalLecture} complete
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </div>
      <CreateReview
        refetch={refetch}
        courseId={courseId}
        isOpenModal={isOpenCreateRating}
        setIsOpenModal={setIsOpenCreateRating}
      />
    </div>
  );
};

export default CourseAccessHeader;
