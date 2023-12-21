import React, { FC } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

type Props = {
  children: React.ReactNode;
  content: string;
  side: "right" | "top" | "left" | "bottom";
};
const TooltipDemo: FC<Props> = ({ children, content, side }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            className=" data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade  select-none  bg-blackA10 h-[50px] text-white  w-auto px-4 text-center flex items-center justify-center z-50 leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] text-[13px]  "
            sideOffset={5}
          >
            {content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipDemo;
