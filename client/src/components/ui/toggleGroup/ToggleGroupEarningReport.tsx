import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

type Props = {
  period: string;
  handleChange: (e: string) => void;
};
const ToggleGroupEarningReport: React.FC<Props> = ({
  handleChange,
  period,
}) => {
  return (
    <div>
      <ToggleGroup.Root
        value={period}
        onValueChange={(event) => handleChange(event)}
        about=""
        type="single"
        defaultValue="1month"
        className="flex items-center text-[13px]"
      >
        <ToggleGroup.Item
          value="D"
          className="hover:bg-violet8 color-mauve11 data-[state=on]:bg-violet12 flex h-[35px] w-[35px] items-center justify-center bg-gray1   first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-white "
        >
          D
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="1M"
          className="hover:bg-violet8 color-mauve11 data-[state=on]:bg-violet12 flex h-[35px] w-[35px] items-center justify-center bg-gray1  first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-white"
        >
          1M
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="6M"
          className="hover:bg-violet8 color-mauve11 data-[state=on]:bg-violet12 flex h-[35px] w-[35px] items-center justify-center bg-gray1 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-white"
        >
          6M
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="1Y"
          className="hover:bg-violet8 color-mauve11 data-[state=on]:bg-violet12 flex h-[35px] w-[35px] items-center justify-center bg-gray1 leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-white"
        >
          1Y
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
};

export default ToggleGroupEarningReport;
