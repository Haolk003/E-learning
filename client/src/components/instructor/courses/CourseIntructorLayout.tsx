"use client";

import React from "react";
import { useGetMyCourseByIntructorQuery } from "@/features/course/courseApi";
const CourseIntructorLayout = () => {
  const { data, isLoading, error } = useGetMyCourseByIntructorQuery({
    sort: "",
    keyword: "",
    limit: 20,
    page: 1,
  });
  console.log(data);
  return (
    <div>
      {data && (
        <div className="">
          {data.data.countQuery > 0 ? (
            <div></div>
          ) : (
            <div className="shadow-sm shadow-gray4 w-full flex items-center justify-between h-[200px] dark:bg-black bg-white px-5">
              <h4 className="text-[18px]">Jump Into Course Creation</h4>
              <button className="bg-violet11 w-[200px] h-[45px] text-[17px] font-semibold text-white">
                Create Your Course
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseIntructorLayout;
