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
import { useAppSelector } from "@/store/hook";
import LoadingCourseCardHome from "../ui/loading-skeletion/LoadingCourseCardHome";
const CoursesHome = () => {
  const user = useAppSelector((state) => state.auth.user);

  const {
    data: coursesOverrated,
    refetch: refetchCourseOverrated,
    isLoading: isLoadingCourseOverrated,
  } = useGetOverratedCoursesHomeQuery("");
  const {
    data: coursePopular,
    refetch: refetchCoursePopular,
    isLoading: isLoadingPopular,
  } = useGetPopularCoursesHomeQuery("");
  const {
    data: courseNew,
    refetch: refetchCourseNew,
    isLoading: isLoadingNew,
  } = useGetNewCoursesHomeQuery("");

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
  useEffect(() => {
    refetchCourseNew();
    refetchCourseOverrated();
    refetchCoursePopular();
  }, [user]);
  return (
    <div>
      {/* new courses */}
      <div className="dark:bg-gray4 bg-mauve2 w-full py-10 px-10">
        <div className="flex flex-col items-center ">
          <span className="uppercase dark:text-cyan-300 text-cyan-900 font-semibold relative text-center text-[15px] before:content-[' '] before:absolute before:right-0  before:-top-0 dark:before:to-cyan-300/50 before:bg-gradient-to-l before:from-cyan-800/10  before:w-[50px] before:h-[3px] before:to-cyan-800/50 dark:before:bg-gradient-to-l dark:before:from-cyan-300/10 before:rounded-2xl tracking-wide ">
            NEW COURSES
          </span>
          <p className="dark:text-white text-mave11  text-[17px]">
            Unlock Your Protential with Comprehensive Project-Based Courses for
            Career Growth
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 w-[90%] mx-auto mt-4">
          {!isLoadingNew &&
            courseDataNew &&
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

          {isLoadingNew && <LoadingCourseCardHome />}
          {isLoadingNew && <LoadingCourseCardHome />}
          {isLoadingNew && <LoadingCourseCardHome />}
          {isLoadingNew && <LoadingCourseCardHome />}
        </div>
      </div>
      {/* popular courses */}
      <div className="dark:bg-gray4 bg-mauve2 w-full py-10 px-10">
        <div className="flex flex-col items-center ">
          <span className="uppercase dark:text-cyan-300 text-cyan-900 font-semibold relative text-center text-[15px] before:content-[' '] before:absolute before:right-0  before:-top-0 dark:before:to-cyan-300/50 before:bg-gradient-to-l before:from-cyan-800/10  before:w-[50px] before:h-[3px] before:to-cyan-800/50 dark:before:bg-gradient-to-l dark:before:from-cyan-300/10 before:rounded-2xl tracking-wide ">
            Popular COURSES
          </span>
          <p className="dark:text-white text-mave11  text-[17px]">
            Unlock Your Protential with Comprehensive Project-Based Courses for
            Career Growth
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 w-[90%] mx-auto mt-4">
          {!isLoadingPopular &&
            courseDataPopular &&
            courseDataPopular.map((item: CourseType) => {
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
          {isLoadingPopular && <LoadingCourseCardHome />}
          {isLoadingPopular && <LoadingCourseCardHome />}
          {isLoadingPopular && <LoadingCourseCardHome />}
          {isLoadingPopular && <LoadingCourseCardHome />}
        </div>
      </div>
      {/* overrated courses */}
      <div className="dark:bg-gray4 bg-mauve2 w-full py-10 px-10">
        <div className="flex flex-col items-center ">
          <span className="uppercase dark:text-cyan-300 text-cyan-900 font-semibold relative text-center text-[15px] before:content-[' '] before:absolute before:right-0  before:-top-0 dark:before:to-cyan-300/50 before:bg-gradient-to-l before:from-cyan-800/10  before:w-[50px] before:h-[3px] before:to-cyan-800/50 dark:before:bg-gradient-to-l dark:before:from-cyan-300/10 before:rounded-2xl tracking-wide ">
            OVERRATED COURSES
          </span>
          <p className="dark:text-white text-mave11 text-[17px]">
            Unlock Your Protential with Comprehensive Project-Based Courses for
            Career Growth
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 w-[90%] mx-auto mt-4">
          {!isLoadingCourseOverrated &&
            courseDataOverrated &&
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

          {isLoadingCourseOverrated && <LoadingCourseCardHome />}
          {isLoadingCourseOverrated && <LoadingCourseCardHome />}
          {isLoadingCourseOverrated && <LoadingCourseCardHome />}
          {isLoadingCourseOverrated && <LoadingCourseCardHome />}
        </div>
      </div>
    </div>
  );
};

export default CoursesHome;
