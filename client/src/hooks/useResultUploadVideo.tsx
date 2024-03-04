import { useDeleteFileCloudinaryMutation } from "@/features/course/courseApi";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const UseResultUpload = (fields: Array<any>) => {
  const [deleteFile] = useDeleteFileCloudinaryMutation();
  const [resultUpload, setResultUpload] = useState<
    {
      videoUrl: { public_id: string; url: string } | null;
      videoLength: number;
      id: string;
    }[][]
  >(
    Array(1).fill(
      Array(1).fill({
        videoUrl: null,
        videoLength: 0,
        id: uuidv4(),
      })
    )
  );
  const changeIdResultUpload = (
    value: string,
    lectureIndex: number,
    index: number
  ) => {
    const newResult = [...resultUpload];
    newResult[lectureIndex][index].id = value;
    setResultUpload(newResult);
  };
  const addResultLectures = () => {
    const newResult = [...resultUpload];
    newResult.push([
      {
        videoUrl: null,
        videoLength: 0,
        id: uuidv4(),
      },
    ]);
    setResultUpload(newResult);
  };
  const addResultPercentLink = (index: number) => {
    const newResult = [...resultUpload];
    newResult[index].push({
      videoUrl: null,
      videoLength: 0,
      id: uuidv4(),
    });
    setResultUpload(newResult);
  };
  const deleteResulteUploadVideo = (
    sectionIndex: number,
    linkIndex: number
  ) => {
    const newResult = [...resultUpload];
    newResult[sectionIndex][linkIndex] = {
      videoUrl: null,
      videoLength: 0,
      id: uuidv4(),
    };
    setResultUpload(newResult);
  };
  const removeResultSection = (index: number) => {
    const newResult = [...resultUpload];
    newResult.splice(index, 1);
    setResultUpload(newResult);
  };
  const removeResultLink = (sectionIndex: number, index: number) => {
    const newUploadVideo = [...resultUpload];
    newUploadVideo[sectionIndex].splice(index, 1);
    setResultUpload(newUploadVideo);
  };
  const findIdAndUpdateResult = (
    id: string,
    value: {
      videoUrl: { public_id: string; url: string } | null;
      videoLength: number;
    }
  ) => {
    setResultUpload((percent) => {
      return percent.map((item, precentIndex) => {
        return item.map((item2, index2) => {
          if (item2.id === id) {
            return {
              ...item2,
              videoUrl: value.videoUrl,
              videoLength: value.videoLength,
            };
          } else {
            return item2;
          }
        });
      });
    });
  };

  return {
    removeResultLink,
    findIdAndUpdateResult,
    addResultPercentLink,
    removeResultSection,
    changeIdResultUpload,
    addResultLectures,
    resultUpload,
    setResultUpload,
    deleteResulteUploadVideo,
  };
};

export default UseResultUpload;
