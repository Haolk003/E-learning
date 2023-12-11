import React, { FC } from "react";

type Props = {
  duration: number;
};
const ConvertDuratonVideo: FC<Props> = ({ duration }) => {
  if (duration < 3600) {
    return (
      <div className="flex items-center">
        <p> {Math.floor(duration / 60)}</p>:
        <p>
          {" "}
          {Math.round(duration - 60 * Math.floor(duration / 60)) < 10
            ? "0" + Math.round(duration - 60 * Math.floor(duration / 60))
            : Math.round(duration - 60 * Math.floor(duration / 60))}
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex items-center">
        {Math.floor(duration / 3600)}:
        <p> {Math.round(duration - 3600 * Math.floor(duration / 3600))}</p>
      </div>
    );
  }
};

export default ConvertDuratonVideo;
