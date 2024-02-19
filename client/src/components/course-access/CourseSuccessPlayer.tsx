import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import ReactPlayer from "react-player";
import _ from "lodash";
import { useRouter } from "next/navigation";

import useVideoProgress from "@/hooks/useVideoProgress";

import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { progressLectureProgressType } from "@/types/progressLectureUserType";

import { motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import TooltipDemo from "../ui/Tootip";
import Loader from "../loader/Loader";
import PlayerControls from "./PlayerControl";
import SlideVideo from "../ui/slide/SlideVideo";

import { CourseContentType } from "@/types/couresContentType";
import { NoteCourseType } from "@/types/noteCouresType";
import FullScreenPortal from "@/utils/FullScreen";

type Props = {
  lectureId: string;
  courseId: string;
  progressVideo: progressLectureProgressType;
  lectureData: CourseContentType[];
  played: number;
  setPlayed: Dispatch<SetStateAction<number>>;
  notes: NoteCourseType[];
};
const CustomVideoPlayer: React.FC<Props> = ({
  lectureId,
  courseId,
  progressVideo,
  lectureData,
  played,
  setPlayed,
  notes,
}) => {
  const router = useRouter();

  // Setting initial states and references
  const [playing, setPlaying] = useState(false);
  const [isOpenVolumeCard, setIsOpenVolumeCard] = useState(false);
  const [videoSelectedIndex, setVideoSelectedIndex] = useState<{
    sectionIndex: number;
    lectureIndex: number;
  } | null>(null);
  const [nextLectureTitle, setNextLectureTitlte] = useState("");
  const [prevLectureTitle, setPrevLectureTitle] = useState("");
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
  const [videoTitle, setVideoTitle] = useState("");

  const [pointSaved, setPointSaved] = useState<number[]>([]);

  const { handleProgress, loaded } = useVideoProgress({
    courseId,
    videoUrl: videoUrl,
    seeking,
    lectureId: lectureId,
    played,
    setPlayed,
    lectureTitle: videoTitle,
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

  // Handles the hover effect when the user hovers over the video
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovering(true);
  };

  // Handles removing the hover effect when the user leaves the video area
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 4000); // 1000 ms = 1s delay
  };

  // Toggles the fullscreen mode of the video player
  const toggleFullScreen = () => {
    const container = containerRef.current;
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };
  // Toggles the expanded view of the player
  const toggleExpandedView = () => {
    setIsExpandedView(!isExpandedView);
  };

  // Handles the dragging start of the seek bar
  const handleSeekMouseDown = (e: any) => {
    setSeeking(true);
  };
  const handleReady = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Set loading to false when video is ready
  }, []);

  const handleError = () => {
    setError(true); // Handle video load error
  };

  // Handles the change in position of the seek bar
  const handleSeekChange = (value: any) => {
    setPlayed((value / 100) * duration);
  };

  // Handles the release of the seek bar after dragging
  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);
    playerRef.current?.seekTo(played);
  };

  // Sets the duration of the video
  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // Handles the end of the video playback
  const handleEnded = () => {
    // Code to play the next video in the playlist
  };

  // Handles the play and pause functionality of the video
  const handleVideoClick = () => {
    setPlaying(!playing);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  };

  // Function to rewind the video by a set interval
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

  // Function to fast forward the video by a set interval
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

  // Handles volume change
  const handleChangeVolume = (value: number) => {
    setVolume(value / 100);
  };

  // Handles opening and closing the volume car
  const handelOpenVolumeChange = (open: boolean) => {
    setIsOpenVolumeCard(open);
  };

  const handleIsOpenVolume = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  // Handles opening and closing the settings menu
  const handleChangeOpenSetting = (open: boolean) => {
    setIsOpenSetting(open);
  };

  // Handles the action to move to the next lecture
  const handleNextLecture = () => {
    if (videoSelectedIndex) {
      const { lectureIndex, sectionIndex } = videoSelectedIndex;
      if (
        videoSelectedIndex.lectureIndex !==
        lectureData[sectionIndex].lectures.length - 1
      ) {
        router.push(
          `/course-access/${courseId}/lecture/${
            lectureData[sectionIndex].lectures[lectureIndex + 1]._id
          }`
        );
      } else if (
        videoSelectedIndex.lectureIndex ===
          lectureData[sectionIndex].lectures.length - 1 &&
        sectionIndex < lectureData.length - 1
      ) {
        router.push(
          `/course-access/${courseId}/lecture/${
            lectureData[sectionIndex + 1].lectures[0]._id
          }`
        );
      }
    }
  };

  // Handles the action to move to the previous lecture
  const handlePrevLecture = () => {
    if (videoSelectedIndex) {
      const { lectureIndex, sectionIndex } = videoSelectedIndex;
      if (videoSelectedIndex.lectureIndex > 0) {
        router.push(
          `/course-access/${courseId}/lecture/${
            lectureData[sectionIndex].lectures[lectureIndex - 1]._id
          }`
        );
      } else if (
        videoSelectedIndex.lectureIndex === 0 &&
        videoSelectedIndex.sectionIndex !== 0
      ) {
        router.push(
          `/course-access/${courseId}/lecture/${
            lectureData[sectionIndex - 1].lectures[
              lectureData[sectionIndex - 1].lectures.length - 1
            ]._id
          }`
        );
      }
    }
  };

  // Loading and error handling effects
  useEffect(() => {
    setLoading(true);
    const checkProgress =
      progressVideo &&
      progressVideo.progress.find((item) => item.lectureId === lectureId);

    if (checkProgress) {
      playerRef.current?.seekTo(checkProgress.lengthWatched);
      setStartTime(checkProgress.lengthWatched);
    }
    lectureData.forEach((item, index) => {
      const checkLecture = item.lectures.findIndex(
        (lecture) => lecture._id === lectureId
      );
      if (checkLecture >= 0) {
        setVideoSelectedIndex({
          lectureIndex: checkLecture,
          sectionIndex: index,
        });
        setVideoUrl(item.lectures[checkLecture].videoUrl.url);
        setVideoTitle(item.lectures[checkLecture].title);
      }
    });

    // Set loading to true when videoUrl changes
    setError(false); // Reset error state
  }, [lectureId]);

  useEffect(() => {
    if (videoSelectedIndex) {
      const { lectureIndex, sectionIndex } = videoSelectedIndex;
      const countTotalLecturePrev = lectureData.reduce((total, item, index) => {
        if (index < sectionIndex) {
          return total + item.lectures.length;
        } else if (index === sectionIndex) {
          return total + lectureIndex + 1;
        } else {
          return total;
        }
      }, 0);

      if (videoSelectedIndex.lectureIndex > 0) {
        setPrevLectureTitle(`${countTotalLecturePrev - 1} .
          ${lectureData[sectionIndex].lectures[lectureIndex - 1].title} `);
      } else if (
        videoSelectedIndex.lectureIndex === 0 &&
        videoSelectedIndex.sectionIndex !== 0
      ) {
        setPrevLectureTitle(`${countTotalLecturePrev - 1} .
          ${
            lectureData[sectionIndex - 1].lectures[
              lectureData[sectionIndex - 1].lectures.length - 1
            ].title
          }`);
      } else {
        setPrevLectureTitle("");
      }
      if (
        videoSelectedIndex.lectureIndex !==
        lectureData[sectionIndex].lectures.length - 1
      ) {
        setNextLectureTitlte(`${countTotalLecturePrev + 1} .
          ${lectureData[sectionIndex].lectures[lectureIndex + 1].title}
        `);
      } else if (
        videoSelectedIndex.lectureIndex ===
          lectureData[sectionIndex].lectures.length - 1 &&
        sectionIndex < lectureData.length - 1
      ) {
        setNextLectureTitlte(
          `${countTotalLecturePrev + 1}. New Section - ${
            lectureData[sectionIndex + 1].lectures[0].title
          }`
        );
      } else {
        setNextLectureTitlte("");
      }
    }
  }, [videoSelectedIndex]);

  // Effect for handling fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (notes && duration > 0) {
      const fomatterSaved = notes.reduce((list: number[], note) => {
        if (note.lectureId === lectureId) {
          return [...list, (note.timing / duration) * 100];
        } else {
          return list;
        }
      }, []);

      setPointSaved(fomatterSaved);
    }
  }, [notes, duration]);

  return (
    <div ref={containerRef} className="bg-blackA6 min-w-[70%] h-auto relative">
      <div
        className={`relative ${
          isFullScreen ? "" : "w-[80%] mx-auto"
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
              height="100%"
              onReady={handleReady}
              onError={handleError}
              className=""
            />
          )}
          {loading && (
            <div className="absolute w-full h-full bg-black left-0 top-0 flex items-center justify-center">
              <Loader />
            </div>
          )}
        </div>

        <div
          className="z-30 absolute bottom-0 left-0 h-[50px] w-full"
          onMouseEnter={handleMouseEnter}
        />

        {isHovering && (
          <div className="z-30 bottom-0 left-0  absolute h-[100px] w-full bg-gradient-to-t from-blackA7 to-blackA1"></div>
        )}

        <motion.div
          className={`absolute  z-40 
             bottom-0 left-0 w-full p-4  ${
               isHovering || isOpenSetting || isOpenVolumeCard
                 ? "block"
                 : "hidden"
             }`}
          initial="hidden"
          animate={
            isHovering || isOpenSetting || isOpenVolumeCard
              ? "visible"
              : "hidden"
          }
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onMouseLeave={handleMouseLeave}
        >
          <SlideVideo
            loaded={loaded}
            handleChange={handleSeekChange}
            handleMouseDown={handleSeekMouseDown}
            handleMouseUp={handleSeekMouseUp}
            value={played / duration}
            pointSaved={pointSaved}
          />
          {/* {isFullScreen && (
            <FullScreenPortal>
              <PlayerControls
                duration={duration}
                handleIsOpenVolume={handleIsOpenVolume}
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
            </FullScreenPortal>
          )} */}

          <PlayerControls
            duration={duration}
            handleIsOpenVolume={handleIsOpenVolume}
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
        </motion.div>

        {showAnimation && (
          <div
            className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  animate-hideVideo opacity-0 flex items-center justify-center text-4xl bg-blackA7 rounded-full w-[80px] h-[80px]`}
          >
            {!playing ? <MdOutlinePause /> : <MdPlayArrow />}
          </div>
        )}
      </div>
      <div
        className="z-30 absolute top-[50%] -translate-y-[50%] left-0 h-[100px] w-[100px]"
        onMouseEnter={handleMouseEnter}
      />
      <div
        className="z-30 absolute top-[50%] -translate-y-[50%] right-0 h-[100px] w-[100px]"
        onMouseEnter={handleMouseEnter}
      />
      {prevLectureTitle !== "" && (
        <motion.div
          className={`absolute  z-40 
             top-[50%] -translate-y-1/2 left-0 flex items-center justify-center border border-white h-[50px] w-[40px] text-white text-2xl  ${
               isHovering || isOpenSetting || isOpenVolumeCard
                 ? "block"
                 : "hidden"
             }`}
          initial="hidden"
          animate={
            isHovering || isOpenSetting || isOpenVolumeCard
              ? "visible"
              : "hidden"
          }
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onMouseLeave={handleMouseLeave}
        >
          <TooltipDemo content={prevLectureTitle} side="left">
            <button onClick={() => handlePrevLecture()} className="text-4xl">
              <IoIosArrowBack />
            </button>
          </TooltipDemo>
        </motion.div>
      )}
      {nextLectureTitle !== "" && (
        <motion.div
          className={`absolute  z-40 
             top-[50%] -translate-y-1/2 right-0 flex items-center justify-center border border-white h-[50px] w-[40px] text-white text-2xl  ${
               isHovering || isOpenSetting || isOpenVolumeCard
                 ? "block"
                 : "hidden"
             }`}
          initial="hidden"
          animate={
            isHovering || isOpenSetting || isOpenVolumeCard
              ? "visible"
              : "hidden"
          }
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onMouseLeave={handleMouseLeave}
        >
          <TooltipDemo content={nextLectureTitle} side="left">
            <button onClick={() => handleNextLecture()} className="text-4xl">
              <IoIosArrowForward />
            </button>
          </TooltipDemo>
        </motion.div>
      )}
      {isFullScreen && <div id="modal-root"></div>}
    </div>
  );
};

export default CustomVideoPlayer;
