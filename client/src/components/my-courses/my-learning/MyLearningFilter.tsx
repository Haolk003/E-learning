import React, { useState } from "react";
import SelectFilterMyCourses from "@/components/ui/select/SelectFilterMyCourse";
import { IoIosSearch } from "react-icons/io";
const sortData = [
  {
    name: "Recently Accessed",
    value: "-accessed",
  },
  {
    name: "Recently Enrolled",
    value: "-createdAt",
  },
  {
    name: "Title: A-to-Z",
    value: "title",
  },
  {
    name: "Title: Z-to-A",
    value: "-title",
  },
];

const progressDataSelect = [
  {
    name: "Inprogress",
    value: "in-progress",
  },
  {
    name: "Not Started",
    value: "not-started",
  },
];
const MyLearningFilter = () => {
  const [sort, setSort] = useState("Recently Accessed");
  const [categories, setCategories] = useState("");
  const [progress, setProgress] = useState("");
  const [intructor, setIntructor] = useState("");

  const handleChangeSort = (value: string) => {
    setSort(value);
  };
  return (
    <div className="flex items-end justify-between ">
      <div className="flex gap-3 items-end ">
        <div className="flex flex-col gap-3 w-[150px]">
          <p>Sort by</p>
          <SelectFilterMyCourses
            data={sortData}
            handleChange={handleChangeSort}
            value={sort}
          />
        </div>
        <div className="flex flex-col gap-3 w-[150px]">
          <p>Filter by</p>
          <SelectFilterMyCourses
            data={sortData}
            handleChange={handleChangeSort}
            value={sort}
          />
        </div>
        <div className="w-[150px]">
          <SelectFilterMyCourses
            data={sortData}
            handleChange={handleChangeSort}
            value={sort}
          />
        </div>
        <div className="w-[150px]">
          <SelectFilterMyCourses
            data={sortData}
            handleChange={handleChangeSort}
            value={sort}
          />
        </div>
        <button className="font-semibold h-[40px] flex items-center justify-center">
          Reset
        </button>
      </div>
      <div className="w-[250px] border border-gray1 dark:border-gray8 h-[40px] flex items-center justify-between">
        <input
          type="text"
          placeholder="Search my course"
          className="h-full w-[80%] px-4 outline-none bg-transparent"
        />
        <button className="dark:bg-violet9 flex items-center justify-center h-full w-[20%]">
          <IoIosSearch />
        </button>
      </div>
    </div>
  );
};

export default MyLearningFilter;
