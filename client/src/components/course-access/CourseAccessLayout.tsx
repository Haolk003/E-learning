"use client";

import React, { FC, useEffect } from "react";
import { useGetpurchaserCourseQuery } from "@/features/course/courseApi";
import CourseSuccessPlayer from "../ui/CourseSuccessPlayer";

type Props = {
  id: string;
};

const CourseAccessLayout: FC<Props> = ({ id }) => {
  const { data, isLoading, isSuccess, error } = useGetpurchaserCourseQuery(id);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="pt-[100px]">
      <CourseSuccessPlayer />
    </div>
  );
};

export default CourseAccessLayout;
