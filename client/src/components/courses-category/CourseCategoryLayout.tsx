"use client";

import React, { useEffect, useState } from "react";
import { useGetCoursesCategoryPublicQuery } from "@/features/course/courseApi";
import CourseCardCategory from "../card/CourseCardCategory";
import { CourseType } from "@/types/couresContentType";
import Loader from "../loader/Loader";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import CourseCategoryFilter from "./CourseCategoryFilter";
type Props = {
  categoryId: string;
  subCategoryId?: string;
};
const CourseCategoryLayout: React.FC<Props> = ({
  categoryId,
  subCategoryId,
}) => {
  const [sort, setSort] = useState("-sold");
  const [courseData, setCourseData] = useState<CourseType[]>([]);
  const [page, setPage] = useState(1);
  const [courseTotal, setCourseTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetCoursesCategoryPublicQuery({
    categoryId,
    subCategoryId,
    sort: sort,
    limit: 5,
    page,
  });
  const handleNextPage = () => {
    if (courseTotal > (currentPage - 1) * 4 + 5) {
      if (currentPage === page) {
        setPage(page + 1);
      }

      setCurrentPage((page) => page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setCurrentPage((page) => page - 1);
    }
  };
  useEffect(() => {
    if (data) {
      setCourseData((currentCourse) => [
        ...currentCourse,
        ...data.data.courses,
      ]);
      setCourseTotal(data.data.totalCount);
    }
  }, [data]);

  const handleChangeSort = (sort: string) => {
    setPage(1);
    setCurrentPage(1);
    setCourseData([]);
    setSort(sort);
  };
  return (
    <div className="text-black dark:text-white">
      {data && data.data.courses.length > 0 && (
        <h2 className="text-[35px] font-bold mb-7 md:mt-5 -mt-24">
          {subCategoryId
            ? data.data.courses[0].subCategory.name
            : data.data.courses[0].category.name}{" "}
          Courses
        </h2>
      )}
      <p className="text-[19px] font-bold">Courses to get you started</p>
      <div className="flex items-center gap-5 border-b-[2px] border-gray8 w-full">
        <div
          className={`py-2 ${
            sort === "-sold"
              ? "dark:text-white text-black border-b-[2px] border-white "
              : "dark:text-gray8 text-gray2 "
          }`}
          onClick={() => handleChangeSort("-sold")}
        >
          Most popular
        </div>
        <div
          className={`py-2 ${
            sort === "-createdAt"
              ? "dark:text-white text-black border-b-[2px] border-white "
              : "dark:text-gray8 text-gray2 cursor-pointer "
          } `}
          onClick={() => handleChangeSort("-createdAt")}
        >
          New
        </div>
      </div>

      <div className="md:grid grid-cols-5 flex overflow-x-auto  gap-5 mt-5 relative">
        {courseData &&
          courseData.length > 0 &&
          courseData
            .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 5)
            .map((item: CourseType) => {
              const totalLengthVideoSection = item.courseData.reduce(
                (total, item) => {
                  return total + item.videoLength;
                },
                0
              );
              return (
                <CourseCardCategory
                  key={item._id}
                  _id={item._id}
                  author={item.author.lastName + " " + item.author.firstName}
                  benefits={item.benefits}
                  price={item.price}
                  ratings={item.ratings}
                  thumbnail={item.thumbnail.url}
                  title={item.title}
                  totalRating={item.reviews.length || 0}
                  updatedAt={item.updatedAt}
                  description={item.description}
                  level={item.level}
                  totalVideoLength={Math.ceil(totalLengthVideoSection / 3600)}
                />
              );
            })}
        {currentPage > 1 && (
          <button
            className="absolute -left-[20px] top-[55px] w-[40px] h-[40px] rounded-full text-white bg-black flex items-center justify-center text-xl"
            onClick={handlePrevPage}
          >
            <MdOutlineNavigateBefore color="#fff" />
          </button>
        )}
        {courseTotal > (currentPage - 1) * 4 + 5 && (
          <button
            className="absolute -right-[20px] top-[55px] w-[40px] h-[40px] rounded-full text-white bg-black flex items-center justify-center text-xl"
            onClick={() => handleNextPage()}
          >
            <MdOutlineNavigateNext color="#fff" />
          </button>
        )}
      </div>
      {data && (
        <div className="mt-10">
          <h2 className="text-[35px] font-bold mb-7 mt-5 ">
            All{" "}
            {subCategoryId
              ? data.data.courses[0].subCategory.name
              : data.data.courses[0].category.name}{" "}
            Courses
          </h2>
          <CourseCategoryFilter
            categoryId={categoryId}
            subCategoryId={subCategoryId}
          />
        </div>
      )}

      {isLoading && (
        <div className="fixed w-full h-screen left-0 top-0 bg-blackA5 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CourseCategoryLayout;
