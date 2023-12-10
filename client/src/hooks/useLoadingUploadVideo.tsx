import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const useLoadingUploadVideo = (fields: Array<any>) => {
  const [loadingUploadVideo, setLoadingUploadVideo] = useState<
    { isLoading: boolean; id: string }[][]
  >([[{ isLoading: false, id: uuidv4() }]]);
  const changeIsLoading = (
    value: boolean,
    lectureIndex: number,
    index: number
  ) => {
    const newLoading = [...loadingUploadVideo];
    newLoading[lectureIndex][index].isLoading = value;
    setLoadingUploadVideo(newLoading);
  };
  const addLoadingLectures = () => {
    const newLoading = [...loadingUploadVideo];
    newLoading.push([{ isLoading: false, id: uuidv4() }]);
    setLoadingUploadVideo(newLoading);
  };
  const addLoadingLink = (index: number) => {
    const newLoading = [...loadingUploadVideo];
    newLoading[index].push({ isLoading: false, id: uuidv4() });
    setLoadingUploadVideo(newLoading);
  };
  const removeLoadingSection = (index: number) => {
    const newLoading = [...loadingUploadVideo];
    newLoading.splice(index, 1);
    setLoadingUploadVideo(newLoading);
  };
  const removeLoadingLink = (sectionIndex: number, index: number) => {
    const newLoading = [...loadingUploadVideo];
    newLoading[sectionIndex].splice(index, 1);
    setLoadingUploadVideo(newLoading);
  };
  const findIdAndUpdate = (id: string, value: boolean) => {
    setLoadingUploadVideo((percent) => {
      return percent.map((item, precentIndex) => {
        return item.map((item2, index2) => {
          if (item2.id === id) {
            return { ...item2, isLoading: value };
          } else {
            return item2;
          }
        });
      });
    });
  };
  const changeIdLoading = (
    value: string,
    lectureIndex: number,
    index: number
  ) => {
    const newLoading = [...loadingUploadVideo];
    newLoading[lectureIndex][index].id = value;
    setLoadingUploadVideo(newLoading);
  };
  const checkLoadingById = (id: string) => {
    let isLoading = false;
    loadingUploadVideo.forEach((loadingItem) => {
      const findValueLoading = loadingItem.find((item) => item.id === id);
      if (findValueLoading) {
        isLoading = findValueLoading.isLoading;
      }
    });
    return isLoading;
  };
  return {
    loadingUploadVideo,
    setLoadingUploadVideo,
    addLoadingLectures,
    changeIsLoading,
    removeLoadingLink,
    removeLoadingSection,
    addLoadingLink,
    findIdAndUpdate,
    changeIdLoading,
    checkLoadingById,
  };
};

export default useLoadingUploadVideo;
