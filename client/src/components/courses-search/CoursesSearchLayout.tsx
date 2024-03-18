"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoFilterOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import { useGetAllCourseQuery } from "@/features/course/courseApi";
import CourseSearchFilter from "./CoursesSearchFilter";
import CourseSearchList from "./CoursesSearchList";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import { routeModule } from "next/dist/build/templates/app-page";

const CoursesSearchLayout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("-sold");
  const [page, setPage] = useState(1);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenFilterMobile, setIsOpenFilterMobile] = useState(false);
  const keyword = searchParams.get("q") as string;

  const level = searchParams.getAll("level");

  const ratings = searchParams.get("ratings")
    ? (searchParams.get("ratings") as string)
    : undefined;

  const price = searchParams.get("price")
    ? (searchParams.get("price") as string)
    : undefined;

  const [priceValue, setPriceValue] = useState(searchParams.get("price") || "");

  const [ratingsValue, setRatingsValue] = useState(
    searchParams.get("ratings") || ""
  );
  const [filtersLevel, setFiltersLevel] = useState<any>({
    all: level.find((item) => item === "all") ? true : false,
    beginner: level.find((item) => item === "beginner") ? true : false,
    intermediate: level.find((item) => item === "intermediate") ? true : false,
    expert: level.find((item) => item === "expert") ? true : false,
  });
  const { data, error, isLoading } = useGetAllCourseQuery(
    {
      keyword: keyword,
      sort,
      page,
      level,
      ratings,
      price,
    },
    { refetchOnMountOrArgChange: true }
  );

  const prevPage = () => {
    setPage(page > 1 ? page - 1 : page);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  const handleSelectPage = (page: number) => {
    setPage(page);
  };

  const clearAllFilter = () => {
    router.push(`/courses/search?q=${keyword}`);
    setRatingsValue("");
    setFiltersLevel({
      all: false,
      expert: false,
      intermediate: false,
      beginner: false,
    });
    setPriceValue("");
  };
  return (
    <div>
      <div>
        <h2 className="font-semibold text-2xl mb-5">
          1000 results for &quot;{searchParams.get("q")}&quot;
        </h2>
        <div className="flex items-center gap-3 w-[400px] justify-between">
          <div
            className=" hidden md:flex items-center justify-center gap-2 border h-[60px] w-[150px] dark:border-gray8 border-gray3"
            onClick={() => setIsOpenFilter(!isOpenFilter)}
          >
            <IoFilterOutline />
            <p className="font-semibold">Filter</p>
          </div>
          <Dialog.Root
            open={isOpenFilterMobile}
            onOpenChange={setIsOpenFilterMobile}
          >
            <Dialog.Trigger>
              <div className="md:hidden flex items-center justify-center gap-2 border h-[60px] w-[150px] dark:border-gray8 border-gray3">
                <IoFilterOutline />
                <p className="font-semibold">Filter</p>
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-blackA3 data-[state=open]:animate-overlayShow fixed inset-0 md:hidden block" />
              <Dialog.Close className="absolute right-[62%] top-6 text-[45px] dark:text-black text-white md:hidden block">
                <IoIosCloseCircle />
              </Dialog.Close>
              <Dialog.Content className="dark:bg-gray3 bg-white w-[60%] h-screen fixed top-0 right-0 z-[999] data-[state=open]:animate-slideLeftAndFade md:hidden block">
                <CourseSearchFilter
                  filtersLevel={filtersLevel}
                  priceValue={priceValue}
                  ratingsValue={ratingsValue}
                  setFilterLevel={setFiltersLevel}
                  setPriceValue={setPriceValue}
                  setRatingsValue={setRatingsValue}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

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
          {(level || ratings || price) && (
            <button
              className="flex items-center justify-center text-violet10 text-[13px] font-semibold w-[100px]"
              onClick={clearAllFilter}
            >
              Clear filter
            </button>
          )}
        </div>
      </div>
      <div
        className={`flex  ${
          isOpenFilter ? "md:flex-row" : "md:flex-col"
        } flex-col gap-5 mt-5 dark:text-white text-black`}
      >
        <div className="md:w-[400px]">
          {isOpenFilter && (
            <div className="w-[400px] mt-5 md:block hidden">
              <CourseSearchFilter
                filtersLevel={filtersLevel}
                priceValue={priceValue}
                ratingsValue={ratingsValue}
                setFilterLevel={setFiltersLevel}
                setPriceValue={setPriceValue}
                setRatingsValue={setRatingsValue}
              />
            </div>
          )}
        </div>
        <motion.div
          layout
          className={` ${
            isOpenFilter ? "md:w-[calc(100%-400px)]" : "w-full"
          } w-full`}
        >
          {data && <CourseSearchList courses={data.data.courses} />}
          {data && data.data.totalCount > 20 && (
            <div className="mt-3 text-white ">
              <Pagination
                color="secondary"
                variant="text"
                count={Math.ceil(data.data.totalCount / 20)}
                page={page}
                onChange={(e, page) => handleSelectPage(page)}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

type SelectItemType = {
  children: React.ReactNode;
  classname?: string;
  value: string;
};

const SelectItem = ({
  children,
  classname,
  value,
  ...props
}: SelectItemType) => {
  return (
    <Select.Item
      value={value}
      className={
        "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
      }
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};
export default CoursesSearchLayout;
