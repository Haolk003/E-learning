import React, { useEffect, useState } from "react";
import ConvertDuratonVideo from "@/utils/convertDuratonVideo";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import {
  useGetNoteCourseQuery,
  useCreateNoteCourseMutation,
  useUpdateNoteCourseMutation,
  useDeleteNoteCourseMutation,
} from "@/features/noteCourse/noteCourseApi";

import Editor from "../ui/editor/Editor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-hot-toast";
import { CourseType } from "@/types/couresContentType";

import { NoteCourseType } from "@/types/noteCouresType";
import dompurify from "dompurify";
type Props = {
  played: number;
  courseId: string;
  lectureId: string;
  courseData: CourseType;
};
const CourseAccessNote: React.FC<Props> = ({
  played,
  courseId,
  lectureId,
  courseData,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
  });
  const editorEdit = useEditor({
    extensions: [StarterKit],
  });
  const { data, refetch } = useGetNoteCourseQuery(courseId);
  const [createNoteCoures, { isLoading, error, isSuccess }] =
    useCreateNoteCourseMutation();
  const [
    updateNote,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
    },
  ] = useUpdateNoteCourseMutation();
  const [deleteNoteCourse, { isSuccess: isSuccessDelete, error: errorDelete }] =
    useDeleteNoteCourseMutation();
  const [isOpenCreateNote, setIsOpenCreateNote] = useState(false);
  const [isOpenEditNote, setIsOpenEditNote] = useState<boolean[]>([]);
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
  const handleOpenEditNote = (index: number, content: string) => {
    const newIsOPenEditNote = Array(data.data.length).fill(false);
    newIsOPenEditNote[index] = true;
    setIsOpenEditNote(newIsOPenEditNote);
    editorEdit?.commands.setContent(content);
  };
  const handleCloseEditNote = (index: number) => {
    const newIsOpenEditNOte = [...isOpenEditNote];
    newIsOpenEditNOte[index] = false;
    setIsOpenEditNote(newIsOpenEditNOte);
  };
  const handleEditNote = async (id: string) => {
    if (editorEdit?.getHTML()) {
      await updateNote({ content: editorEdit.getHTML(), id });
    }
  };
  const handleDelete = async (id: string) => {
    await deleteNoteCourse(id);
  };
  useEffect(() => {
    if (data) {
      setIsOpenEditNote(Array(data.data.length).fill(false));
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Create Note Successfully");
      setIsOpenCreateNote(false);
    }
    if (error && "data" in error) {
      const errorMessage = error.data as any;
      toast.error(errorMessage.message);
    }
  }, [isSuccess, error]);
  useEffect(() => {
    if (isSuccessUpdate) {
      refetch();
      toast.success("Update Note Successfully");
    }
    if (errorUpdate && "data" in errorUpdate) {
      const errorMessage = errorUpdate.data as any;
      toast.error(errorMessage.message);
    }
  }, [isSuccessUpdate, errorUpdate]);
  useEffect(() => {
    if (isSuccessDelete) {
      refetch();
      toast.success("Delete Note Successfully");
    }
    if (errorDelete && "data" in errorDelete) {
      const errorMessage = errorDelete.data as any;
      toast.error(errorMessage.message);
    }
  }, [isSuccessDelete, errorDelete]);
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
          <div
            className="flex items-center justify-end gap-3 text-[14px] mt-4"
            onClick={() => setIsOpenCreateNote(false)}
          >
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
            let lectureTitle = "";
            let sectionTitle = "";
            let lectureIndex = 0;
            let sectionIndex = 0;
            courseData.courseData.map((course, courseIndex) => {
              const findLecture = course.lectures.findIndex(
                (lecture) => lecture._id === item.lectureId
              );

              if (findLecture >= 0) {
                lectureTitle = course.lectures[findLecture].title;
                sectionTitle = course.videoSection;
                sectionIndex = courseIndex + 1;
                lectureIndex = courseData.courseData.reduce(
                  (total, data, index2) => {
                    if (index2 < courseIndex) {
                      return total + data.lectures.length;
                    } else if (index2 === courseIndex) {
                      return total + findLecture;
                    } else {
                      return total;
                    }
                  },
                  1
                );
              }
            });

            return (
              <div className="flex gap-5 mt-7 w-full">
                <p className="dark:bg-white  bg-black h-[30px] w-[80px] flex justify-center text-center rounded-full  py-1 dark:text-black text-white">
                  {ConvertDuratonVideo({ duration: item.timing })}
                </p>
                <div className="w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 ">
                      <h5 className="font-[600]">
                        {sectionIndex}.{sectionTitle}
                      </h5>
                      <p className="text-[14px] text-gray7">
                        {lectureIndex}.{lectureTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEditNote(index, item.content)}
                      >
                        <MdEdit />
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {!isOpenEditNote[index] ? (
                    <div
                      className="mt-2 py-4 px-3 dark:bg-gray5 bg-gray10 w-full"
                      dangerouslySetInnerHTML={{
                        __html: dompurify.sanitize(item.content),
                      }}
                    ></div>
                  ) : (
                    <div className="mt-4">
                      <div className="">
                        <div className="w-[600px]">
                          <Editor editor={editorEdit} />
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3 text-[14px] mt-4">
                        <button
                          type="button"
                          onClick={() => handleCloseEditNote(index)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-violet9  text-white rounded-full px-3 py-[6px]"
                          onClick={() => handleEditNote(item._id)}
                        >
                          Save note
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CourseAccessNote;
