"use client";

import React, { FC, useEffect, useState } from "react";
import * as Collapible from "@radix-ui/react-collapsible";
import {
  useGetpurchaserCourseQuery,
  useGetProgressLectureQuery,
} from "@/features/course/courseApi";
import CourseSuccessPlayer from "./CourseSuccessPlayer";
import { IoMdClose } from "react-icons/io";
import CoureAccessLectureList from "./CoureAccessLectureList";
import {
  progressLectureProgressType,
  ProgressDataLectureType,
} from "@/types/progressLectureUserType";
import Loader from "../loader/Loader";

type Props = {
  id: string;
  lectureId: string;
};

const CourseAccessLayout: FC<Props> = ({ id, lectureId }) => {
  const { data, isLoading, isSuccess, error } = useGetpurchaserCourseQuery(id);
  const { data: progress } = useGetProgressLectureQuery(id);

  return (
    <div className="pt-[80px] flex">
      {progress && data && (
        <CourseSuccessPlayer
          courseId={id}
          lectureData={data.data.courseData}
          lectureId={lectureId}
          progressVideo={progress.data}
        />
      )}

      {data && progress && (
        <CoureAccessLectureList
          lectureId={lectureId}
          progressData={progress.data}
          courseId={id}
          courseContentData={data.data.courseData}
        />
      )}
      {isLoading && (
        <div className="bg-blackA7 absolute w-full h-full flex items-center justify-center left-0 top-0">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CourseAccessLayout;
