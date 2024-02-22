import React, { FC } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { IoIosCheckmark } from "react-icons/io";
type Props = {
  isChecked: boolean;
  label: string;
  handleCheckbox: (value: boolean | string) => void;
};
const CheckboxFilterCourses: FC<Props> = ({
  isChecked,
  handleCheckbox,
  label,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Checkbox.Root
        className="shadow-blackA4 hover:bg-violet3 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
        checked={isChecked}
        onCheckedChange={handleCheckbox}
      >
        <Checkbox.Indicator className="text-black">
          <IoIosCheckmark size={18} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <p className="capitalize">{label}</p>
    </div>
  );
};

export default CheckboxFilterCourses;
