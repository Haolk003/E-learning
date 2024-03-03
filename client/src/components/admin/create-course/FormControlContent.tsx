import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBin7Line, RiLoader2Fill } from "react-icons/ri";
import * as Form from "@radix-ui/react-form";
import { CiEdit } from "react-icons/ci";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CourseContentDataTypeForm } from "@/types/couresContentType";
import UploadVideo from "@/components/ui/UploadVideo";
import ProgressDemo from "@/components/ui/Progress";
import { IoIosAddCircleOutline, IoIosLink } from "react-icons/io";
import * as RadioGroup from "@radix-ui/react-radio-group";

import {
  useDeleteFileCloudinaryMutation,
  useUploadVideoMutation,
} from "@/features/course/courseApi";
import toast from "react-hot-toast";
import { useStarPercentageQuery } from "@/features/review/reviewApi";

type CourseContent = {
  videoSection: string;
  description: string;
  lectures: {
    title: string;
    videoUrl: { public_id?: string; url: string };
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
  videoType: string[][];
  handleChangeVideoType: (
    sectionIndex: number,
    linkIndex: number,
    value: string
  ) => void;
  handleDeleteVideo: (sectionIndex: number, linkIndex: number) => void;
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
  videoType,
  handleChangeVideoType,
  handleDeleteVideo,
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
                    className="flex flex-col gap-3 mb-2 relative mt-5"
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
                  {!percentUploadVideo[index][LinkIndex].percent && (
                    <RadioGroup.Root
                      value={videoType[index][LinkIndex]}
                      onValueChange={(value) =>
                        handleChangeVideoType(index, LinkIndex, value)
                      }
                      className="flex items-center gap-5 mb-2 mt-5 "
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroup.Item
                          className="dark:bg-gray5 w-[20px] h-[20px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                          value={"file"}
                        >
                          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
                        </RadioGroup.Item>
                        <label className="text-white text-[15px]" htmlFor="r1">
                          Choose File
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioGroup.Item
                          className="dark:bg-gray5 w-[20px] h-[20px] rounded-full shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                          value={"link"}
                        >
                          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
                        </RadioGroup.Item>
                        <label
                          className="text-white text-[15px] leading-none "
                          htmlFor="r1"
                        >
                          Link Video
                        </label>
                      </div>
                    </RadioGroup.Root>
                  )}

                  {videoType[index][LinkIndex] === "link" && (
                    <Form.Field
                      name={`link-url${LinkIndex}`}
                      className="mb-5 flex flex-col gap-2"
                    >
                      <Form.Label className="">Video Url</Form.Label>
                      <Form.Control asChild>
                        <input
                          type="text"
                          placeholder="video url..."
                          {...register(
                            `test.${index}.lectures.${LinkIndex}.videoUrl.url`
                          )}
                          className="bg-transparent border dark:border-white border-black rounded-sm w-full py-[6px] px-2"
                        />
                      </Form.Control>
                    </Form.Field>
                  )}
                  {videoType[index][LinkIndex] === "link" && (
                    <Form.Field
                      name={`link-url${LinkIndex}`}
                      className="mb-5 flex flex-col gap-2"
                    >
                      <Form.Label className="">Video Length</Form.Label>
                      <Form.Control asChild>
                        <input
                          type="text"
                          placeholder="video length (seconds)"
                          {...register(
                            `test.${index}.lectures.${LinkIndex}.duration`
                          )}
                          className="bg-transparent border dark:border-white border-black rounded-sm w-full py-[6px] px-2"
                        />
                      </Form.Control>
                    </Form.Field>
                  )}
                  {videoType[index][LinkIndex] === "file" && (
                    <Form.Field
                      name={`link-url${LinkIndex}`}
                      className="flex flex-col gap-3 mb-4"
                    >
                      <Form.Control asChild>
                        <UploadVideo
                          handleDeleteVideo={handleDeleteVideo}
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
                  )}
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
