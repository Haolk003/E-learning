import * as Progress from "@radix-ui/react-progress";
import React from "react";

type Props = {
  progress: number;
};
const ProgressPrecentRating: React.FC<Props> = ({ progress }) => {
  return (
    <Progress.Root
      className="relative overflow-hidden w-full h-[8px] dark:bg-gray10 bg-gray7"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="dark:bg-white bg-gray3 w-full h-full transition-transform duration-200  ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      ></Progress.Indicator>
    </Progress.Root>
  );
};

export default ProgressPrecentRating;
