import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBin7Line, RiLoader2Fill } from "react-icons/ri";
import * as Form from "@radix-ui/react-form";
import { CiEdit } from "react-icons/ci";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CourseContentDataTypeForm } from "@/types/couresContentType";
import UploadVideo from "@/components/ui/UploadVideo";
import ProgressDemo from "@/components/ui/Progress";
import { IoIosAddCircleOutline, IoIosLink } from "react-icons/io";

import {
  useDeleteFileCloudinaryMutation,
  useUploadVideoMutation,
} from "@/features/course/courseApi";
import toast from "react-hot-toast";

type CourseContent = {
  videoSection: string;
  description: string;
  lectures: {
    title: string;
    videoUrl: { public_id: string; url: string };
    duration: number;
  }[];
};
type Props = {
  item: CourseContent;
  index: number;
  fields: CourseContent[];
  loadingUploadVideo: {
    isLoading: boolean;
    id: string;
  }[][];
  isCollased: boolean[];
  errors: FieldErrors<{ test: CourseContentDataTypeForm[] }>;
  percentUploadVideo: {
    percent: number;
    id: string;
  }[][];
  register: UseFormRegister<{ test: CourseContentDataTypeForm[] }>;
  toggleCollased: (index: number) => void;
  handelRemoveSection: (index: number) => void;
  handleRemoveLink: (sectionIndex: number, linkIndex: number) => void;
  changeIdLoading: (value: string, lectureIndex: number, index: number) => void;
  changeIdUpload: (value: string, lectureIndex: number, index: number) => void;
  handleAddLink: (index: number) => void;
  handleCancelUpload: (index: number, linkIndex: number) => void;
  handleAddNewSection: () => void;
  findIdAndUpdate: (id: string, value: boolean) => void;
};
const FormControlContent: FC<Props> = ({
  item,
  index,
  fields,
  register,
  isCollased,
  toggleCollased,
  handelRemoveSection,
  handleRemoveLink,
  errors,
  changeIdLoading,
  loadingUploadVideo,
  changeIdUpload,
  percentUploadVideo,
  handleAddLink,
  handleCancelUpload,
  handleAddNewSection,
  findIdAndUpdate,
}) => {
  const [
    uploadVideo,
    { isSuccess: successUploadVideo, error: errorUploadVideo, data },
  ] = useUploadVideoMutation();
  const [deleteFile] = useDeleteFileCloudinaryMutation();
  useEffect(() => {
    if (successUploadVideo) {
      if (data.data) {
        findIdAndUpdate(data.data, true);
      }
    }
    if (errorUploadVideo && "data" in errorUploadVideo) {
      const errorData = errorUploadVideo.data as any;
      toast.error(errorData.message);
    }
  }, [successUploadVideo, errorUploadVideo, data]);

  return (
    <div
      className="bg-[#111A27]  py-3 relative px-3 duration-200 rounded-md mb-5"
      key={index}
    >
      <div className="flex items-center gap-1 absolute right-2 top-3">
        <button
          disabled={fields.length <= 1}
          onClick={() => handelRemoveSection(index)}
          type="button"
          className="disabled:text-gray-500"
        >
          <RiDeleteBin7Line />
        </button>
        <button
          className={`text-2xl  ${
            isCollased[index] ? "rotate-180" : "rotate-0"
          } duration-200`}
          type="button"
          onClick={() => toggleCollased(index)}
        >
          <MdOutlineKeyboardArrowDown />
        </button>
      </div>

      <div className="">
        <Form.Field
          name={`videoSection${index}`}
          className="flex items-center gap-2 mb-4 "
        >
          <Form.Control asChild>
            <input
              type="text"
              {...register(`test.${index}.videoSection`, {
                required: true,
              })}
              className="bg-transparent border-none outline-none w-[150px]"
            />
          </Form.Control>
          <CiEdit className="text-2xl" />
        </Form.Field>
        {!isCollased[index] && (
          <div>
            <Form.Field
              name={`description${index}`}
              className="flex flex-col gap-3 mb-4"
            >
              <Form.Label>Video Description</Form.Label>
              <Form.Control asChild>
                <input
                  type="text"
                  placeholder="video desctiption..."
                  {...register(`test.${index}.description`, {
                    required: true,
                  })}
                  className="bg-transparent border dark:border-white border-black rounded-sm w-full py-[6px] px-2"
                />
              </Form.Control>
              {errors.test && errors.test[index]?.description && (
                <span className="text-red-500 text-[13px]"></span>
              )}
            </Form.Field>
            {item.lectures.map((_link, LinkIndex) => {
              return (
                <div key={LinkIndex}>
                  <Form.Field
                    name={`link-title${LinkIndex}`}
                    className="flex flex-col gap-3 mb-2 relative"
                  >
                    <button
                      className="absolute top-2 right-3"
                      onClick={() => handleRemoveLink(index, LinkIndex)}
                    >
                      <RiDeleteBin7Line />
                    </button>
                    <Form.Label>Link {LinkIndex + 1}</Form.Label>
                    <Form.Control asChild>
                      <input
                        type="text"
                        placeholder="Source Code (link title)..."
                        {...register(
                          `test.${index}.lectures.${LinkIndex}.title`,
                          { required: true }
                        )}
                        className="bg-transparent border dark:border-white border-black rounded-sm w-full py-[6px] px-2"
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field
                    name={`link-url${LinkIndex}`}
                    className="flex flex-col gap-3 mb-4"
                  >
                    <Form.Control asChild>
                      <UploadVideo
                        handleCancelUpload={handleCancelUpload}
                        loadingUploadVideo={loadingUploadVideo}
                        percentUploadVideo={percentUploadVideo}
                        videoUrl={
                          fields[index].lectures[LinkIndex].videoUrl.url
                        }
                        changeIdLoading={changeIdLoading}
                        changeIdUpload={changeIdUpload}
                        lectureIndex={LinkIndex}
                        sectionIndex={index}
                        uploadVideo={uploadVideo}
                      />
                    </Form.Control>
                  </Form.Field>
                </div>
              );
            })}

            <button
              type="button"
              className="flex items-center gap-3"
              onClick={() => handleAddLink(index)}
            >
              <IoIosLink />
              Add Link
            </button>
          </div>
        )}
      </div>
      {index + 1 === fields.length && (
        <button
          type="button"
          className="flex items-center gap-3"
          onClick={handleAddNewSection}
        >
          <IoIosAddCircleOutline />
          Add new Content
        </button>
      )}
    </div>
  );
};

export default FormControlContent;
