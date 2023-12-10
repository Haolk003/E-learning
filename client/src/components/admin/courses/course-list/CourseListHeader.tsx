import React, { Dispatch, FC } from "react";
import * as Select from "@radix-ui/react-select";
import { GoChevronDown } from "react-icons/go";

type Props = {
  keyword: string;
  onChangeInput: (value: string) => void;
  onChangeSort: (value: string) => void;
  sort: string;
};
const CourseListHeader: FC<Props> = ({
  keyword,
  onChangeInput,
  onChangeSort,
  sort,
}) => {
  return (
    <div className="flex items-center justify-between w-full mx-auto px-5 py-8 border-b border-white">
      <h2 className='relative before:content-[" "] before:absolute before:-left-2 before:top-[50%] before:-translate-y-1/2 before:h-[1rem] before:w-[0.2rem] before:bg-gradient-to-b before:from-[rgba(132,90,223,0.5)] before:to-[rgba(35,183,229,0.5)] before:rounded-[0.5rem]'>
        Course List
      </h2>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => onChangeInput(e.target.value)}
          placeholder="Search Here"
          className="text-sm px-3 rounded-sm h-[30px] bg-gray3"
        />
        <Select.Root
          value={sort}
          onValueChange={(value) => onChangeSort(value)}
        >
          <Select.Trigger className="text-[13px] data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 leading-none text-white rounded-[3px] flex items-center justify-center gap-1 h-[30px] w-[80px] relative bg-violet10">
            <Select.Value placeholder="Sort By" />
            <Select.Icon>
              <GoChevronDown />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              align="end"
              className="overflow-hidden text-[12px] w-[150px] bg-black text-white rounded-md   "
            >
              <Select.Viewport className="p-[5px]">
                <Select.Group>
                  <Select.Item
                    value="-createdAt"
                    className=" data-[highlighted]:text-violet11 py-[10px] px-[10px] data-[highlighted]:outline-none "
                  >
                    <Select.ItemText className="text-black">
                      New
                    </Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="popular"
                    className=" data-[highlighted]:text-violet11 py-[10px] px-[10px] data-[highlighted]:outline-none "
                  >
                    <Select.ItemText>Popular</Select.ItemText>
                  </Select.Item>
                  <Select.SelectItem
                    value="relevant"
                    className=" data-[highlighted]:text-violet11 py-[10px] px-[10px] data-[highlighted]:outline-none "
                  >
                    <Select.ItemText>Relevant</Select.ItemText>
                  </Select.SelectItem>
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};

export default CourseListHeader;
