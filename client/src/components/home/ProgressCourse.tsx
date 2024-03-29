"use client";

import React, { useEffect, useState } from "react";
import { useGetProgressCoursesUserQuery } from "@/features/course/courseApi";
import ProgressCard from "../card/ProgressCard";
import {
  ProgressDataLectureType,
  progressLectureProgressType,
} from "@/types/progressLectureUserType";
import VideoSnapshot from "video-snapshot";
import Link from "next/link";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const ProgressCourse = () => {
  const { data, isSuccess } = useGetProgressCoursesUserQuery("", {
    refetchOnMountOrArgChange: false,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      if (data && data.data.length > 0) {
        const fetchDataPromises = data.data.map(
          async (item: progressLectureProgressType) => {
            const checkLengthWatched = item.progress.find(
              (progress) =>
                progress.lectureId === item?.lastWatchedLecture?.lectureId
            );

            const response = await fetch(
              item.lastWatchedLecture
                ? item.lastWatchedLecture.lectureUrl
                : item.courseId.courseData[0].lectures[0].videoUrl.url
            );
            const blob = await response.blob();
            const snapshot = new VideoSnapshot(blob);
            const takeSnapshot = await snapshot.takeSnapshot(
              checkLengthWatched?.lengthWatched
            );

            const findDuration = item.courseId.courseData.find((course) =>
              course.lectures.some(
                (lecture) => lecture._id === item?.lastWatchedLecture?.lectureId
              )
            );

            return {
              takeSnapshot,
              duration: item.courseId.courseData[0].lectures[0].duration,
              lengthWatched: checkLengthWatched
                ? checkLengthWatched.lengthWatched
                : 0,
              lectureTitle: item.lastWatchedLecture
                ? item.lastWatchedLecture.lectureTitle
                : item.courseId.courseData[0].lectures[0].title,
              courseId: item.courseId._id,
              lectureId: item.lastWatchedLecture
                ? item.lastWatchedLecture.lectureId
                : item.courseId.courseData[0].lectures[0]._id,
              title: item.courseId.title,
            };
          }
        );

        const processedData = await Promise.all(fetchDataPromises);
        setProcessedData(processedData);
      }
    }

    fetchData();
  }, [data]);

  const [processedData, setProcessedData] = useState<any[]>([]);

  return (
    <>
      {isSuccess && processedData.length > 0 && (
        <div className="px-6 py-10 bg-mauve2 dark:bg-mauve12 text-mauve11 border-b dark:border-gray4 border-gray6">
          <h2 className="text-4xl  font-semibold dark:text-white  text-black mb-5">
            Let&apos;s start learning.
          </h2>
          <div className="grid grid-cols-3 gap-5 w-full relative">
            {processedData.slice(page - 1, page - 1 + 3).map((item, index) => (
              <Link
                href={`/course-access/${item.courseId}/lecture/${item.lectureId}`}
                key={index}
              >
                <ProgressCard
                  duration={item.duration}
                  lengthWatched={item.lengthWatched}
                  lectureTitle={item.lectureTitle}
                  thumbnail={item.takeSnapshot}
                  title={item.title}
                />
              </Link>
            ))}
            {processedData.length > page * 3 && (
              <button
                className="absolute -right-4 w-[50px] h-[50px] rounded-full bg-gray2 text-white top-[50%] -translate-y-[50%] flex items-center justify-center shadow-sm shadow-black"
                onClick={() => setPage(page + 1)}
              >
                <FaChevronRight />
              </button>
            )}
            {page > 1 && (
              <button
                className="absolute -left-4 w-[50px] h-[50px] rounded-full bg-gray2 text-white top-[50%] -translate-y-[50%] flex items-center justify-center shadow-sm shadow-black"
                onClick={() => setPage(page - 1)}
              >
                <FaChevronLeft />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressCourse;
