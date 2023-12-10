import React, { ChangeEvent, useCallback, FC } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import CoursePlayer from "./CoursePlayer";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import ProgressDemo from "./Progress";
import { RiLoader2Fill } from "react-icons/ri";

type Props = {
  sectionIndex: number;
  lectureIndex: number;
  videoUrl: string;
  uploadVideo: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      any,
      "api"
    >
  >;
  changeIdUpload: (value: string, lectureIndex: number, index: number) => void;
  changeIdLoading: (value: string, lectureIndex: number, index: number) => void;
  handleCancelUpload: (index: number, linkIndex: number) => void;
  loadingUploadVideo: {
    isLoading: boolean;
    id: string;
  }[][];
  percentUploadVideo: {
    percent: number;
    id: string;
  }[][];
};
const UploadVideo: FC<Props> = ({
  changeIdLoading,
  changeIdUpload,
  lectureIndex,
  sectionIndex,
  uploadVideo,
  videoUrl,
  handleCancelUpload,
  loadingUploadVideo,
  percentUploadVideo,
}) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles) {
      const id = uuidv4();
      changeIdUpload(id, sectionIndex, lectureIndex);
      const formData = new FormData();
      formData.append("myFile", acceptedFiles[0]);
      changeIdLoading(id, sectionIndex, lectureIndex);
      await uploadVideo({
        data: formData,
        id: id,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop: onDrop,
    maxSize: 104857600, // 100MB in bytes
    accept: { "video/*": [".mp4", ".mp3"] },
  });
  return (
    <div className="w-full h-[400px] mb-3 relative  border-dashed dark:border-white border-black border-[2px] rounded-sm">
      {!loadingUploadVideo[sectionIndex][lectureIndex].isLoading && (
        <div
          {...getRootProps()}
          className=" flex flex-col items-center justify-center gap-3 h-full"
        >
          <FaPhotoVideo className="text-7xl" />
          <p>Drag and drop video file</p>
          <input
            type="file"
            {...getInputProps()}
            className="w-full h-full absolute bg-transparent cursor-pointer"
          />

          {!loadingUploadVideo[sectionIndex][lectureIndex].isLoading &&
            videoUrl !== "" && (
              <button
                type="button"
                className="absolute bottom-2 bg-gray8 py-2 px-3 rounded-md left-[50%] -translate-x-1/2 text-[14px]"
              >
                Change Video
              </button>
            )}
        </div>
      )}
      {!loadingUploadVideo[sectionIndex][lectureIndex].isLoading &&
      videoUrl !== "" ? (
        <div className="absolute top-[50%]  left-[50%] z-50 -translate-y-1/2 -translate-x-1/2 w-[80%] h-[300px] flex items-center justify-center">
          <CoursePlayer videoUrl={videoUrl} />
        </div>
      ) : (
        <></>
      )}
      {loadingUploadVideo[sectionIndex][lectureIndex].isLoading && (
        <div className="w-[60%] absolute top-[50%]  left-[50%] z-50 -translate-y-1/2 -translate-x-1/2">
          <ProgressDemo
            progress={percentUploadVideo[sectionIndex][lectureIndex].percent}
          />
          <div className="flex items-center justify-between mt-2  ">
            <div className="flex items-center gap-2">
              <RiLoader2Fill className="animate-spin" /> Uploading
            </div>
            <button
              type="button"
              onClick={() => handleCancelUpload(sectionIndex, lectureIndex)}
              className="text-[13px] border dark:border-white border-black rounded-sm px-2 "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
