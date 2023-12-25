import apiSlice from "../api/apiSlice";

const noteCourseApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createNoteCourse: build.mutation({
      query: ({ timing, courseId, content, lectureId }) => ({
        url: "create-note-course",
        method: "POST",
        body: { timing, courseId, content, lectureId },
        credentials: "include" as const,
      }),
    }),
    updateNoteCourse: build.mutation({
      query: ({ id, content }) => ({
        url: `update-note-course/${id}`,
        method: "PUT",
        body: { content },
        credentials: "include" as const,
      }),
    }),
    getNoteCourse: build.query({
      query: (courseId) => ({
        url: `get-note-course/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteNoteCourse: build.mutation({
      query: (id) => ({
        url: `delete-note-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateNoteCourseMutation,
  useDeleteNoteCourseMutation,
  useUpdateNoteCourseMutation,
  useGetNoteCourseQuery,
} = noteCourseApi;
