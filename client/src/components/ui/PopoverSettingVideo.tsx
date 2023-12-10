import React, { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Switch from "@radix-ui/react-switch";
import { IoSettings } from "react-icons/io5";
import ReactDOM from "react-dom";

type Props = {
  handleChangeOpen: (open: boolean) => void;
  fullscreenElement: any;
};

const PopoverSettingVideo: FC<Props> = ({
  handleChangeOpen,
  fullscreenElement,
}) => {
  return (
    <Popover.Root onOpenChange={handleChangeOpen}>
      <Popover.Trigger asChild>
        <button className="text-2xl">
          <IoSettings />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        {fullscreenElement ? (
          ReactDOM.createPortal(
            <Popover.Content className="fixed z-[9999] -top-5 -left-10 rounded w-full h-full visible opacity-100 py-5 bg-slate-800  ">
              <div className="">
                <div className="flex items-center gap-4 px-4 mb-3 ">
                  <label className="text-[14px]">Autoplay</label>
                  <Switch.Root
                    className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-violet-700 outline-none cursor-default border border-white"
                    id="airplane-mode"
                  >
                    <Switch.SwitchThumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                </div>
                <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                  Download lecture
                </div>
                <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                  Keyboard shortcuts
                </div>
                <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                  Content infomation
                </div>
                <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                  Resport abuse
                </div>
              </div>
            </Popover.Content>,
            fullscreenElement
          )
        ) : (
          <Popover.Content className="absolute -translate-x-1/2 bottom-16 left-[50% ] rounded w-[180px] py-5 bg-slate-800  shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">
            <div className="">
              <div className="flex items-center gap-4 px-4 mb-3 ">
                <label className="text-[14px]">Autoplay</label>
                <Switch.Root
                  className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-violet-700 outline-none cursor-default border border-white"
                  id="airplane-mode"
                >
                  <Switch.SwitchThumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>
              </div>
              <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                Download lecture
              </div>
              <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                Keyboard shortcuts
              </div>
              <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                Content infomation
              </div>
              <div className="cursor-pointer text-[14px] w-full py-3 hover:bg-slate-600/30 px-4">
                Resport abuse
              </div>
            </div>
          </Popover.Content>
        )}
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverSettingVideo;
