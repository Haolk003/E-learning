import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import Rating from "../Rating";

type Props = {
  value: string;
  handleChangeRating: (value: string) => void;
};
const RadioGroupFilterRating: React.FC<Props> = ({
  handleChangeRating,
  value,
}) => {
  return (
    <RadioGroup.Root
      className="mt-2 flex flex-col gap-4"
      value={value}
      onValueChange={(value: string) => handleChangeRating(value)}
    >
      <div className="flex items-center gap-2">
        <RadioGroup.Item
          value="4.5"
          className="bg-white w-[15px] h-[15px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
        </RadioGroup.Item>
        <label className="text-[15px] leading-none pl-[15px] flex items-center gap-1">
          <Rating ratings={4.5} />
          <p>4.5 & up</p>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item
          value="4"
          className="bg-white w-[15px] h-[15px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
        </RadioGroup.Item>
        <label className="text-[15px] leading-none pl-[15px] flex items-center gap-1">
          <Rating ratings={4} />
          <p>4 & up</p>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item
          value="3"
          className="bg-white w-[15px] h-[15px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
        </RadioGroup.Item>
        <label className="text-[15px] leading-none pl-[15px] flex items-center gap-1">
          <Rating ratings={3} />
          <p>3 & up</p>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item
          value="2"
          className="bg-white w-[15px] h-[15px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
        </RadioGroup.Item>
        <label className="text-[15px] leading-none pl-[15px] flex items-center gap-1">
          <Rating ratings={1} />
          <p>2 & up</p>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroup.Item
          value="1"
          className="bg-white w-[15px] h-[15px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
        </RadioGroup.Item>
        <label className="text-[15px] leading-none pl-[15px] flex items-center gap-1">
          <Rating ratings={1} />
          <p>1 & up</p>
        </label>
      </div>
    </RadioGroup.Root>
  );
};

export default RadioGroupFilterRating;
