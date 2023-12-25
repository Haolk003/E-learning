import React, { useEffect, useState } from "react";
import ConvertDuratonVideo from "@/utils/convertDuratonVideo";
import { IoIosAddCircle } from "react-icons/io";

import {
  useGetNoteCourseQuery,
  useCreateNoteCourseMutation,
} from "@/features/noteCourse/noteCourseApi";

import Editor from "../ui/editor/Editor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";

import { NoteCourseType } from "@/types/noteCouresType";
type Props = {
  played: number;
  courseId: string;
  lectureId: string;
};
const CourseAccessNote: React.FC<Props> = ({ played, courseId, lectureId }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    // content: course ? course.data.description : "cc",
  });
  const { data, refetch } = useGetNoteCourseQuery(courseId);
  const [createNoteCoures, { isLoading, error, isSuccess }] =
    useCreateNoteCourseMutation();
  const [isOpenCreateNote, setIsOpenCreateNote] = useState(false);

  const saveNoteLecture = async () => {
    if (editor?.getHTML()) {
      await createNoteCoures({
        timing: played,
        courseId: courseId,
        lectureId: lectureId,
        content: editor?.getHTML(),
      });
    }
  };
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Create Note Successfully");
    }
    if (error && "data" in error) {
      const errorMessage = error.data as any;
      toast.error(errorMessage.message);
    }
  }, [isSuccess, error]);
  return (
    <div className="w-[700px] mx-auto mt-4 py-10">
      {!isOpenCreateNote && (
        <div
          className="border dark:border-white border-black cursor-pointer hover:opacity-50 w-full px-4 py-3 flex items-center justify-between"
          onClick={() => setIsOpenCreateNote(true)}
        >
          <p className="flex items-center gap-2">
            Create a new note at{" "}
            <span>{ConvertDuratonVideo({ duration: played })}</span>
          </p>
          <IoIosAddCircle className="dark:text-white text-black text-2xl" />
        </div>
      )}
      {isOpenCreateNote && (
        <div>
          <div className="flex gap-3 justify-between w-full">
            <div className="dark:bg-white  bg-black h-[30px] rounded-full px-4 py-1 dark:text-black text-white">
              {ConvertDuratonVideo({ duration: played })}
            </div>
            <div className="w-[600px]">
              <Editor editor={editor} />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 text-[14px] mt-4">
            <button>Cancel</button>
            <button
              className="bg-violet9  text-white rounded-full px-3 py-[6px]"
              onClick={saveNoteLecture}
            >
              Save note
            </button>
          </div>
        </div>
      )}
      <div className="">
        {data &&
          data.data.map((item: NoteCourseType, index: number) => {
            return (
              <div className="flex gap-2 mt-4">
                <p className="dark:bg-white  bg-black h-[30px] w-[80px] flex justify-center text-center rounded-full  py-1 dark:text-black text-white">
                  {ConvertDuratonVideo({ duration: item.timing })}
                </p>
                <div></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CourseAccessNote;
