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
import Link from "next/link";
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
      const search = searchParams.get("q") || "";
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
          item.courseId.author._id.includes(instructor) &&
          item.courseId.title.toLowerCase().includes(search.toLowerCase())
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
    <div className="md:w-[70%] w-full mx-auto">
      <MyLearningFilter
        categoriesData={categoriesData}
        instructorData={instructorData}
      />

      <div className="md:grid md:grid-cols-4 gap-5 mt-4 md:px-0 px-3 ">
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
            const checkReview = reviews
              ? reviews.data.find(
                  (review: any) => review.courseId === item.courseId._id
                )
              : null;

            return (
              <Link
                href={`/course-access/${item.courseId._id}/lecture/${
                  item?.lastWatchedLecture
                    ? item.lastWatchedLecture.lectureId
                    : item.courseId.courseData[0].lectures[0]._id
                }`}
              >
                <CourseCardMyLearing
                  _id={item.courseId._id}
                  author={
                    item.courseId.author.lastName +
                    item.courseId.author.firstName
                  }
                  isRating={checkReview ? true : false}
                  ratings={checkReview ? checkReview.rating : 0}
                  percentCompleted={percentCompleted}
                  thumbnail={item.courseId.thumbnail.url}
                  title={item.courseId.title}
                  key={item._id}
                />
              </Link>
            );
          })}
      </div>
      {progressData.length === 0 &&
        (!searchParams.get("q") ? (
          <p className="font-semibold text-2xl mt-4">
            You haven&apos;t registered for any of our courses
          </p>
        ) : (
          <p className="text-2xl font-semibold mt-4">
            Sorry, we could'nt find any result for &quot;{searchParams.get("q")}
            &quot;
          </p>
        ))}
    </div>
  );
};

export default MyLearningLayout;
