import React from "react";
import * as Select from "@radix-ui/react-select";

type Props = {
  value: string;
  data: { label: string; value: string }[];
  handleChangeValue: (value: string) => void;
};
const SelectPrimary: React.FC<Props> = ({ data, value, handleChangeValue }) => {
  return (
    <Select.Root
      value={value}
      onValueChange={(value) => handleChangeValue(value)}
    >
      <Select.Trigger className="inline-flex items-center w-full justify-center rounded px-[15px]  text-[13px] leading-none h-[40px] gap-[5px] bg-transparent  border dark:border-white   outline-none">
        <Select.Value placeholder="Choose an option" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          side="bottom"
          align="start"
          position="popper"
          className="min-w-[200px] w-full  dark:bg-gray3 bg-white flex items-center rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.Viewport className="py-3 flex flex-col  ">
            {data &&
              data.map((item, index) => {
                return (
                  <Select.Item
                    key={item.value}
                    value={item.value}
                    className="text-[15px] text-left w-full px-3 mb-2 leading-none text-gray11 cursor-pointers rounded-[3px]  h-[25px]  relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none  data-[highlighted]:text-violet12  "
                  >
                    <Select.ItemText className="cursor-pointer">
                      {item.label}
                    </Select.ItemText>
                  </Select.Item>
                );
              })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectPrimary;
