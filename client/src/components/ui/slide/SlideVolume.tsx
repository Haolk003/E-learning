import * as Slide from "@radix-ui/react-slider";
import React, { FC } from "react";
type Props = {
  value: number;
  handleChange: (value: number) => void;
};
const SlideVolume: FC<Props> = ({ handleChange, value }) => {
  return (
    <Slide.Root
      orientation="vertical"
      min={0}
      max={100}
      value={[value * 100]}
      onValueChange={(value) => handleChange(value[0])}
      className="w-[25px] h-[150px]  relative flex items-center select-node touch-none cursor-grab"
    >
      <Slide.Track className="bg-white relative w-full h-[150px]">
        <Slide.Range className="absolute  bg-violet11 w-full" />
      </Slide.Track>
      <Slide.SliderThumb
        aria-label="Volume"
        className="w-[25px] h-[25px] bg-white"
      />
    </Slide.Root>
  );
};

export default SlideVolume;
