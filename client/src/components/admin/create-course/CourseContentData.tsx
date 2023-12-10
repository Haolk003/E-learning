"use client";

import React, { FC, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { useRouter } from "next/navigation";
import { useCreateCourseStep3Mutation } from "@/features/course/courseApi";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import socketIO from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import useLoadingUploadVideo from "@/hooks/useLoadingUploadVideo";
import usePercentUploadVideo from "@/hooks/usePercentUploadVideo";
import { CourseContentDataValidate } from "@/validations/createCourseValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeleteFileCloudinaryMutation } from "@/features/course/courseApi";

import { useGetCourseAdminQuery } from "@/features/course/courseApi";
import { CourseContentType } from "@/types/couresContentType";
import FormControlContent from "./FormControlContent";

import { CourseContentDataTypeForm } from "@/types/couresContentType";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(`${ENDPOINT}`, { transports: ["websocket"] });

type Props = {
  id: string;
};
const CourseContentData: FC<Props> = ({ id }) => {
  const {
    data: courseData,
    isLoading: loadingGetCourse,
    error: errorGetCourse,
  } = useGetCourseAdminQuery(id);
  const router = useRouter();
  const [updateCourse, { isLoading, isSuccess, error }] =
    useCreateCourseStep3Mutation();
  const [deleteFile] = useDeleteFileCloudinaryMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, submitCount },
    reset,
  } = useForm<CourseContentDataTypeForm>({
    defaultValues: {
      test: [
        {
          description: "",
          lectures: [
            {
              title: "",
              videoUrl: { public_id: "", url: "" },
              duration: 0,
            },
          ],
          videoSection: "Untitled Section",
        },
      ],
    },
    resolver: yupResolver(CourseContentDataValidate),
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "test",
  });

  const {
    addLoadingLectures,
    addLoadingLink,
    findIdAndUpdate,
    changeIsLoading,
    loadingUploadVideo,
    removeLoadingLink,
    removeLoadingSection,
    changeIdLoading,
    checkLoadingById,
    setLoadingUploadVideo,
  } = useLoadingUploadVideo(fields);
  const {
    addPercentLectures,
    addPercentLink,
    changeIdUpload,
    percentUploadVideo,
    removePercentLink,
    removePercentSection,
    findIdAndUpdatePercent,
    setPercentUploadVideo,
  } = usePercentUploadVideo(fields);

  const [isCollased, setIsCollapsed] = useState<boolean[]>(
    Array(fields.length).fill(false)
  );
  const [typeButton, setTypeButton] = useState("next");
  const [cancleFileId, setCancleFileId] = useState<string[]>([]);
  //toggle collapse section
  const toggleCollased = (index: number) => {
    const updateCollased = [...isCollased];

    updateCollased[index] = !updateCollased[index];
    setIsCollapsed(updateCollased);
  };
  const onSubmit = async (data: CourseContentDataTypeForm) => {
    if (data) {
      const fomatData = data.test.map((item, _index) => {
        return {
          description: item.description,
          lectures: item.lectures,
          videoSection: item.videoSection,
        };
      }, []);
      await updateCourse({ courseId: id, data: fomatData });
    }
  };
  //new section
  const handleAddNewSection = () => {
    addLoadingLectures();
    addPercentLectures();
    append({
      description: "",
      lectures: [
        {
          title: "",
          videoUrl: { public_id: "", url: "" },
          duration: 0,
        },
      ],
      videoSection: `Untitled Section ${fields.length}`,
    });
  };
  // new link in section index
  const handleAddLink = (sectionIndex: number) => {
    const links = fields[sectionIndex].lectures;
    addLoadingLink(sectionIndex);
    addPercentLink(sectionIndex);

    update(sectionIndex, {
      ...fields[sectionIndex],
      lectures: [
        ...links,
        { title: "", videoUrl: { public_id: "", url: "" }, duration: 0 },
      ],
    });
  };
  // remove link in section index
  const handleRemoveLink = (sectionIndex: number, linkIndex: number) => {
    removeLoadingLink(sectionIndex, linkIndex);
    removePercentLink(sectionIndex, linkIndex);

    const newSection = { ...fields[sectionIndex] };
    newSection.lectures.splice(linkIndex, 1);
    update(sectionIndex, { ...newSection });
  };
  //remove section
  const handelRemoveSection = (sectionIndex: number) => {
    removeLoadingSection(sectionIndex);
    removePercentSection(sectionIndex);
    remove(sectionIndex);
  };
  //back to step 2
  const prevButton = () => {
    router.push(`/admin/create-course/step2/${id}`);
  };

  //show error
  useEffect(() => {
    if (errors.test) {
      toast.error("Please enter all field");
    }
  }, [submitCount]);

  //cancel upload video

  const handleCancelUpload = (lectureIndex: number, linkIndex: number) => {
    changeIsLoading(false, lectureIndex, linkIndex);
    const findId = loadingUploadVideo[lectureIndex][linkIndex].id;
    if (findId) {
      setCancleFileId((item) => [...item, findId]);
    }
  };

  useEffect(() => {
    // if update course success next to step4
    if (isSuccess) {
      if (typeButton === "next") {
        router.push(`/admin/create-course/step4/${id}`);
      } else {
        router.push(`/admin`);
      }
    }
    if (error && "data" in error) {
      const errorData = error.data as any;
      toast.error(errorData.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    //show percent upload from server socket
    socketId.on("percent-upload", (data) => {
      if (data) {
        const { result, id } = data;
        findIdAndUpdatePercent(id, result);
      }
    });
  }, [socketId.hasListeners("percent-upload")]);

  useEffect(() => {
    // show url video if upload success
    socketId.once("video-result", function onVideoResult(data) {
      const { result, id } = data;
      const checkCancleFileId = cancleFileId.find((item) => item === id);

      if (checkLoadingById(id)) {
        loadingUploadVideo.forEach((item, index) => {
          const linkIndex = item.findIndex((item2, _index2) => item2.id === id);

          if (linkIndex !== -1) {
            const fieldLectures = fields[index].lectures.map(
              (item3, lectureIndex) => {
                if (lectureIndex === linkIndex) {
                  return {
                    ...item3,
                    videoUrl: {
                      public_id: result.public_id || "",
                      url: result.url || "",
                    },
                    duration: result.duration || 0,
                  };
                } else {
                  return item3;
                }
              }
            );

            update(index, { ...fields[index], lectures: fieldLectures });
          }
        });
        findIdAndUpdate(id, false);
      } else if (checkCancleFileId) {
        if (result.public_id) {
          deleteFile(result.public_id);
        }
      }
      socketId.off("video-result", onVideoResult);
    });
  }, [cancleFileId, fields, loadingUploadVideo]);

  useEffect(() => {
    if (courseData && courseData.data.courseData.length > 0) {
      const dataCourse = courseData.data.courseData as CourseContentType[];

      reset({ test: courseData.data.courseData });
      dataCourse.forEach((item, index) => {
        if (index === 0) {
          setLoadingUploadVideo([
            Array(item.lectures.length).fill({
              isLoading: false,
              id: uuidv4(),
            }),
          ]);
          setPercentUploadVideo([
            Array(item.lectures.length).fill({ percent: 0, id: uuidv4() }),
          ]);
        } else {
          setLoadingUploadVideo((loadingUpload) => [
            ...loadingUpload,
            Array(item.lectures.length).fill({
              isLoading: false,
              id: uuidv4(),
            }),
          ]);

          setPercentUploadVideo((loadingUpload) => [
            ...loadingUpload,
            Array(item.lectures.length).fill({ percent: 0, id: uuidv4() }),
          ]);
        }
      });
    }
  }, [courseData]);
  return (
    <div className="dark:text-white text-black">
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <div>
          {fields.map((item, index) => {
            return (
              <FormControlContent
                changeIdLoading={changeIdLoading}
                changeIdUpload={changeIdUpload}
                errors={errors}
                fields={fields}
                findIdAndUpdate={findIdAndUpdate}
                handelRemoveSection={handelRemoveSection}
                handleAddLink={handleAddLink}
                handleAddNewSection={handleAddNewSection}
                handleCancelUpload={handleCancelUpload}
                index={index}
                handleRemoveLink={handleRemoveLink}
                isCollased={isCollased}
                item={item}
                loadingUploadVideo={loadingUploadVideo}
                percentUploadVideo={percentUploadVideo}
                register={register}
                toggleCollased={toggleCollased}
                key={item.id}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prevButton}
            type="button"
            className="w-[100px] h-[40px] rounded-md bg-blue10 mt-3"
          >
            Prev
          </button>
          <button
            onClick={() => setTypeButton("next")}
            type="submit"
            className="w-[100px] h-[40px] rounded-md bg-blue10 mt-3"
          >
            Next
          </button>
        </div>
        <button
          className="fixed bottom-10 right-10 bg-ruby9  rounded-md px-5 py-2"
          onClick={() => setTypeButton("save")}
        >
          Save
        </button>
      </Form.Root>
      {isLoading && loadingGetCourse && (
        <div className="fixed top-0 left-0 bg-blackA5 w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CourseContentData;
