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

type Props = {};

const ProgressCourse: React.FC<Props> = () => {
  const { data } = useGetProgressCoursesUserQuery("", {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    async function fetchData() {
      if (data && data.data.length > 0) {
        const fetchDataPromises = data.data.map(
          async (item: progressLectureProgressType) => {
            const checkLengthWatched = item.progress.find(
              (progress) =>
                progress.lectureId === item.lastWatchedLecture.lectureId
            );

            const response = await fetch(item.lastWatchedLecture.lectureUrl);
            const blob = await response.blob();
            const snapshot = new VideoSnapshot(blob);
            const takeSnapshot = await snapshot.takeSnapshot(
              checkLengthWatched?.lengthWatched
            );

            const findDuration = item.courseId.courseData.find((course) =>
              course.lectures.some(
                (lecture) => lecture._id === item.lastWatchedLecture.lectureId
              )
            );

            return {
              takeSnapshot,
              duration: findDuration ? findDuration?.duration : 0,
              lengthWatched: checkLengthWatched
                ? checkLengthWatched.lengthWatched
                : 0,
              lectureTitle: item.lastWatchedLecture.lectureTitle,
              courseId: item.courseId._id,
              lectureId: item.lastWatchedLecture.lectureId,
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
    <div className="px-6 py-10">
      <h2 className="text-4xl  font-semibold dark:text-white text-black mb-5">
        Let's start learning.
      </h2>
      <div className="grid grid-cols-3 gap-5 w-full">
        {processedData.map((item, index) => (
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
      </div>
    </div>
  );
};

export default ProgressCourse;
