"use client";

import React, { FC } from "react";
import * as Scroll from "@radix-ui/react-scroll-area";

type Props = {
  children: React.ReactNode;
};
const ScrollArea: FC<Props> = ({ children }) => {
  return (
    <Scroll.Root className="w-full h-full rounded overflow-hidden  bg-transparent">
      <Scroll.Viewport className="w-full h-full rounded">
        {children}
      </Scroll.Viewport>
      <Scroll.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <Scroll.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </Scroll.Scrollbar>
      <Scroll.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <Scroll.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </Scroll.Scrollbar>
      <Scroll.Corner className="bg-blackA5" />
    </Scroll.Root>
  );
};

export default ScrollArea;
