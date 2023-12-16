import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import _ from "lodash";

import Loader from "../loader/Loader";

import { useUpdateLengthWatchedMutation } from "@/features/course/courseApi";
import useVideoProgress from "@/hooks/useVideoProgress";
import PlayerControls from "./PlayerControl";
import SlideVideo from "../ui/slide/SlideVideo";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { progressLectureProgressType } from "@/types/progressLectureUserType";
import { CourseContentType } from "@/types/couresContentType";

type Props = {
  lectureId: string;
  courseId: string;
  progressVideo: progressLectureProgressType;
  lectureData: CourseContentType[];
};
const CustomVideoPlayer: React.FC<Props> = ({
  lectureId,
  courseId,
  progressVideo,
  lectureData,
}) => {
  const [playing, setPlaying] = useState(false);
  const [isOpenVolumeCard, setIsOpenVolumeCard] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [volume, setVolume] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playbackRate, setPlayBackRate] = useState("1");
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [fullScreenElement, setFullScreenElement] =
    useState<HTMLElement | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const { handleProgress, loaded, played, setPlayed } = useVideoProgress({
    courseId,
    videoUrl: videoUrl,
    seeking,
    lectureId: lectureId,
  });

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
  const hoverTimeoutRef = useRef<any>(null);
  const handlePlay = () => {
    setPlaying(!playing);
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 1000); // 1000 ms = 1s delay
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
    setPlayed((value / 100) * duration);
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
        setPlayed(newTime);
      }
    }, 1000),
    []
  );

  const handleForward = useCallback(
    _.throttle(() => {
      const currentTime = playerRef.current?.getCurrentTime();
      const duration = playerRef.current?.getDuration();
      if (currentTime !== undefined && duration) {
        const newTime = currentTime + 5;
        setPlayed(newTime); // Add 5 seconds to the current time
        playerRef.current?.seekTo(newTime);
      }
    }, 1000),
    []
  );
  const handleChangeVolume = (value: number) => {
    setVolume(value / 100);
  };

  const handelOpenVolumeChange = (open: boolean) => {
    setIsOpenVolumeCard(open);
  };
  const handleChangeOpenSetting = (open: boolean) => {
    setIsOpenSetting(open);
  };

  useEffect(() => {
    setLoading(true);
    const checkProgress = progressVideo.progress.find(
      (item) => item.lectureId === lectureId
    );

    if (checkProgress) {
      playerRef.current?.seekTo(checkProgress.lengthWatched);
      setStartTime(checkProgress.lengthWatched);
    }
    lectureData.forEach((item, index) => {
      const checkLecture = item.lectures.find(
        (lecture) => lecture._id === lectureId
      );
      if (checkLecture) {
        setVideoUrl(checkLecture.videoUrl.url);
      }
    });

    // Set loading to true when videoUrl changes
    setError(false); // Reset error state
  }, [lectureId]);

  const handleReady = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Set loading to false when video is ready
  }, []);

  const handleError = () => {
    setError(true); // Handle video load error
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
    <div ref={containerRef} className="bg-blackA6 min-w-[70%] h-[500px]">
      <div
        className={`relative ${
          isFullScreen ? "w-screen h-screen" : "w-[80%] mx-auto"
        }    mx-auto`}
      >
        <div
          className={`${
            isFullScreen ? "w-screen h-screen" : "min-w-full h-full"
          }  cursor-pointer `}
          onClick={handleVideoClick}
        >
          {videoUrl !== "" && (
            <ReactPlayer
              onStart={() => {
                playerRef.current?.seekTo(startTime);
                setPlayed(startTime);
              }}
              key={videoUrl}
              ref={playerRef}
              url={videoUrl}
              playing={playing}
              volume={volume}
              playbackRate={Number(playbackRate)}
              onClickPreview={handleVideoClick}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onEnded={handleEnded}
              loop
              width="100%"
              height="auto"
              onReady={handleReady}
              onError={handleError}
              className=""
            />
          )}
          {loading && (
            <div className="absolute w-full h-full bg-black left-0 top-0 flex items-center justify-center">
              <Loader />
            </div>
          )}{" "}
        </div>

        <div
          className="z-30 absolute bottom-0 left-0 h-[50px] w-full"
          onMouseEnter={handleMouseEnter}
        />
        {isHovering && (
          <div className="z-40 bottom-0 left-0 absolute h-[1px] w-full bg-gradient-to-t from-blackA10 to-blackA1"></div>
        )}
        {(isHovering || isOpenSetting || isOpenVolumeCard) && (
          <div
            className={`absolute  z-40 group-hover:opacity-100 
             bottom-0 left-0 w-full p-4 transition-opacity duration-300 `}
            onMouseLeave={handleMouseLeave}
          >
            <SlideVideo
              loaded={loaded}
              handleChange={handleSeekChange}
              handleMouseDown={handleSeekMouseDown}
              handleMouseUp={handleSeekMouseUp}
              value={played / duration}
            />

            <PlayerControls
              duration={duration}
              handelOpenVolumeChange={handelOpenVolumeChange}
              handleBackwind={handleBackwind}
              handleChangeOpenSetting={handleChangeOpenSetting}
              handleChangeVolume={handleChangeVolume}
              handleForward={handleForward}
              handlePlay={handlePlay}
              handleSeekChange={handleSeekChange}
              isFullScreen={isFullScreen}
              playbackRate={playbackRate}
              played={played}
              playing={playing}
              setPlayBackRate={setPlayBackRate}
              toggleExpandedView={toggleExpandedView}
              toggleFullScreen={toggleFullScreen}
              volume={volume}
            />
          </div>
        )}
        {showAnimation && (
          <div
            className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  animate-hideVideo opacity-0 flex items-center justify-center text-4xl bg-blackA7 rounded-full w-[80px] h-[80px]`}
          >
            {!playing ? <MdOutlinePause /> : <MdPlayArrow />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
