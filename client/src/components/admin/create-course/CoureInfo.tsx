"use client";

import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Form from "@radix-ui/react-form";

import * as Select from "@radix-ui/react-select";
import Image from "next/image";
import { courseInfoValidate } from "@/validations/createCourseValidate";
import Editor from "@/components/ui/editor/Editor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import SelectPrimary from "@/components/ui/select/SelectPrimary";
import {
  useCreateCourseStep1Mutation,
  useUploadImageCourseMutation,
} from "@/features/course/courseApi";
import { useGetAllCategoryQuery } from "@/features/category/categoryApi";
import { useUploadVideoMutation } from "@/features/course/courseApi";
import socketIO from "socket.io-client";
import ProgressDemo from "@/components/ui/Progress";
import { RiLoader2Fill } from "react-icons/ri";

import { useGetCourseInstructorQuery } from "@/features/course/courseApi";
import { FaPhotoVideo } from "react-icons/fa";
import CoursePlayer from "@/components/ui/CoursePlayer";
import { CourseType } from "@/types/couresContentType";

import SelectCategory from "@/components/ui/select/SelectIntructor";

import { CategoryType } from "@/types/categoryType";
import Loader from "@/components/loader/Loader";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(`${ENDPOINT}`, { transports: ["websocket"] });

type courseInfoType = {
  title: string;
  description: string;
  price: number;
  // estimatedPrice: number;
  demoUrl: {
    public_id: string;
    url: string;
  };
  category: string;
  level: string;
  tags: string;
  subCategory: string;
};
type Props = {
  id?: string;
};

const levelDataSelect = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Beginner",
    value: "beginner",
  },
  {
    label: "Intermediate",
    value: "intermediate",
  },
  {
    label: "Expert",
    value: "expert",
  },
];
const CoureInfo: FC<Props> = ({ id }) => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoryQuery("");

  const router = useRouter();
  const {
    error: errorGetCourse,
    isSuccess: successGetCourse,
    isLoading: loadingGetCourse,
    data: course,
    refetch,
  } = useGetCourseInstructorQuery(String(id), {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const [createCourse, { isLoading, error, isSuccess, data: courseData }] =
    useCreateCourseStep1Mutation();
  const [uploadVideo, { isSuccess: successUploadVideo }] =
    useUploadVideoMutation();
  const [loadingUploadVideo, setLoadingUploadVideo] = useState(false);
  const [percentUpload, setPercentUpload] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryData, setSubCategoryData] = useState<CategoryType[]>([]);
  const [videoResult, setVideoResult] = useState<{
    public_id: string;
    url: string;
  } | null>(null);

  const [
    uploadCourse,
    {
      isLoading: isLoadingUpload,
      error: errorUpload,
      isSuccess: isSuccessUpload,
      data,
    },
  ] = useUploadImageCourseMutation();
  const [selectFile, setSelectFile] = useState<File | string>("");
  const [typeButton, setTypeButton] = useState("");
  const [level, setLevel] = useState("");
  const [dataCourseStep1, setDataCourseStep1] = useState<courseInfoType | null>(
    null
  );

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<courseInfoType>({ resolver: yupResolver(courseInfoValidate) });

  const editor = useEditor({
    extensions: [StarterKit],
    // content: course ? course.data.description : "cc",
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectFile(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg"],
    },
    multiple: false,
  });

  const onDropVideo = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles) {
      const formData = new FormData();
      formData.append("myFile", acceptedFiles[0]);
      await uploadVideo({ data: formData, id: "1" });
    }
  }, []);

  const { getRootProps: getRootPropsVideo, getInputProps: getInputPropsVideo } =
    useDropzone({
      onDrop: onDropVideo,
      maxSize: 104857600, // 100MB in bytes
      accept: { "video/*": [".mp4", ".mp3"] },
    });
  //
  const handleCancelUpload = () => {
    setLoadingUploadVideo(false);
  };

  const onSubmit = async (data: courseInfoType) => {
    if (selectFile === "") {
      toast.error("Please select file for thumbnail");
    } else if (typeof selectFile !== "string") {
      setDataCourseStep1(data);
      const formData = new FormData();
      formData.append("myFile", selectFile);

      await uploadCourse(formData);
    } else {
      await createCourse({
        id,
        data: {
          ...data,
          thumbnail: course.data.thumbnail,
        },
      });
    }
  };

  const handleChangeCategory = (value: string) => {
    setValue("category", value);

    setCategory(value);
  };

  useEffect(() => {
    if (category !== "" && course) {
      const newCategories = categories.data as CategoryType[];
      const findParentCategory = newCategories.find(
        (item) => item._id === category
      );
      if (findParentCategory) {
        setSubCategoryData(findParentCategory.subcategories);
        setSubCategory(course.data.subCategory);
      }
    } else if (category !== "") {
      const newCategories = categories.data as CategoryType[];
      const findParentCategory = newCategories.find(
        (item) => item._id === category
      );
      if (findParentCategory) {
        setSubCategoryData(findParentCategory.subcategories);
      }
    }
  }, [category]);

  useEffect(() => {
    if (course) {
      setSubCategory(course.data.subCategory);
      setValue("subCategory", course.data.subCategory);
    }
  }, [subCategoryData]);
  const handelChangeLevel = (value: string) => {
    setValue("level", value);
    setLevel(value);
  };
  const handleChangeSubCategory = (value: string) => {
    setValue("subCategory", value);
    setSubCategory(value);
  };

  useEffect(() => {
    if (editor?.getHTML()) {
      setValue("description", editor?.getHTML());
    }
  }, [editor?.getHTML()]);

  useEffect(() => {
    if (isSuccess) {
      if (typeButton === "save") {
        router.push(`/instructor/courses`);
      } else {
        router.push(`/instructor/create-course/step2/${courseData.data._id}`);
      }
      setSubCategory("");
      setCategory("");
    }
    if (error && "data" in error) {
      const errorData = error.data as any;
      toast.error(errorData.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (isSuccessUpload) {
      createCourse({
        id,
        data: {
          ...dataCourseStep1,
          thumbnail: data.data,
        },
      });
    }
  }, [isSuccessUpload]);
  useEffect(() => {
    socketId.on("percent-upload", ({ result }) => {
      setPercentUpload(result);
    });
  }, [socketId.hasListeners("percent-upload")]);

  useEffect(() => {
    if (loadingUploadVideo === true) {
      socketId.on("video-result", ({ result, id }) => {
        setVideoResult({ public_id: result.public_id, url: result.url });
        setValue("demoUrl", { public_id: result.public_id, url: result.url });
        setLoadingUploadVideo(false);
        setPercentUpload(0);
      });
    }
  }, [socketId.hasListeners("video-result"), loadingUploadVideo]);

  useEffect(() => {
    if (successUploadVideo) {
      setLoadingUploadVideo(true);
    }
  }, [successUploadVideo]);

  useEffect(() => {
    if (course) {
      const courseInfo = course.data as CourseType;

      reset(courseInfo);
      setLevel(courseInfo.level);
      setCategory(courseInfo.category);

      setVideoResult(courseInfo.demoUrl);
      setSelectFile(courseInfo.thumbnail.url);
      editor?.commands.setContent(courseInfo.description);
    }
  }, [course, editor]);
  return (
    <div className="w-full dark:text-white text-black">
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name="name" className="w-full flex flex-col gap-2">
          <Form.Label>Course Name</Form.Label>

          <Form.Control asChild>
            <input
              placeholder="MERN stack LMS platform with next 13"
              className="bg-transparent border dark:border-white border-black rounded-sm py-1 px-3"
              {...register("title")}
            />
          </Form.Control>
          <span className="text-red-500 text-[13px]">
            {errors.title?.message}
          </span>
        </Form.Field>
        <Form.Field name="description" className="w-full flex flex-col gap-2">
          <Form.Label>Course Description</Form.Label>
          <Form.Control asChild>
            <Editor editor={editor} />
          </Form.Control>
          <span className="text-red-500 text-[13px]">
            {errors.description?.message}
          </span>
        </Form.Field>
        <div className="flex items-center justify-between mt-3 ">
          <Form.Field name="price" className="flex flex-col gap-2 w-[45%]">
            <Form.Label>Course Price</Form.Label>
            <Form.Control asChild>
              <input
                type="number"
                placeholder="79"
                className="bg-transparent border dark:border-white border-black rounded-sm py-1 px-3"
                {...register("price")}
              />
            </Form.Control>
            <span className="text-red-500 text-[13px]">
              {errors.price?.message}
            </span>
          </Form.Field>
          <Form.Field name="level" className="flex flex-col gap-2 w-[45%]">
            <Form.Label>Course Level</Form.Label>
            <Form.Control asChild>
              <SelectPrimary
                data={levelDataSelect}
                value={level}
                handleChangeValue={handelChangeLevel}
              />
            </Form.Control>
            <span className="text-red-500 text-[13px]">
              {errors.level?.message}
            </span>
          </Form.Field>
        </div>
        <div className="">
          <Form.Field name="tags" className="flex flex-col gap-2 w-full">
            <Form.Label>Course Tags</Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                placeholder="MERN,Next 13, Socket io, tailwind css,LMS"
                className="bg-transparent border dark:border-white border-black rounded-sm py-1 px-3"
                {...register("tags")}
              />
            </Form.Control>
            <span className="text-red-500 text-[13px]">
              {errors.tags?.message}
            </span>
          </Form.Field>
        </div>
        <div className="w-full flex items-center justify-between mt-5">
          <Form.Field name="category" className="w-[45%] flex flex-col  gap-2">
            <Form.Label>
              <p>Course Category</p>
            </Form.Label>
            <Form.Control asChild className="w-full">
              {categories && (
                <SelectCategory
                  data={categories.data}
                  value={category}
                  handleChange={handleChangeCategory}
                />
              )}
            </Form.Control>
            <span className="text-red-500 text-[13px]">
              {errors.category?.message}
            </span>
          </Form.Field>
          <Form.Field name="category" className="w-[45%] flex flex-col  gap-2">
            <Form.Label>
              <p>Course SubCategory</p>
            </Form.Label>
            <Form.Control asChild className="w-full">
              {categories && (
                <SelectCategory
                  data={subCategoryData}
                  value={subCategory}
                  handleChange={handleChangeSubCategory}
                />
              )}
            </Form.Control>
            <span className="text-red-500 text-[13px]">
              {errors.category?.message}
            </span>
          </Form.Field>
        </div>

        <Form.Field name="demoUrl">
          <Form.Label>Demo Url</Form.Label>
          <Form.Control asChild>
            <div className="w-full h-[400px] mb-3 relative  border-dashed dark:border-white border-black border-[2px] rounded-sm">
              {!loadingUploadVideo && (
                <div
                  {...getRootPropsVideo()}
                  className=" flex flex-col items-center justify-center gap-3 h-full"
                >
                  <FaPhotoVideo className="text-7xl" />
                  <p>Drag and drop video file</p>
                  <input
                    type="file"
                    {...getInputPropsVideo()}
                    className="w-full h-full absolute bg-transparent cursor-pointer"
                  />

                  {!loadingUploadVideo && videoResult && (
                    <button
                      type="button"
                      className="absolute bottom-2 bg-gray8 py-2 px-3 rounded-md left-[50%] -translate-x-1/2 text-[14px]"
                    >
                      Change Video
                    </button>
                  )}
                </div>
              )}
              {!loadingUploadVideo && videoResult ? (
                <div className="absolute top-[50%]  left-[50%] z-50 -translate-y-1/2 -translate-x-1/2 w-[80%] h-[300px] flex items-center justify-center">
                  <CoursePlayer videoUrl={videoResult.url} />
                </div>
              ) : (
                <></>
              )}
              {loadingUploadVideo && (
                <div className="w-[60%] absolute top-[50%]  left-[50%] z-50 -translate-y-1/2 -translate-x-1/2">
                  <ProgressDemo progress={percentUpload} />
                  <div className="flex items-center justify-between mt-2  ">
                    <div className="flex items-center gap-2">
                      <RiLoader2Fill className="animate-spin" /> Uploading
                    </div>
                    <button
                      type="button"
                      onClick={handleCancelUpload}
                      className="text-[13px] border dark:border-white border-black rounded-sm px-2 "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Form.Control>

          <span className="text-red-500 text-[13px]">
            {errors.demoUrl?.message}
          </span>
        </Form.Field>

        <div
          className="border w-full  border-black flex items-center justify-center relative dark:border-white min-h-[300px]  mt-5"
          {...getRootProps()}
        >
          {!selectFile && (
            <p>Drag and drop your thumbnial here or click to browser.</p>
          )}
          <input
            {...getInputProps()}
            type="file"
            className="h-full w-full absolute bg-transparent"
          />
          {selectFile && (
            <div className="w-full">
              <Image
                src={
                  typeof selectFile === "string"
                    ? selectFile
                    : URL.createObjectURL(selectFile)
                }
                alt=""
                fill
                className="w-auto h-full object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            onClick={() => setTypeButton("next")}
            className="w-[100px] h-[40px] rounded-md bg-blue10 mt-3"
          >
            Next
          </button>
        </div>
        <button
          className="fixed bottom-10 right-10 bg-ruby9  rounded-md px-5 py-2"
          onClick={() => {
            setTypeButton("save");
          }}
        >
          Save
        </button>
      </Form.Root>
      {(isLoading || loadingGetCourse) && (
        <div className="bg-blackA5 fixed top-0 left-0 h-screen w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CoureInfo;
