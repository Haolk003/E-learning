import React, { FC } from "react";
import * as Slide from "@radix-ui/react-slider";
type Props = {
  value: number;
  handleChange: (e: any) => void;
  handleMouseUp: (e: any) => void;
  handleMouseDown: (e: any) => void;
  loaded: number;
};
const SlideVideo: FC<Props> = ({
  value,
  loaded,
  handleChange,
  handleMouseDown,
  handleMouseUp,
}) => {
  return (
    <Slide.Root
      min={0}
      max={100}
      value={[value * 100]}
      onPointerUp={handleMouseUp}
      onPointerDown={(e) => handleMouseDown(e)}
      onValueChange={(value) => {
        handleChange(value[0]);
      }}
      className="relative group flex items-center select-none touch-none w-full h-[6px] hover:h-[10px] duration-200 cursor-pointer"
    >
      <Slide.Track className="bg-white relative duration-300  h-full w-full ">
        <Slide.Range className="absolute z-30  bg-violet11 h-full "></Slide.Range>
        <div className="absolute z-20 bottom-0 h-full left-0 w-full">
          <div className="h-full bg-gray-200">
            <div
              className="bg-blackA8 h-full"
              style={{ width: `${loaded * 100}%` }} // Set the width of the progress bar based on the loaded state
            ></div>
          </div>
        </div>
      </Slide.Track>
      <Slide.Thumb
        aria-label="duration"
        className="  w-[8px] h-[8px] rounded-full   group-hover:rounded-full  bg-white shadow-[0_2px_10px] shadow-blackA "
      />
    </Slide.Root>
  );
};

export default SlideVideo;
