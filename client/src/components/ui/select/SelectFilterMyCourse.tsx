import * as SelectPrimitive from "@radix-ui/react-select";
import { FC } from "react";
import "tailwindcss/tailwind.css";

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  value: string;
  handleChange: (value: string) => void;
};
const SelectFilterMyCourses: FC<Props> = ({ data, handleChange, value }) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={handleChange}>
      <SelectPrimitive.Trigger className="inline-flex items-center w-full justify-center rounded px-[15px]  text-[13px] leading-none h-[40px] gap-[5px] bg-transparent  border dark:border-white   outline-none">
        <SelectPrimitive.Value
          placeholder="Choose an option"
          aria-label="Category"
        />
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          side="bottom"
          align="start"
          position="popper"
          className="min-w-[200px] w-full  dark:bg-gray3 bg-white flex items-center rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <SelectPrimitive.Viewport className="py-3 flex flex-col  ">
            {data.map((item, index) => (
              <SelectPrimitive.Item
                value={item.value}
                key={item.value}
                className="text-[15px] text-left w-full px-3 mb-2 leading-none text-gray11 cursor-pointers rounded-[3px]  h-[25px]  relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none  data-[highlighted]:text-violet12  "
              >
                <SelectPrimitive.ItemText className="cursor-pointer">
                  {item.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}

            {/* Repeat for other items */}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default SelectFilterMyCourses;
