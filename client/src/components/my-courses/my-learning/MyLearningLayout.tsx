"use client";

import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetProgressCoursesUserQuery } from "@/features/course/courseApi";

import MyLearningFilter from "./MyLearningFilter";
import CourseCardMyLearing from "@/components/card/CourseCardMyLearing";
import { progressCourseMylearning } from "@/types/progressLectureUserType";
import {
  useGetAllReviewUserIdQuery,
  useStarPercentageQuery,
} from "@/features/review/reviewApi";

import _ from "lodash";
const MyLearningLayout = () => {
  const searchParams = useSearchParams();
  const { data } = useGetProgressCoursesUserQuery("");

  const { data: reviews } = useGetAllReviewUserIdQuery("");

  const [categoriesData, setCategories] = useState<
    { label: string; value: string }[]
  >([{ label: "AllCategory", value: "all" }]);

  const [instructorData, setInstructorData] = useState<
    { label: string; value: string }[]
  >([{ label: "All Instructor", value: "all" }]);

  const [progressData, setProgressData] = useState<progressCourseMylearning[]>(
    []
  );

  useEffect(() => {
    if (data) {
      const sort = searchParams.get("sort") || "-updatedAt";
      const category = (
        searchParams.get("category") && searchParams.get("category") !== "all"
          ? searchParams.get("category")
          : ""
      ) as string;
      const instructor = (
        searchParams.get("instructor") &&
        searchParams.get("instructor") !== "all"
          ? searchParams.get("instructor")
          : ""
      ) as string;
      const progress = searchParams.get("progress");

      const filteredArr = data.data.filter((item: progressCourseMylearning) => {
        return (
          item.courseId.category._id.includes(category) &&
          item.courseId.author._id.includes(instructor)
        );
      }) as progressCourseMylearning[];

      const filteredArr2 = filteredArr.filter(
        (item: progressCourseMylearning) => {
          if (progress === "in-progress") {
            return item.progress.some(
              (progress) => progress.isCompleted === true
            );
          } else if (progress === "not-started") {
            return !item.progress.some(
              (progress) => progress.isCompleted === true
            );
          } else {
            return true;
          }
        }
      ) as progressCourseMylearning[];

      const newCategory = [{ label: "AllCategory", value: "all" }];
      const newIntructor = [{ label: "All Instructor", value: "all" }];

      if (category === "" && progress === "") {
        data.data.map((item: progressCourseMylearning, index: number) => {
          newIntructor.push({
            label:
              item.courseId.author.lastName + item.courseId.author.firstName,
            value: item.courseId.author._id,
          });
        }, []);
      } else {
        filteredArr2.map((item: progressCourseMylearning, index: number) => {
          newIntructor.push({
            label:
              item.courseId.author.lastName + item.courseId.author.firstName,
            value: item.courseId.author._id,
          });
        }, []);
      }
      if (instructor === "" && progress === "") {
        data.data.map((item: progressCourseMylearning, index: number) => {
          newCategory.push({
            label: item.courseId.category.name,
            value: item.courseId.category._id,
          });
        }, []);
      } else {
        filteredArr2.map((item: progressCourseMylearning, index: number) => {
          newCategory.push({
            label: item.courseId.category.name,
            value: item.courseId.category._id,
          });
        }, []);
      }

      const fomatArr = _.uniqBy(newCategory, "value");
      const fomatArrInstructor = _.uniqBy(newIntructor, "value");
      setInstructorData(fomatArrInstructor);
      setCategories(fomatArr);

      let fomattedSortData = _.sortBy(filteredArr2, [
        function (o) {
          return o.courseId.title.toLowerCase();
        },
      ]);
      if (sort === "title") {
        fomattedSortData = _.sortBy(filteredArr2, [
          function (o) {
            return o.courseId.title.toLowerCase();
          },
        ]);
      } else if (sort === "-title") {
        fomattedSortData = _.sortBy(filteredArr2, [
          function (o) {
            return o.courseId.title.toLowerCase();
          },
        ]).reverse();
      } else if (sort === "-createdAt") {
        fomattedSortData = _.sortBy(filteredArr2, [
          function (o) {
            return o.createdAt;
          },
        ]).reverse();
      } else {
        fomattedSortData = _.sortBy(filteredArr2, [
          function (o) {
            return o.updatedAt;
          },
        ]).reverse();
      }
      setProgressData(fomattedSortData);
    }
  }, [data, searchParams]);

  return (
    <div className="w-[70%] mx-auto">
      <MyLearningFilter
        categoriesData={categoriesData}
        instructorData={instructorData}
      />

      <div className="grid grid-cols-4 gap-5 mt-4">
        {progressData.length > 0 &&
          progressData.map((item: progressCourseMylearning, index: number) => {
            const totalLecture = item.courseId.courseData.reduce(
              (total, item) => {
                return total + item.lectures.length;
              },
              0
            );
            const totalProgressCompleted = item.progress.reduce(
              (total, progress) => {
                if (progress.isCompleted) {
                  return total + 1;
                } else {
                  return total;
                }
              },
              0
            );
            const percentCompleted = Math.round(
              (totalProgressCompleted / totalLecture) * 100
            );
            const checkReview = reviews.data.find(
              (review: any) => review.courseId === item.courseId._id
            );

            return (
              <CourseCardMyLearing
                _id=""
                author={
                  item.courseId.author.lastName + item.courseId.author.firstName
                }
                isRating={checkReview ? true : false}
                ratings={checkReview ? checkReview.rating : 0}
                percentCompleted={percentCompleted}
                thumbnail={item.courseId.thumbnail.url}
                title={item.courseId.title}
                key={item._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MyLearningLayout;
