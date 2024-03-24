"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetpurchaserCourseQuery,
  useGetProgressLectureQuery,
} from "@/features/course/courseApi";
import { useGetNoteCourseQuery } from "@/features/noteCourse/noteCourseApi";

import CourseSuccessPlayer from "./CourseSuccessPlayer";

import CoureAccessLectureList from "./CoureAccessLectureList";

import Loader from "../loader/Loader";
import CourseAccessToolbar from "./CourseAccessToolbar";
import CourseAccessOverview from "./CourseAccessOverview";
import CourseAccessNote from "./CourseAccessNote";
import CourseAccessReview from "./CourseAccessReview";
import CourseAccessHeader from "./CourseAccessHeader";
import { ProgressDataLectureType } from "@/types/progressLectureUserType";
import { CourseContentType } from "@/types/couresContentType";
import ReactPlayer from "react-player";

type Props = {
  id: string;
  lectureId: string;
};

const CourseAccessLayout: FC<Props> = ({ id, lectureId }) => {
  const { data: notes, refetch } = useGetNoteCourseQuery(id);
  const playerRef = useRef<ReactPlayer>(null);
  const searchParams = useSearchParams();
  const { data, isLoading, isSuccess, error } = useGetpurchaserCourseQuery(id);
  const { data: progress } = useGetProgressLectureQuery(id);
  const [played, setPlayed] = useState(0);
  const [reload, setReload] = useState(false);
  const totalProgressCompleted = progress
    ? progress.data.progress.reduce(
        (total: number, progress: ProgressDataLectureType) => {
          if (progress.isCompleted) {
            return total + 1;
          } else {
            return total;
          }
        },
        0
      )
    : 0;

  const totalLecture = data
    ? data.data.courseData.reduce(
        (total: number, courseData: CourseContentType) => {
          return total + courseData.lectures.length;
        },
        0
      )
    : 0;
  const triggerReload = () => setReload((prev) => !prev);
  return (
    <div>
      {data && (
        <CourseAccessHeader
          courseId={id}
          courseTitle={data.data.title}
          totalLecture={totalLecture}
          totalProgressComplete={totalProgressCompleted}
        />
      )}
      <div className="md:flex">
        <div className="md:w-[calc(100%-350px)]  w-full overflow-hidden">
          {progress && notes && data && (
            <CourseSuccessPlayer
              reload={reload}
              played={played}
              setPlayed={setPlayed}
              courseId={id}
              lectureData={data.data.courseData}
              lectureId={lectureId}
              progressVideo={progress.data}
              notes={notes.data}
            />
          )}

          {progress && data && (
            <CourseAccessToolbar courseId={id} lectureId={lectureId} />
          )}
          {data &&
            (searchParams.get("option") === "overview" ||
              !searchParams.get("option")) && (
              <CourseAccessOverview courseData={data.data} />
            )}
          {data && notes.data && searchParams.get("option") === "note" && (
            <CourseAccessNote
              triggleReload={triggerReload}
              notes={notes.data}
              refetch={refetch}
              courseData={data.data}
              played={played}
              courseId={id}
              lectureId={lectureId}
            />
          )}
          <div className="md:hidden block">
            {data && searchParams.get("option") === "course-content" && (
              <CoureAccessLectureList
                lectureId={lectureId}
                progressData={progress.data}
                courseId={id}
                courseContentData={data.data.courseData}
              />
            )}
          </div>
          {data && searchParams.get("option") === "review" && (
            <CourseAccessReview courseId={id} courseData={data.data} />
          )}
        </div>
        <div className="md:block hidden">
          {data && progress && (
            <CoureAccessLectureList
              lectureId={lectureId}
              progressData={progress.data}
              courseId={id}
              courseContentData={data.data.courseData}
            />
          )}
        </div>

        {isLoading && (
          <div className="bg-blackA7 absolute w-full h-full flex items-center justify-center left-0 top-0">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAccessLayout;
