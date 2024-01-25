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
      <SelectPrimitive.Trigger className="bg-gray-800 text-white px-4 py-2 rounded-md">
        <SelectPrimitive.Value placeholder="Choose an option" />
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-gray-700 rounded-md shadow-lg ">
          <SelectPrimitive.ScrollUpButton />
          <SelectPrimitive.Viewport className="p-2 overflow-auto ">
            {data.map((item, index) => (
              <SelectPrimitive.Item
                value={item._id}
                key={item._id}
                className="text-white px-4 py-2 hover:bg-purple-700 focus:bg-purple-700"
              >
                <SelectPrimitive.ItemText>{item.name}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}

            {/* Repeat for other items */}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default SelectCategory;
