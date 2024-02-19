"use client";

import React, { useEffect, useState } from "react";
import { useGetProgressCoursesUserQuery } from "@/features/course/courseApi";
import ProgressCard from "../card/ProgressCard";
import { progressLectureProgressType } from "@/types/progressLectureUserType";
import VideoSnapshot from "video-snapshot";
import Link from "next/link";
type Props = {};
const ProgressCourse: React.FC<Props> = () => {
  const { data } = useGetProgressCoursesUserQuery("");

  console.log(data);
  useEffect(() => {
    if (data) {
      const progress = data.data as progressLectureProgressType[];

      const newData = progress.map((item, index) => {
        return {
          courseTitle: item.courseId.title,
        };
      });
    }
  }, [data]);
  return (
    <div className="px-6 py-10">
      <h2 className="text-4xl  font-semibold dark:text-white text-black mb-5">
        Let's start learning.
      </h2>
      <div className="grid grid-cols-3 gap-5 w-full">
        {data &&
          data.data.map(
            async (item: progressLectureProgressType, index: number) => {
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

              const findDuration = item.courseId.courseData.map(
                (course, index) => {
                  const lectureExists = course.lectures.find(
                    (lecture) =>
                      lecture._id === item.lastWatchedLecture.lectureId
                  );
                  if (lectureExists) {
                    return lectureExists;
                  }
                }
              );

              return (
                <Link
                  href={`/course-access/${item.courseId._id}/lecture/${item.lastWatchedLecture.lectureId}`}
                  className=""
                >
                  <ProgressCard
                    duration={findDuration[0] ? findDuration[0].duration : 0}
                    lengthWatched={
                      checkLengthWatched ? checkLengthWatched.lengthWatched : 0
                    }
                    lectureTitle={item.lastWatchedLecture.lectureTitle}
                    thumbnail={takeSnapshot}
                    title={item.courseId.title}
                  />
                </Link>
              );
            }
          )}
      </div>
    </div>
  );
};

export default ProgressCourse;
