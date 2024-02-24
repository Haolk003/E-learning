import React, { useState } from "react";
import SelectFilterMyCourses from "@/components/ui/select/SelectFilterMyCourse";
import { IoIosSearch } from "react-icons/io";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import useUpdateQueryString from "@/hooks/useUpdateQueryString";
const sortData = [
  {
    label: "Recently Accessed",
    value: "-updatedAt",
  },
  {
    label: "Recently Enrolled",
    value: "-createdAt",
  },
  {
    label: "Title: A-to-Z",
    value: "title",
  },
  {
    label: "Title: Z-to-A",
    value: "-title",
  },
];

const progressDataSelect = [
  {
    label: "Inprogress",
    value: "in-progress",
  },
  {
    label: "Not Started",
    value: "not-started",
  },
];

type Props = {
  categoriesData: {
    label: string;
    value: string;
  }[];
  instructorData: {
    label: string;
    value: string;
  }[];
};
const MyLearningFilter: React.FC<Props> = ({
  categoriesData,
  instructorData,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [sort, setSort] = useState(searchParams.get("sort") || "-updatedAt");
  const [categories, setCategories] = useState(
    searchParams.get("category") || "all"
  );
  const [progress, setProgress] = useState(searchParams.get("progress") || "");
  const [instructor, setInstructor] = useState(
    searchParams.get("instructor") || "all"
  );

  const handleChangeSort = (value: string) => {
    setSort(value);
    const params = new URLSearchParams(searchParams.toString());
    router.push(pathname + "?" + useUpdateQueryString(params, "sort", value));
  };

  const handleChangeCategories = (value: string) => {
    setCategories(value);
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      pathname + "?" + useUpdateQueryString(params, "category", value)
    );
  };
  const handleChangeIntructor = (value: string) => {
    setInstructor(value);
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      pathname + "?" + useUpdateQueryString(params, "instructor", value)
    );
  };
  const handleChangeProgress = (value: string) => {
    setProgress(value);
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      pathname + "?" + useUpdateQueryString(params, "progress", value)
    );
  };
  return (
    <div className="flex items-end justify-between ">
      <div className="flex gap-3 items-end ">
        <div className="flex flex-col gap-3 w-[180px]">
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
            data={categoriesData}
            handleChange={handleChangeCategories}
            value={categories}
          />
        </div>
        <div className="w-[150px]">
          <SelectFilterMyCourses
            data={instructorData}
            handleChange={handleChangeIntructor}
            value={instructor}
          />
        </div>
        <div className="w-[150px]">
          <SelectFilterMyCourses
            data={progressDataSelect}
            handleChange={handleChangeProgress}
            value={progress}
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
