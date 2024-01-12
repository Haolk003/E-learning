import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetAllCategoryQuery } from "@/features/category/categoryApi";

import { CategoryType } from "@/types/categoryType";
import dompurify from "dompurify";

const Categories = () => {
  const { data, isLoading, isSuccess, error } = useGetAllCategoryQuery("");
  const [categoryData, setCategoryData] = useState<CategoryType[] | null>(null);

  useEffect(() => {
    if (error && "data" in error) {
      const errorMessage = error.data as any;

      toast.error(errorMessage.message);
    }
  }, [error]);
  console.log(data);

  useEffect(() => {
    if (data) {
      setCategoryData(data.data);
    }
  }, [data]);
  return (
    <div className="bg-gray2 rounded-md w-[60%] mt-4">
      <div className="flex items-center justify-between px-4 border-b dark:border-gray9 border-gray4 py-3  ">
        <h3 className="headingAdmin !text-[13px]">Top Categories</h3>
        <button className="bg-gray8 text-[11px] px-1 py-0.5 rounded-sm border border-gray10">
          View All
        </button>
      </div>
      <div className="px-3 py-4 grid lg:grid-cols-4 gap-4 w-full">
        {categoryData &&
          categoryData.slice(0, 4).map((item, index) => (
            <div
              className=" border dark:border-gray8 borer-gray3 rounded-md flex items-center justify-center flex-col py-4 text-[12px] text-center gap-3"
              key={item._id}
            >
              <div
                className={`${index === 0 && "fill-violet-500"} ${
                  index === 3 && "fill-amber-900"
                }  ${
                  index === 1 && "fill-green-600"
                } fill-blue9 w-[40px] h-[40px]`}
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(item.icon),
                }}
              ></div>
              <p>{item.name}</p>
              <span className="text-gray10 text-[11px]">
                {item.courseCount}+ Course
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
