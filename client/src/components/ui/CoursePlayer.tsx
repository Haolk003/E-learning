import React, { FC, useState, useRef, useEffect } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { FaGooglePlay } from "react-icons/fa";
type Props = {
  videoUrl: string;
};
const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<ReactPlayer>(null);

  const [isPause, setIsPause] = useState(true);
  const [isControl, setIsControl] = useState(false);
  if (videoRef.current) {
  }

  return (
    <div style={{ position: "relative" }}>
      {videoUrl && (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls={isControl}
          playIcon={<FaGooglePlay />}
          playing={!isPause}
          ref={videoRef}
          onPause={() => {
            setIsPause(true);
          }}
          onPlay={() => {
            setIsPause(false);
            setIsControl(true);
          }}
        />
      )}
      {isPause && (
        <div
          onClick={() => setIsPause(false)}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-5xl cursor-pointer bg-blackA3 text-green-500"
        >
          <FaGooglePlay />
        </div>
      )}
    </div>
  );
};

export default CoursePlayer;
