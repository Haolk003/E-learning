import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Checkbox from "@radix-ui/react-checkbox";
import { IoMdClose } from "react-icons/io";
import { CourseContentType } from "@/types/couresContentType";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import convertDuration from "@/utils/convertDuration";

import { useUpdateIsCompletedMutation } from "@/features/course/courseApi";
import toast from "react-hot-toast";
import { progressLectureProgressType } from "@/types/progressLectureUserType";
import Link from "next/link";

type Props = {
  courseContentData: CourseContentType[];
  courseId: string;
  lectureId: string;
  progressData: progressLectureProgressType;
};
const CoureAccessLectureList: FC<Props> = ({
  courseContentData,
  lectureId,
  courseId,
  progressData,
}) => {
  const [updateIsCompletedLecture, { error, isLoading, isSuccess }] =
    useUpdateIsCompletedMutation();
  const [isCollapped, setIsCollapped] = useState<boolean[]>([]);
  const handleChangeOpen = (open: boolean, index: number) => {
    const newIsCollappsed = [...isCollapped];
    newIsCollappsed[index] = open;
    setIsCollapped(newIsCollappsed);
  };

  const handleUpdateCompletedLecture = async (
    lectureId: string,
    isCompleted: string | boolean
  ) => {
    await updateIsCompletedLecture({ lectureId, courseId, isCompleted });
  };
  useEffect(() => {
    if (error && "data" in error) {
      const errMessage = error.data as any;
      toast.error(errMessage.message);
    }
  }, [error]);
  useEffect(() => {
    if (courseContentData) {
      const newCollapse: boolean[] = courseContentData.map((item, index) => {
        const findLectureId = item.lectures.find(
          (lecture) => lecture._id === lectureId
        );
        if (findLectureId) {
          return true;
        } else {
          return false;
        }
      });
      setIsCollapped(newCollapse);
    }
  }, [courseContentData]);
  return (
    <div className="min-w-[30%]">
      <div className="py-4 px-4 bg-slate-700 flex items-center justify-between ">
        <h3>Course content</h3>
        <button>
          <IoMdClose />
        </button>
      </div>
      <div className="">
        {courseContentData &&
          courseContentData.map((item, index) => {
            return (
              <Collapsible.Root
                className="w-full py-4 bg-slate-700  border-t border-white "
                open={isCollapped[index]}
                onOpenChange={(open: boolean) => handleChangeOpen(open, index)}
                key={item._id}
              >
                <div className="flex justify-between px-4">
                  <div>
                    <h2 className="font-semibold text-[14px]">
                      Section {index}: {item.videoSection}
                    </h2>
                    <div className="text-[12px]">6/6 | 34min</div>
                  </div>
                  <Collapsible.Trigger asChild>
                    <button>
                      <IoIosArrowDown />
                    </button>
                  </Collapsible.Trigger>
                </div>
                <Collapsible.Content>
                  <ul>
                    {item.lectures.map((lecture, lectureIndex) => {
                      const sequence = courseContentData.reduce(
                        (total, data, index2) => {
                          if (index2 < index) {
                            return total + data.lectures.length;
                          } else {
                            return total;
                          }
                        },
                        1
                      );
                      const checkProgress = progressData.progress.find(
                        (data, index2) => data.lectureId === lecture._id
                      );
                      return (
                        <li
                          className={`flex gap-3  py-3 px-4 ${
                            lectureId === lecture._id && "bg-slate-900"
                          }`}
                        >
                          <Checkbox.Root
                            onCheckedChange={(checked) =>
                              handleUpdateCompletedLecture(lecture._id, checked)
                            }
                            key={lecture._id}
                            defaultChecked={
                              checkProgress ? checkProgress.isCompleted : false
                            }
                            className="shadow-blackA4 hover:bg-violet3 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                          >
                            <Checkbox.Indicator className="text-violet11">
                              <IoMdCheckmark />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <Link
                            href={`/course-access/${courseId}/lecture/${lecture._id}`}
                          >
                            <h4 className="text-[14px]">
                              {sequence + lectureIndex}.{lecture.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[13px] mt-1">
                              <MdOndemandVideo />
                              <p>{convertDuration(lecture.duration)}</p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Collapsible.Content>
              </Collapsible.Root>
            );
          })}
      </div>
    </div>
  );
};

export default CoureAccessLectureList;
