import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const usePercentUploadVideo = (fields: Array<any>) => {
  const [percentUploadVideo, setPercentUploadVideo] = useState<
    { percent: number; id: string }[][]
  >(
    Array(1).fill(
      Array(1).fill({
        percent: 0,
        id: uuidv4(),
      })
    )
  );
  const changeIdUpload = (
    value: string,
    lectureIndex: number,
    index: number
  ) => {
    const newLoading = [...percentUploadVideo];
    newLoading[lectureIndex][index].id = value;
    setPercentUploadVideo(newLoading);
  };
  const addPercentLectures = () => {
    const newLoading = [...percentUploadVideo];
    newLoading.push([{ percent: 0, id: uuidv4() }]);
    setPercentUploadVideo(newLoading);
  };

  const deleteVideoPercentLecture = (
    sectionIndex: number,
    linkIndex: number
  ) => {
    const newPercent = [...percentUploadVideo];
    newPercent[sectionIndex][linkIndex].percent = 0;
    setPercentUploadVideo(newPercent);
  };
  const addPercentLink = (index: number) => {
    // const newLoading = [percentUploadVideo];
    // newLoading[index].push({ percent: 0, id: uuidv4() });
    setPercentUploadVideo((percent) => {
      return percent.map((item, precentIndex) => {
        if (index === precentIndex) {
          return [...item, { percent: 0, id: uuidv4() }];
        } else {
          return item;
        }
      });
    });
  };
  const removePercentSection = (index: number) => {
    const newLoading = [...percentUploadVideo];
    newLoading.splice(index, 1);
    setPercentUploadVideo(newLoading);
  };
  const removePercentLink = (sectionIndex: number, index: number) => {
    const newUploadVideo = [...percentUploadVideo];
    newUploadVideo[sectionIndex].splice(index, 1);
    setPercentUploadVideo(newUploadVideo);
  };
  const findIdAndUpdatePercent = (id: string, value: number) => {
    setPercentUploadVideo((percent) => {
      return percent.map((item, precentIndex) => {
        return item.map((item2, index2) => {
          if (item2.id === id) {
            return { ...item2, percent: value };
          } else {
            return item2;
          }
        });
      });
    });
  };
  return {
    percentUploadVideo,
    setPercentUploadVideo,
    removePercentSection,
    removePercentLink,
    addPercentLink,
    addPercentLectures,
    changeIdUpload,
    findIdAndUpdatePercent,
    deleteVideoPercentLecture,
  };
};

export default usePercentUploadVideo;
