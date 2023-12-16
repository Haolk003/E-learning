import { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { useUpdateLengthWatchedMutation } from "@/features/course/courseApi";

const useVideoProgress = ({
  videoUrl,
  seeking,
  courseId,
  lectureId,
}: {
  videoUrl: string;
  courseId: string;
  lectureId: string;
  seeking: boolean;
}) => {
  const [updateLengthWatched] = useUpdateLengthWatchedMutation();
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState(0);

  const debouncedIUpdateLengthWatched = useCallback(
    _.debounce(async (playedTime: number) => {
      await updateLengthWatched({
        lectureId,
        courseId,
        lengthWatched: playedTime,
      });
      setLastSavedTime(playedTime);
    }, 5000), // Update every 30 seconds
    [videoUrl]
  );

  const handleProgress = useCallback(
    (state: { played: number; loaded: number; playedSeconds: number }) => {
      if (!seeking) {
        setPlayed(state.playedSeconds);
        setLoaded(state.loaded);
        if (Math.abs(lastSavedTime - state.playedSeconds) > 5) {
          debouncedIUpdateLengthWatched(state.playedSeconds);
        }
      }
    },
    [lastSavedTime, debouncedIUpdateLengthWatched]
  );
  useEffect(() => {
    // Save progress when user leaves
    const handleBeforeUnload = () => {
      debouncedIUpdateLengthWatched.flush(); // Immediately invoke the debounced function
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      debouncedIUpdateLengthWatched.flush(); // Save progress on unmount
    };
  }, [debouncedIUpdateLengthWatched]);

  return {
    played,
    handleProgress,
    loaded,
    setPlayed,
  };
};

export default useVideoProgress;
