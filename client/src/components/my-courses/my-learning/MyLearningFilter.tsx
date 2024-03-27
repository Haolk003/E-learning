import React, { useState } from "react";
import SelectFilterMyCourses from "@/components/ui/select/SelectFilterMyCourse";
import { IoIosSearch } from "react-icons/io";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import UseUpdateQueryString from "@/hooks/useUpdateQueryString";

import { IoFilterOutline } from "react-icons/io5";

import * as Dialog from "@radix-ui/react-dialog";
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
  const [isOpenFilter, setOpenFilter] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [sort, setSort] = useState(searchParams.get("sort") || "-updatedAt");
  const [search, setSearch] = useState(searchParams.get("q") || "");
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
    router.push(pathname + "?" + UseUpdateQueryString(params, "sort", value));
  };

  const handleChangeCategories = (value: string) => {
    setCategories(value);
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      pathname + "?" + UseUpdateQueryString(params, "category", value)
    );
  };
  const handleChangeIntructor = (value: string) => {
    setInstructor(value);
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      pathname + "?" + UseUpdateQueryString(params, "instructor", value)
    );
  };
  const handleChangeProgress = (value: string) => {
    setProgress(value);
    const params = new URLSearchParams(searchParams.toString());
    router.push(
      pathname + "?" + UseUpdateQueryString(params, "progress", value)
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(pathname + "?" + UseUpdateQueryString(params, "q", search));
  };
  const handleReset = () => {
    router.push(pathname);
    setCategories("all");
    setInstructor("all");
    setSort("-createdAt");
    setSearch("");
  };
  return (
    <div className="flex items-end justify-between dark:text-white text-black flex-wrap md:px-0 px-2 ">
      <div className="flex gap-3 items-end  md:mb-0 mb-3">
        <div className="flex flex-col gap-3 w-[180px]">
          <p>Sort by</p>
          <SelectFilterMyCourses
            data={sortData}
            handleChange={handleChangeSort}
            value={sort}
          />
        </div>

        <div className="md:flex flex-col gap-3 w-[150px] hidden">
          <p>Filter by</p>
          <SelectFilterMyCourses
            data={categoriesData}
            handleChange={handleChangeCategories}
            value={categories}
          />
        </div>
        <div className="w-[150px] md:block hidden">
          <SelectFilterMyCourses
            data={instructorData}
            handleChange={handleChangeIntructor}
            value={instructor}
          />
        </div>
        <div className="w-[150px] md:block hidden">
          <SelectFilterMyCourses
            data={progressDataSelect}
            handleChange={handleChangeProgress}
            value={progress}
          />
        </div>
        <Dialog.Root open={isOpenFilter} onOpenChange={setOpenFilter}>
          <Dialog.Trigger asChild>
            <button className="md:hidden flex items-center justify-center gap-3 border border-gray8 w-[120px] h-[40px]">
              <IoFilterOutline />
              Filter
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="fixed left-0 top-0 w-screen h-screen bg-black flex flex-col z-[180] gap-5 py-6">
              <SelectFilterMyCourses
                data={categoriesData}
                handleChange={handleChangeCategories}
                value={categories}
              />

              <SelectFilterMyCourses
                data={instructorData}
                handleChange={handleChangeIntructor}
                value={instructor}
              />
              <div className="absolute w-full bottom-0 left-0 flex items-center justify-end gap-5">
                <button
                  className="font-semibold h-[40px] md:flex items-center justify-center "
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  className="h-[40px] flex items-center justify-center bg-violet10 text-white w-[100px] "
                  onClick={() => setOpenFilter(false)}
                >
                  Apply
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <button
          className="font-semibold h-[40px] md:flex items-center justify-center hidden"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="w-[250px] border border-gray1 dark:border-gray8 h-[40px] flex items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search my course"
          className="h-full w-[80%] px-4 outline-none bg-transparent"
        />
        <button
          className="dark:bg-violet9 flex items-center justify-center h-full w-[20%]"
          onClick={handleSearch}
        >
          <IoIosSearch />
        </button>
      </div>
    </div>
  );
};

export default MyLearningFilter;
