"use client";

import React, { useEffect, useState } from "react";
import CoureCardItem from "../card/CoureCardItem";
import {
  useGetAllCourseQuery,
  useGetNewCoursesHomeQuery,
  useGetPopularCoursesHomeQuery,
  useGetOverratedCoursesHomeQuery,
} from "@/features/course/courseApi";
import { CourseType } from "@/types/couresContentType";
const CoursesHome = () => {
  const { data, error, isSuccess, isLoading } = useGetAllCourseQuery({
    keyword: "",
    page: 1,
    limit: 20,
    sort: "-sold",
  });

  const { data: coursesOverrated } = useGetOverratedCoursesHomeQuery("");
  const { data: coursePopular } = useGetPopularCoursesHomeQuery("");
  const { data: courseNew } = useGetNewCoursesHomeQuery("");

  const [courseDataOverrated, setCourseDataOverrated] = useState<CourseType[]>(
    []
  );
  const [courseDataNew, setCoursesDataNew] = useState([]);

  const [courseDataPopular, setCourseDataPopular] = useState<CourseType[]>([]);

  useEffect(() => {
    if (courseNew) {
      setCoursesDataNew(courseNew.data);
    }
  }, [courseNew]);

  useEffect(() => {
    if (coursesOverrated) {
      setCourseDataOverrated(coursesOverrated.data);
    }
  }, [coursesOverrated]);

  useEffect(() => {
    if (coursePopular) {
      setCourseDataPopular(coursePopular.data);
    }
  }, [coursePopular]);

  return (
    <div>
      {/* new courses */}
      <div className="bg-gray4 w-full py-10 px-10">
        <div className="flex flex-col items-center ">
          <span className="uppercase text-cyan-300 relative text-center text-[13px] before:content-[' '] before:absolute before:right-0  before:-top-0 before:to-cyan-300/50 before:bg-gradient-to-l before:from-cyan-300/10  before:w-[50px] before:h-[3px] before:rounded-2xl tracking-wide ">
            NEW COURSES
          </span>
          <p className="text-white text-[17px]">
            Unlock Your Protential with Comprehensive Project-Based Courses for
            Career Growth
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 w-[90%] mx-auto mt-4">
          {courseDataNew &&
            courseDataNew.map((item: CourseType, index: number) => {
              const lectureLenght = item.courseData.reduce((total, lecure) => {
                return total + lecure.lectures.length;
              }, 0);
              return (
                <CoureCardItem
                  _id={item._id}
                  benefits={item.benefits}
                  description={item.description}
                  estimatePrice={item.price}
                  image={item.thumbnail.url}
                  lectureLength={lectureLenght}
                  level={item.level}
                  price={item.price}
                  sold={item.sold}
                  star={item.ratings}
                  title={item.title}
                  totalVideoLength={20}
                  updatedAt={item.updatedAt}
                  key={item._id}
                />
              );
            })}
        </div>
      </div>
      {/* popular courses */}
      <div className="bg-gray4 w-full py-10 px-10">
        <div className="flex flex-col items-center ">
          <span className="uppercase text-cyan-300 relative text-center text-[13px] before:content-[' '] before:absolute before:right-0  before:-top-0 before:to-cyan-300/50 before:bg-gradient-to-l before:from-cyan-300/10  before:w-[50px] before:h-[3px] before:rounded-2xl tracking-wide ">
            Popular COURSES
          </span>
          <p className="text-white text-[17px]">
            Unlock Your Protential with Comprehensive Project-Based Courses for
            Career Growth
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 w-[90%] mx-auto mt-4">
          {courseDataPopular &&
            courseDataPopular.map((item: CourseType, index: number) => {
              const lectureLenght = item.courseData.reduce((total, lecure) => {
                return total + lecure.lectures.length;
              }, 0);
              return (
                <CoureCardItem
                  _id={item._id}
                  benefits={item.benefits}
                  description={item.description}
                  estimatePrice={item.price}
                  image={item.thumbnail.url}
                  lectureLength={lectureLenght}
                  level={item.level}
                  price={item.price}
                  sold={item.sold}
                  star={item.ratings}
                  title={item.title}
                  totalVideoLength={20}
                  updatedAt={item.updatedAt}
                  key={item._id}
                />
              );
            })}
        </div>
      </div>
      {/* overrated courses */}
      <div className="bg-gray4 w-full py-10 px-10">
        <div className="flex flex-col items-center ">
          <span className="uppercase text-cyan-300 relative text-center text-[13px] before:content-[' '] before:absolute before:right-0  before:-top-0 before:to-cyan-300/50 before:bg-gradient-to-l before:from-cyan-300/10  before:w-[50px] before:h-[3px] before:rounded-2xl tracking-wide ">
            OVERRATED COURSES
          </span>
          <p className="text-white text-[17px]">
            Unlock Your Protential with Comprehensive Project-Based Courses for
            Career Growth
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 w-[90%] mx-auto mt-4">
          {courseDataOverrated &&
            courseDataOverrated.map((item: CourseType, index: number) => {
              const lectureLenght = item.courseData.reduce((total, lecure) => {
                return total + lecure.lectures.length;
              }, 0);
              return (
                <CoureCardItem
                  _id={item._id}
                  benefits={item.benefits}
                  description={item.description}
                  estimatePrice={item.price}
                  image={item.thumbnail.url}
                  lectureLength={lectureLenght}
                  level={item.level}
                  price={item.price}
                  sold={item.sold}
                  star={item.ratings}
                  title={item.title}
                  totalVideoLength={20}
                  updatedAt={item.updatedAt}
                  key={item._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CoursesHome;
