"use client";

import React, { useEffect, useState } from "react";
import CoureCardItem from "../card/CoureCardItem";
import { useGetAllCourseQuery } from "@/features/course/courseApi";
import { CourseType } from "@/types/couresContentType";
const CoursesHome = () => {
  const { data, error, isSuccess, isLoading } = useGetAllCourseQuery({
    keyword: "",
    page: 1,
    limit: 20,
    sort: "-sold",
  });
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      console.log(data);
      const course = data.data.courses as CourseType[];
      setCourses(
        course.map((item, index) => {
          return {
            _id: item._id,
            estimatePrice: item.price / 20,
            image: item.thumbnail.url,
            title: item.title,
            star: 4,
            lectureLength: 10,
            price: item.price,
            sold: 3,
          };
        })
      );
    }
  }, [data]);
  return (
    <div className="bg-gray4 w-full py-10 px-10">
      <div className="flex flex-col items-center ">
        <span className="uppercase text-cyan-300 relative text-center text-[13px] before:content-[' '] before:absolute before:right-0  before:-top-0 before:to-cyan-300/50 before:bg-gradient-to-l before:from-cyan-300/10  before:w-[50px] before:h-[3px] before:rounded-2xl tracking-wide ">
          COURSES
        </span>
        <p className="text-white text-[17px]">
          Unlock Your Protential with Comprehensive Project-Based Courses for
          Career Growth
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 w-[80%] mx-auto mt-4">
        {courses.map((item, index) => {
          return <CoureCardItem {...item} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default CoursesHome;
