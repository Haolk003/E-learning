import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

type Props = {
  period: string;
  handleChange: (e: string) => void;
  data: { label: string; value: string }[];
};
const ToggleGroupEarningReport: React.FC<Props> = ({
  handleChange,
  period,
  data,
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
        {data.map((item, index) => (
          <ToggleGroup.Item
            value={item.value}
            className="hover:bg-violet8 color-mauve11 data-[state=on]:bg-violet12 flex px-3 py-3 items-center justify-center bg-gray1   first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-white "
          >
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

export default ToggleGroupEarningReport;
