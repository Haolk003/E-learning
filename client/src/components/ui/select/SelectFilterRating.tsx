import React, { Dispatch, SetStateAction } from "react";
import * as Select from "@radix-ui/react-select";
import { IoChevronDownOutline } from "react-icons/io5";
import { GoChevronDown } from "react-icons/go";

type Props = {
  typeRating: string;
  setTypeRating: Dispatch<SetStateAction<string>>;
};
const SelectFilterRating: React.FC<Props> = ({ setTypeRating, typeRating }) => {
  return (
    <div className="w-full relative">
      <Select.Root>
        <Select.Trigger className="bg-white border h-[40px] text-[13px] text-black border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-between items-center">
          <Select.Value placeholder="All ratings" />
          <Select.Icon>
            <GoChevronDown />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-white border text-black text-[13px] border-gray-300 rounded-md shadow-lg overflow-hidden">
            <Select.ScrollUpButton />
            <Select.Viewport>
              <Select.Group>
                <Select.Item
                  value="all"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>All ratings</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="five"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>Five stars</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="four"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>Four stars</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="three"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>Three stars</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="two"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>Two stars</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="one"
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>One star</Select.ItemText>
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default SelectFilterRating;
