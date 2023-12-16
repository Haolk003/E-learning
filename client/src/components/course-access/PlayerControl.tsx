import React, { Dispatch, SetStateAction } from "react";
import {
  MdForward10,
  MdOutlinePause,
  MdPlayArrow,
  MdOutlineEditNote,
  MdFullscreenExit,
} from "react-icons/md";
import { TbRewindBackward5, TbRewindForward5 } from "react-icons/tb";
import {
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
  IoVolumeHigh,
  IoSettings,
} from "react-icons/io5";
import { PiCircleFill } from "react-icons/pi";
import { SlSizeFullscreen } from "react-icons/sl";
import { LiaExpandSolid } from "react-icons/lia";
import * as Select from "@radix-ui/react-select";
import * as HoverCard from "@radix-ui/react-hover-card";
import SlideVolume from "../ui/slide/SlideVolume";
import PopoverSettingVideo from "../ui/PopoverSettingVideo";
import ConvertDuratonVideo from "@/utils/convertDuratonVideo";
// import necessary icons and components
type Props = {
  playing: boolean;
  handlePlay: () => void;
  handleBackwind: () => void;
  handleForward: () => void;
  playbackRate: string;
  setPlayBackRate: (rate: string) => void;
  played: number;
  duration: number;
  handleSeekChange: (value: any) => void;
  volume: number;
  handleChangeVolume: (value: number) => void;
  toggleExpandedView: () => void;
  toggleFullScreen: () => void;
  isFullScreen: boolean;
  handelOpenVolumeChange: (open: boolean) => void;

  handleChangeOpenSetting: (open: boolean) => void;
};
const PlayerControls: React.FC<Props> = ({
  playing,
  handlePlay,
  handleBackwind,
  handleForward,
  playbackRate,
  setPlayBackRate,
  played,
  duration,
  handleSeekChange,
  volume,
  handleChangeVolume,
  toggleExpandedView,
  toggleFullScreen,
  handelOpenVolumeChange,
  handleChangeOpenSetting,
  isFullScreen,
}) => {
  // Player control logic and JSX
  return (
    <div className="player-controls">
      <div className="flex  items-center justify-between mt-2">
        <div className="flex items-center gap-[10px]">
          <button onClick={handlePlay} className="text-3xl">
            {playing ? <MdOutlinePause /> : <MdPlayArrow />}
          </button>
          <button className="text-2xl" onClick={handleBackwind}>
            <TbRewindBackward5 />
          </button>
          <div>
            <Select.Root
              value={playbackRate}
              onValueChange={(value) => setPlayBackRate(value)}
            >
              <Select.Trigger
                aria-label="playback-rate"
                className="bg-white h-[25px] w-[70px] text-black"
              >
                <Select.Value placeholder="1x" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="overflow-hidden bg-black px-4 py-4 absolute bottom-12 left-0"
                  position="popper"
                >
                  <Select.Viewport>
                    <Select.Item
                      value="2"
                      className="text-[13px] cursor-pointer leading-none text-white flex items-center gap-4 h-[35px]"
                    >
                      <Select.ItemText>2x</Select.ItemText>
                      <Select.ItemIndicator className="text-violet11">
                        <PiCircleFill />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item
                      value="1.75"
                      className="text-[13px] leading-none text-white flex items-center gap-4 h-[35px] cursor-pointer"
                    >
                      <Select.ItemText>1.75x</Select.ItemText>
                      <Select.ItemIndicator className="text-violet11">
                        <PiCircleFill />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item
                      value="1.5"
                      className="text-[13px] leading-none text-white flex items-center gap-4 h-[35px] cursor-pointer"
                    >
                      <Select.ItemText>1.5x</Select.ItemText>
                      <Select.ItemIndicator className="text-violet11">
                        <PiCircleFill />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item
                      value="1.25"
                      className="text-[13px] leading-none text-white flex items-center gap-4 h-[35px] cursor-pointer"
                    >
                      <Select.ItemText>1.25x</Select.ItemText>
                      <Select.ItemIndicator className="text-violet11">
                        <PiCircleFill />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item
                      value="1"
                      className="text-[13px] leading-none text-white flex items-center gap-4 h-[35px] cursor-pointer"
                    >
                      <Select.ItemText>1x</Select.ItemText>
                      <Select.ItemIndicator className="text-violet11">
                        <PiCircleFill />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item
                      value="0.75"
                      className="text-[13px] leading-none text-white flex items-center gap-4 h-[35px] cursor-pointer"
                    >
                      <Select.ItemText>0.75x</Select.ItemText>
                      <Select.ItemIndicator className="text-violet11">
                        <PiCircleFill />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item
                      value="0.5"
                      className="text-[13px] leading-none text-white flex items-center gap-4 h-[35px] cursor-pointer"
                    >
                      <Select.ItemText>0.5x</Select.ItemText>
                      <Select.ItemIndicator className="text-violet11">
                        <PiCircleFill />
                      </Select.ItemIndicator>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <button className="text-2xl" onClick={handleForward}>
            <TbRewindForward5 />
          </button>
          {/* duration video */}
          <div className="flex items-center gap-2">
            <p>
              <ConvertDuratonVideo duration={played} />
            </p>
            <p>/</p>
            <p>
              <ConvertDuratonVideo duration={duration} />
            </p>
          </div>
          <button className="text-3xl ml-2">
            <MdOutlineEditNote />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            <HoverCard.Root onOpenChange={handelOpenVolumeChange}>
              <HoverCard.Trigger asChild>
                <div className="text-2xl  mx-auto flex items-center justify-center">
                  {volume >= 0.75 && <IoVolumeHigh />}
                  {volume < 0.75 && volume >= 0.5 && <IoVolumeMedium />}
                  {volume < 0.5 && volume > 0 && <IoVolumeLow />}
                  {volume <= 0 && <IoVolumeMute />}
                </div>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content className="absolute -bottom-10 left-[50%] -translate-x-1/2">
                  <div>
                    <SlideVolume
                      value={volume}
                      handleChange={handleChangeVolume}
                    />
                  </div>
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          </div>

          <PopoverSettingVideo handleChangeOpen={handleChangeOpenSetting} />

          {!isFullScreen && (
            <button className="text-2xl" onClick={toggleExpandedView}>
              <LiaExpandSolid />
            </button>
          )}
          <button onClick={toggleFullScreen} className="">
            {isFullScreen ? (
              <MdFullscreenExit className="text-2xl" />
            ) : (
              <SlSizeFullscreen />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
