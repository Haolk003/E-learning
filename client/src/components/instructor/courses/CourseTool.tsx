import React, { Dispatch, FC, SetStateAction, useState } from "react";
import * as Select from "@radix-ui/react-select";
import SearchInput from "@/components/ui/input/SearchInput";
import Link from "next/link";

type Props = {
  sortOrder: string;
  setSortOrder: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};
const CourseTool: FC<Props> = ({
  searchTerm,
  setSearchTerm,
  setSortOrder,
  sortOrder,
}) => {
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    // Thực hiện tìm kiếm ở đây hoặc gọi một API tìm kiếm
  };
  return (
    <div className="mb-5 flex items-center justify-between   ">
      <div className="flex items-center gap-4">
        <SearchInput onSearch={handleSearch} />

        <Select.Root defaultValue="-createdAt" onValueChange={setSortOrder}>
          <Select.Trigger className="bg-gray-800 text-white flex items-center justify-between px-4 py-2 w-[150px] rounded-md shadow-sm shadow-gray-900 h-[40px]">
            {" "}
            <Select.Value placeholder="Choose an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-gray-700 rounded-md shadow-lg ">
              <Select.ScrollUpButton />
              <Select.Viewport className="p-2 overflow-auto ">
                <Select.Item
                  value="-createdAt"
                  className="text-white rounded-md px-4 py-2 hover:bg-purple-700 focus:bg-purple-700"
                >
                  <Select.ItemText>Newest</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="createdAt"
                  className="text-white rounded-md px-4 py-2 hover:bg-purple-700 focus:bg-purple-700"
                >
                  <Select.ItemText>Oldest</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="title"
                  className="text-white rounded-md px-4 py-2 hover:bg-purple-700 focus:bg-purple-700"
                >
                  <Select.ItemText>A-Z</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="-title"
                  className="text-white rounded-md px-4 py-2 hover:bg-purple-700 focus:bg-purple-700"
                >
                  <Select.ItemText>Z-A</Select.ItemText>
                </Select.Item>

                {/* Repeat for other items */}
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <Link
        href="/instructor/create-course/step1"
        className="bg-violet9 text-white h-[40px] w-[120px] flex items-center justify-center font-semibold"
      >
        New Course
      </Link>
    </div>
  );
};

export default CourseTool;
