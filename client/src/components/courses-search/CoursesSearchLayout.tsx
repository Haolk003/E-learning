"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoFilterOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import * as Select from "@radix-ui/react-select";

import { useGetAllCourseQuery } from "@/features/course/courseApi";
import CourseSearchFilter from "./CoursesSearchFilter";
import CourseSearchList from "./CoursesSearchList";
import TableNavigation from "../ui/table/TableNavigation";
import { Pagination } from "@mui/material";
const CoursesSearchLayout = () => {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("-sold");
  const [page, setPage] = useState(1);
  const keyword = searchParams.get("q");

  const level = searchParams.get("level") ? searchParams.getAll("level") : "";
  const ratings = searchParams.get("ratings")
    ? searchParams.get("ratings")
    : "";

  const price = searchParams.get("price") ? searchParams.get("price") : "";

  const { data, error, isLoading } = useGetAllCourseQuery({
    keyword: keyword,
    sort,
    page,
    level,
    ratings,
    price,
  });

  const prevPage = () => {
    setPage(page > 1 ? page - 1 : page);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const handleSelectPage = (page: number) => {
    setPage(page);
  };
  console.log(data);
  return (
    <div className="flex gap-5 mt-5">
      <div className="w-[400px]">
        <h2 className="font-semibold text-2xl mb-5">
          1000 results for &quot;development&quot;
        </h2>
        <div className="flex items-center gap-3 w-[400px] justify-between">
          <div className="flex items-center justify-center gap-2 border h-[60px] w-[150px] dark:border-gray8 border-gray3">
            <IoFilterOutline />
            <p className="font-semibold">Filter</p>
          </div>
          <div className="">
            <Select.Root value={sort} onValueChange={setSort}>
              <Select.Trigger
                className="inline-flex items-center justify-between rounded px-[15px] text-[17px] leading-none w-[200px] h-[60px] gap-[5px] dark:border-violet11 border text-violet11   focus:shadow-[0_0_0_2px]  dark:text-white data-[placeholder]:text-violet9 outline-none"
                aria-label="sort"
              >
                <div className="flex flex-col h-full items-start  justify-center gap-2">
                  <p className="text-[13px] font-semibold">Sort by</p>
                  <Select.Value placeholder="Select a sort" className="" />
                </div>
                <Select.Icon>
                  <IoChevronDownOutline />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                  <Select.Viewport className="p-[5px]">
                    <SelectItem value="-reviews">Most Reviewed</SelectItem>
                    <SelectItem value="-sold">Most Relevant</SelectItem>
                    <SelectItem value="-ratings">Highest Rated</SelectItem>
                    <SelectItem value="-createdAt">Newest</SelectItem>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>
        <div className="w-[400px] mt-5">
          <CourseSearchFilter />
        </div>
      </div>
      <div className="w-[calc(100%-400px)]">
        {data && <CourseSearchList courses={data.data.courses} />}
        {data && (
          <div className="mt-3 text-white bg-white">
            <Pagination
              color="secondary"
              variant="text"
              count={Math.ceil(data.data.totalCount / 20)}
              page={page}
              onChange={(e, page) => handleSelectPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

type SelectItemType = {
  children: React.ReactNode;
  classname?: string;
  value: string;
};

const SelectItem = (
  { children, classname, value, ...props }: SelectItemType,
  forwardedRef: React.ForwardedRef<React.ElementRef<typeof Select.Item>>
) => {
  return (
    <Select.Item
      value={value}
      className={
        "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
      }
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};
export default CoursesSearchLayout;
