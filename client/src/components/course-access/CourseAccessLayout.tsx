"use client";

import React, { FC, useEffect, useState } from "react";
import * as Collapible from "@radix-ui/react-collapsible";
import { useSearchParams } from "next/navigation";
import {
  useGetpurchaserCourseQuery,
  useGetProgressLectureQuery,
} from "@/features/course/courseApi";
import {
  useGetNoteCourseQuery,
  useCreateNoteCourseMutation,
  useUpdateNoteCourseMutation,
  useDeleteNoteCourseMutation,
} from "@/features/noteCourse/noteCourseApi";

import CourseSuccessPlayer from "./CourseSuccessPlayer";

import CoureAccessLectureList from "./CoureAccessLectureList";

import Loader from "../loader/Loader";
import CourseAccessToolbar from "./CourseAccessToolbar";
import CourseAccessOverview from "./CourseAccessOverview";
import CourseAccessNote from "./CourseAccessNote";
import CourseAccessReview from "./CourseAccessReview";

type Props = {
  id: string;
  lectureId: string;
};

const CourseAccessLayout: FC<Props> = ({ id, lectureId }) => {
  const { data: notes, refetch } = useGetNoteCourseQuery(id);
  console.log(notes);
  const searchParams = useSearchParams();
  const { data, isLoading, isSuccess, error } = useGetpurchaserCourseQuery(id);
  const { data: progress } = useGetProgressLectureQuery(id);
  const [played, setPlayed] = useState(0);

  return (
    <div className="pt-[80px] flex">
      <div className="w-[calc(100%-350px)] overflow-hidden">
        {progress && notes && data && (
          <CourseSuccessPlayer
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
            notes={notes.data}
            refetch={refetch}
            courseData={data.data}
            played={played}
            courseId={id}
            lectureId={lectureId}
          />
        )}
        {data && searchParams.get("option") === "review" && (
          <CourseAccessReview courseId={id} courseData={data.data} />
        )}
      </div>
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
