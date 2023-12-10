import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
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
import _ from "lodash";

import SlideVideo from "./slide/SlideVideo";
import SlideVolume from "./slide/SlideVolume";
import PopoverSettingVideo from "./PopoverSettingVideo";
// import CommentSection from './CommentSection'; // Component for comment section
// import RelatedVideos from './RelatedVideos'; // Component for related videos

const CustomVideoPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [isOpenVolumeCard, setIsOpenVolumeCard] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);

  const [playbackRate, setPlayBackRate] = useState("1");
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [fullScreenElement, setFullScreenElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreenElement(document.fullscreenElement as HTMLElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state: { played: number; loaded: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  };

  const toggleFullScreen = () => {
    const isFullscreen = document.fullscreenElement;
    if (!isFullScreen) {
      const container = containerRef.current;
      if (container) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        }
      }
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const toggleExpandedView = () => {
    setIsExpandedView(!isExpandedView);
  };
  const handleSeekMouseDown = (e: any) => {
    setSeeking(true);
  };

  const handleSeekChange = (value: any) => {
    console.log(seeking);
    setPlayed(value / 100);
  };

  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);
    playerRef.current?.seekTo(played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    // Code to play the next video in the playlist
  };
  const handleVideoClick = () => {
    setPlaying(!playing);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };
  const handleBackwind = useCallback(
    _.throttle(() => {
      const currentTime = playerRef.current?.getCurrentTime();
      const duration = playerRef.current?.getDuration();

      if (currentTime !== undefined && duration) {
        const newTime = currentTime - 5; // Add 5 seconds to the current time
        playerRef.current?.seekTo(newTime);
        setPlayed(newTime / duration);
      }
    }, 1000),
    []
  );
  const handleChangeOpenSetting = (open: boolean) => {
    setIsOpenSetting(open);
  };
  const handleForward = useCallback(
    _.throttle(() => {
      const currentTime = playerRef.current?.getCurrentTime();
      const duration = playerRef.current?.getDuration();
      if (currentTime !== undefined && duration) {
        const newTime = currentTime + 5;
        setPlayed(newTime / duration); // Add 5 seconds to the current time
        playerRef.current?.seekTo(newTime);
      }
    }, 1000),
    []
  );
  const handleChangeVolume = (value: number) => {
    console.log(value);
    setVolume(value / 100);
  };

  const handelOpenVolumeChange = (open: boolean) => {
    setIsOpenVolumeCard(open);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);
  return (
    <div ref={containerRef}>
      <div
        className={`relative ${
          isFullScreen ? "w-screen h-screen" : "w-[800px]"
        } group  mx-auto`}
      >
        <div
          className={`${
            isFullScreen ? "w-screen h-screen" : "w-[800px]"
          }  cursor-pointer`}
          onClick={handleVideoClick}
        >
          <ReactPlayer
            ref={playerRef}
            url="http://res.cloudinary.com/dqredfe0t/video/upload/v1701329953/video/fjmoo6z5dfwctodia0a8.mp4"
            playing={playing}
            volume={volume}
            playbackRate={Number(playbackRate)}
            onClickPreview={handleVideoClick}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            width="100%"
            height="auto"
            className="z-10"
          />
        </div>
        <div
          className={`absolute opacity-0 group-hover:opacity-100 ${
            (isOpenVolumeCard || isOpenSetting) && "opacity-100"
          }  bottom-0 left-0 w-full p-4 transition-opacity duration-300 `}
        >
          <SlideVideo
            loaded={loaded}
            handleChange={handleSeekChange}
            handleMouseDown={handleSeekMouseDown}
            handleMouseUp={handleSeekMouseUp}
            value={played}
          />
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

              <PopoverSettingVideo
                handleChangeOpen={handleChangeOpenSetting}
                fullscreenElement={fullScreenElement}
              />

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
        {showAnimation && (
          <div
            className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  animate-hideVideo opacity-0 flex items-center justify-center text-4xl bg-blackA7 rounded-full w-[80px] h-[80px]`}
          >
            {!playing ? <MdOutlinePause /> : <MdPlayArrow />}
          </div>
        )}
      </div>

      {/* <div className="w-full max-w-2xl">
        <CommentSection videoId="video1" />
      </div>
      <div className="w-full max-w-2xl">
        <RelatedVideos videoId="video1" />
      </div> */}
    </div>
  );
};

export default CustomVideoPlayer;
