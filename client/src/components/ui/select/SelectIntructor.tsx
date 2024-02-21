import * as SelectPrimitive from "@radix-ui/react-select";
import { FC } from "react";
import "tailwindcss/tailwind.css";

type Props = {
  data: {
    name: string;
    _id: string;
  }[];
  value: string;
  handleChange: (value: string) => void;
};
const SelectCategory: FC<Props> = ({ data, handleChange, value }) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={handleChange}>
      <SelectPrimitive.Trigger className="inline-flex items-center w-full justify-center rounded px-[15px]  text-[13px] leading-none h-[35px] gap-[5px] bg-transparent  border dark:border-white   outline-none">
        <SelectPrimitive.Value
          placeholder="Choose an option"
          aria-label="Category"
        />
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          side="top"
          align="center"
          sideOffset={-150}
          position="popper"
          className=" w-full min-w-[240px] min-h-[200px] dark:bg-gray3 bg-white flex items-center justify-center rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <SelectPrimitive.Viewport className="py-3 flex flex-col items-center justify-center">
            {data.map((item, index) => (
              <SelectPrimitive.Item
                value={item._id}
                key={item._id}
                className="text-[15px] mb-2 leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1  "
              >
                <SelectPrimitive.ItemText>{item.name}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}

            {/* Repeat for other items */}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default SelectCategory;
