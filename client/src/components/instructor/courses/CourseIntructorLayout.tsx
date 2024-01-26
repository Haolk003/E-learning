"use client";

import React, { useEffect, useState } from "react";
import { useGetMyCourseByIntructorQuery } from "@/features/course/courseApi";

import Link from "next/link";

import CourseList from "./CourseList";
import CourseTool from "./CourseTool";

import Loader from "@/components/loader/Loader";
const CourseIntructorLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const { data, isLoading, error, refetch, isFetching } =
    useGetMyCourseByIntructorQuery(
      {
        sort: sortOrder,
        keyword: searchTerm,
        limit: 20,
        page: 1,
      },
      { skip: false }
    );
  useEffect(() => {
    console.log(isFetching);
  }, [isFetching]);

  useEffect(() => {
    // Mỗi lần sortOrder hoặc searchTerm thay đổi, refetch data
    refetch();
  }, [sortOrder, searchTerm]);
  return (
    <div>
      {data && (
        <div className="">
          {data.data.countQuery > 0 ? (
            <div>
              <CourseTool
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setSortOrder={setSortOrder}
                sortOrder={sortOrder}
              />
              {isFetching ? (
                <div className="w-full h-full flex items-center justify-center mt-20">
                  <Loader />
                </div>
              ) : (
                <CourseList data={data.data.courses} />
              )}
            </div>
          ) : (
            <div>
              {searchTerm !== "" ? (
                <div>
                  <CourseTool
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setSortOrder={setSortOrder}
                    sortOrder={sortOrder}
                  />
                  <div className="text-xl font-semibold">
                    No results found for {searchTerm}
                  </div>
                </div>
              ) : (
                <div className="shadow-sm shadow-gray4 w-full flex items-center justify-between h-[200px] dark:bg-black bg-white px-5">
                  <h4 className="text-[18px]">Jump Into Course Creation</h4>
                  <Link
                    href="/instructor/create-course/step1"
                    className="bg-violet11 w-[200px] h-[45px] text-[17px] font-semibold text-white"
                  >
                    Create Your Course
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseIntructorLayout;
