"use client";

import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  useCreateCourseStep2Mutation,
  useGetCourseInstructorQuery,
} from "@/features/course/courseApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import { CourseType } from "@/types/couresContentType";
const CourseInfoStep2 = ({ id }: { id: string }) => {
  const {
    data,
    isSuccess: isSuccessGetCourse,
    isLoading: loadingGetCourse,
    error: errorGetCourse,
  } = useGetCourseInstructorQuery(id);
  const router = useRouter();
  const [updateCourse, { isLoading, error, isSuccess }] =
    useCreateCourseStep2Mutation();

  const [prerequisites, setPrerequisites] = useState<{ title: string }[]>([
    { title: "" },
  ]);
  const [benefits, setBenefits] = useState<{ title: string }[]>([
    { title: "" },
  ]);
  const [typeButton, setTypeButton] = useState("next");
  const handleChangeBenefits = (value: string, index: number) => {
    const updateBenefits = JSON.parse(JSON.stringify(benefits));
    updateBenefits[index].title = value;
    setBenefits(updateBenefits);
  };
  const handleAddBenefits = () => {
    setBenefits((benefit) => [...benefit, { title: "" }]);
  };
  const handleChangePrequisites = (value: string, index: number) => {
    const updateBenefits = JSON.parse(JSON.stringify(prerequisites));
    updateBenefits[index].title = value;
    setPrerequisites(updateBenefits);
  };
  const handleAddPrequisites = () => {
    setPrerequisites((prerequisite) => [...prerequisite, { title: "" }]);
  };
  const handleDeleteBenefits = (index: number) => {
    setBenefits((benefits) => {
      const arr = [...benefits];
      arr.splice(index, 1);
      return arr;
    });
  };

  const handleDeletePrequisites = (index: number) => {
    setPrerequisites((prerequisites) => {
      const arr = [...prerequisites];
      prerequisites.splice(index, 1);
      return arr;
    });
  };
  const prevButton = () => {
    router.push(`/admin/create-course/step1/${id}`);
  };
  const handleSubmit = async () => {
    if (
      prerequisites.every((item) => item.title !== "") &&
      benefits.every((item) => item.title !== "")
    ) {
      const fomattedPreprequisites = prerequisites.map((item, index) => {
        return { title: item.title };
      });
      const fomattedBenefits = benefits.map((item, index) => {
        return { title: item.title };
      });

      await updateCourse({
        data: {
          prerequisites: fomattedPreprequisites,
          benefits: fomattedBenefits,
        },
        courseId: id,
      });
    } else {
      toast.error("Please enter all fields");
    }
  };
  const handleBack = () => {
    router.push(`/create-course/step1/${id}`);
  };
  useEffect(() => {
    if (isSuccess) {
      if (typeButton === "save") {
        router.push(`/instructor/courses`);
      } else {
        router.push(`/instructor/create-course/step3/${id}`);
      }
    }
    if (error && "data" in error) {
      const errorData = error.data as any;
      toast.error(errorData.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (data) {
      const course = data.data as CourseType;
      if (course.benefits.length > 0 && course.prerequisites.length > 0) {
        setBenefits(
          course.benefits.map((item) => {
            return { title: item.title };
          })
        );
        setPrerequisites(
          course.prerequisites.map((item) => {
            return { title: item.title };
          })
        );
      }
    }
  }, [data]);
  return (
    <div className="">
      <h3>What are the benefits for student in this course?</h3>
      <div className="flex flex-col w-full">
        {benefits.map((benefit, index) => (
          <div className="flex items-center gap-4 w-full" key={index}>
            <input
              type="text"
              placeholder="You will be able to build a fullstack LMS Flaform"
              key={index}
              value={benefit.title}
              onChange={(e) => handleChangeBenefits(e.target.value, index)}
              className="bg-transparent border dark:border-white border-black px-3 py-1 my-2 rounded-sm w-full"
            />
            {}
            <button
              disabled={benefits.length <= 1}
              className="disabled:text-gray-500"
              onClick={() => handleDeleteBenefits(index)}
            >
              <RiDeleteBin2Fill />
            </button>
          </div>
        ))}
      </div>
      <button className="text-3xl" onClick={handleAddBenefits}>
        <IoIosAddCircleOutline />
      </button>

      <h3 className="mt-4">
        What are the prerequisies for student in this course?
      </h3>
      <div className="flex flex-col w-full">
        {prerequisites.map((prerequisite, index) => (
          <div className="flex items-center gap-4 w-full" key={index}>
            <input
              type="text"
              placeholder="You will be able to build a fullstack LMS Flaform..."
              key={index}
              value={prerequisite.title}
              onChange={(e) => handleChangePrequisites(e.target.value, index)}
              className="bg-transparent border dark:border-white border-black px-3 py-1 my-2 rounded-sm w-full"
            />
            <button
              disabled={prerequisites.length <= 1}
              className="disabled:text-gray-500"
              onClick={() => handleDeletePrequisites(index)}
            >
              <RiDeleteBin2Fill />
            </button>
          </div>
        ))}
      </div>
      <button className="text-3xl" onClick={handleAddPrequisites}>
        <IoIosAddCircleOutline />
      </button>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={prevButton}
          type="button"
          className="w-[100px] h-[40px] rounded-md bg-blue10 mt-3"
        >
          Prev
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-[100px] h-[40px] rounded-md bg-blue10 mt-3"
        >
          Next
        </button>
      </div>
      {isLoading && loadingGetCourse && (
        <div className="fixed top-0 left-0 bg-blackA5 w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      <button
        className="fixed bottom-10 right-10 bg-ruby9  rounded-md px-5 py-2"
        onClick={() => {
          handleSubmit();
          setTypeButton("save");
        }}
      >
        Save
      </button>
    </div>
  );
};

export default CourseInfoStep2;
