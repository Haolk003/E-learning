"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dompurify from "dompurify";
import { useRouter } from "next/navigation";

import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { BiMoviePlay } from "react-icons/bi";

import CoursePlayer from "@/components/ui/CoursePlayer";
import { CourseType } from "@/types/couresContentType";
import UseCaculatorSale from "@/hooks/useCaculatorSale";
import Rating from "@/components/ui/Rating";

import {
  useGetCourseInstructorQuery,
  usePublicCourseByIdMutation,
} from "@/features/course/courseApi";
import Loader from "@/components/loader/Loader";

const CoursePreview = ({ id }: { id: string }) => {
  const router = useRouter();
  const [courseData, setCourseData] = useState<CourseType | null>(null);
  const [isCollapse, setIsCollapse] = useState<boolean[]>([]);
  const { data, isLoading, error } = useGetCourseInstructorQuery(id);
  const [
    publicCourse,
    {
      isLoading: loadingPublic,
      isSuccess: isSuccessPublic,
      error: errorPublic,
    },
  ] = usePublicCourseByIdMutation();
  const handleChangeCollapse = (index: number) => {
    const setNewCollapse = [...isCollapse];
    setNewCollapse[index] = !setNewCollapse[index];
    setIsCollapse(setNewCollapse);
  };

  const handleSaveCourse = () => {
    router.push("/instructor");
  };
  const handlePublicCourse = async () => {
    await publicCourse(id);
  };

  const handlePrev = async () => {
    router.push(`/instructor/create-course/step3/${id}`);
  };
  useEffect(() => {
    if (data) {
      setCourseData(data.data);
      setIsCollapse(Array(data.data.courseData.length).fill(true));
    }
  }, [data]);

  useEffect(() => {
    if (isSuccessPublic) {
      toast.success("Public Course Successfully");
      router.push("/instructor/courses");
    }
    if (errorPublic && "data" in errorPublic) {
      const errorMessage = errorPublic.data as any;
      toast.error(errorMessage.message);
    }
  }, [isSuccessPublic, errorPublic]);
  return (
    <div>
      {courseData && (
        <div>
          <CoursePlayer videoUrl={courseData.demoUrl.url} />
          <div className="flex gap-2 dark:text-white text-black text-3xl mt-3">
            {courseData.sale.discount > 0 && (
              <p>
                {UseCaculatorSale(courseData.price, courseData.sale.discount)}
              </p>
            )}

            <p
              className={`${
                courseData.sale.discount > 0
                  ? "relative -top-2 left-0"
                  : " font-semibold text-3xl"
              }`}
            >
              ${courseData.price.toFixed(2)}
            </p>
          </div>
          <button className="bg-ruby11 text-white rounded-[50px] w-[180px] h-[50px] mt-4">
            Enter to Course
          </button>
          <ul
            className="list-inside list-disc flex flex-col gap-2
           mt-7"
          >
            <li>Source code included</li>
            <li>Full lifetime access</li>
            <li>Certificate of completion</li>
            <li>Premium Support</li>
          </ul>
          <h2 className="text-2xl tracking-wide mt-4">{courseData.title}</h2>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center gap-3">
              <Rating ratings={courseData.ratings} />
              <div>{courseData.reviews?.length || 0} Reviews</div>
            </div>
            <p>0 Students</p>
          </div>
          <h3 className="text-2xl mt-6 ">What you will learn this course ?</h3>
          <ul>
            {courseData.benefits.map((item, index) => (
              <li className="flex items-center gap-4 mt-3" key={item._id}>
                <IoCheckmarkDoneOutline />
                <p className="text-md">{item.title}</p>
              </li>
            ))}
          </ul>
          <h3 className="text-2xl mt-6">
            What are the prerequisites for staring this course ?
          </h3>
          <ul>
            {courseData.prerequisites.map((item, index) => (
              <li className="flex items-center gap-4 mt-2" key={item._id}>
                <IoCheckmarkDoneOutline />
                <p className="text-md">{item.title}</p>
              </li>
            ))}
          </ul>
          <h3 className="text-2xl mt-4">Course Overview</h3>
          {courseData.courseData.map((item, index) => (
            <div key={item._id}>
              <div
                key={item._id}
                className="flex mt-5 items-center justify-between"
              >
                <div className="">
                  <h4 className="text-md">{item.videoSection}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[14px]">
                      {item.lectures.length} Lessons
                    </p>
                    · <p className="text-[14px]">{item.videoLength} hours</p>
                  </div>
                </div>
                <button
                  onClick={() => handleChangeCollapse(index)}
                  className={`${
                    !isCollapse[index] && "rotate-180 "
                  } duration-200`}
                >
                  <IoIosArrowDown />
                </button>
              </div>
              {!isCollapse[index] && (
                <div className="flex flex-col gap-3 mt-3">
                  {item.lectures.map((letureItem) => (
                    <div
                      className="flex items-start gap-3"
                      key={letureItem._id}
                    >
                      <BiMoviePlay size={30} className="text-blue8" />
                      <div className="">
                        <h5 className="text-[18px]">{letureItem.title}</h5>
                        <p className="text-[15px]">
                          {letureItem.duration} hours
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <h3 className="text-2xl mt-6 ">Course Details</h3>
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(courseData.description),
            }}
          ></div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              onClick={handlePrev}
              className="w-[100px] h-[40px] rounded-md bg-blue10 mt-3"
            >
              Prev
            </button>
            <button
              onClick={handlePublicCourse}
              className="w-[100px] h-[40px] rounded-md bg-blue10 mt-3"
            >
              Public
            </button>
          </div>
        </div>
      )}
      <button
        className="fixed bottom-10 right-10 bg-ruby9  rounded-md px-5 py-2"
        onClick={handleSaveCourse}
      >
        Save
      </button>
      {(isLoading || loadingPublic) && (
        <div className="fixed top-0 left-0 bg-blackA5 w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CoursePreview;
