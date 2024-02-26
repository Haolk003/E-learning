"use client";

import React, { useEffect, useState } from "react";
import { useGetCoursesCategoryPublicQuery } from "@/features/course/courseApi";
import { useStarPercentageQuery } from "@/features/review/reviewApi";
import CourseCardCategory from "../card/CourseCardCategory";
import { CourseType } from "@/types/couresContentType";
type Props = {
  categoryId: string;
  subCategoryId?: string;
};
const CourseCategoryLayout: React.FC<Props> = ({
  categoryId,
  subCategoryId,
}) => {
  const { data } = useGetCoursesCategoryPublicQuery({
    categoryId,
    subCategoryId,
  });
  const [sort, setSort] = useState("most-popular");
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {data && data.data.length > 0 && (
        <h2 className="text-[25px] font-bold">
          {subCategoryId
            ? data.data[0].subCategory.name
            : data.data[0].category.name}{" "}
          Courses
        </h2>
      )}
      <p className="text-[19px] font-bold">Courses to get you started</p>
      <div className="flex items-center gap-5 border-b-[2px] border-gray8 w-full">
        <div
          className={`py-2 ${
            sort === "most-popular"
              ? "dark:text-white text-black border-b-[2px] border-white "
              : "dark:text-gray8 text-gray2 "
          }`}
        >
          Most popular
        </div>
        <div className="py-2">New</div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {data &&
          data.data.map((item: CourseType, index: number) => {
            return (
              <CourseCardCategory
                key={item._id}
                _id={item._id}
                author={item.author.lastName + item.author.firstName}
                benefits={item.benefits}
                price={item.price}
                ratings={item.ratings}
                thumbnail={item.thumbnail.url}
                title={item.title}
                totalRating={item.reviews.length || 0}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CourseCategoryLayout;
