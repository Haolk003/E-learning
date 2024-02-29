import { string } from "yup";
import apiSlice from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCourseStep1: build.mutation({
      query: ({ id, data }) => ({
        url: `create-course-step1/${id}`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    createCourseStep2: build.mutation({
      query: ({ data, courseId }) => ({
        url: `create-edit-course-step2/${courseId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    createCourseStep3: build.mutation({
      query: ({ data, courseId }) => ({
        url: `create-edit-course-step3/${courseId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    uploadImageCourse: build.mutation({
      query: (data) => ({
        url: `upload-image-course`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    uploadVideo: build.mutation({
      query: ({ data, id }) => ({
        url: `uploadVideo/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteFileCloudinary: build.mutation({
      query: (id: string) => ({
        url: `deleteFile`,
        method: "PUT",
        body: { public_id: id },
        credentials: "include" as const,
      }),
    }),
    getCourseInstructor: build.query({
      query: (id: string) => ({
        url: `get-course-instructor/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    publicCourseById: build.mutation({
      query: (id: string) => ({
        method: "PUT",
        url: `public-course/${id}`,
        credentials: "include" as const,
      }),
    }),
    getAllCourse: build.query({
      query: ({ sort, keyword, page, price, level, ratings }) => ({
        url: `get-all-courses?sort=${sort}${
          ratings ? `&ratings[gte]=${ratings}` : ""
        }&keyword=${keyword}&page=${page}${
          price === "paid" ? "&price[gt]=0" : ""
        }${price === "free" ? "&price=0" : ""}&level=${level ? level : ""}`,
        method: "GET",

        credentials: "include" as const,
      }),
    }),
    getMyCourseByIntructor: build.query({
      query: ({ sort, keyword, limit, page }) => ({
        url: `get-intructor-courses?sort=${sort}&keyword=${keyword}&limit=${limit}&page=${page}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourseAdmin: build.mutation({
      query: ({ id }) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getCourseByIdPublic: build.query({
      query: (id: string) => ({
        url: `get-course-public/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getpurchaserCourse: build.query({
      query: (id: string) => ({
        url: `/get-purchased-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateLengthWatched: build.mutation({
      query: ({
        lectureId,
        courseId,
        lengthWatched,
        lectureTitle,
        lectureUrl,
      }) => ({
        url: "update-lengthWatched-video",
        method: "PUT",
        body: { lectureId, courseId, lengthWatched, lectureTitle, lectureUrl },
        credentials: "include" as const,
      }),
    }),
    updateIsCompleted: build.mutation({
      query: ({
        lectureId,
        courseId,
        isCompleted,
        lectureTitle,
        lectureUrl,
      }) => ({
        url: "update-isCompleted-video",
        method: "PUT",
        body: { lectureId, courseId, isCompleted, lectureTitle, lectureUrl },
        credentials: "include" as const,
      }),
    }),
    getProgressLecture: build.query({
      query: (courseId: string) => ({
        url: `get-progress-lecture/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getProgressCoursesUser: build.query({
      query: () => ({
        url: "/get-progress",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCoursesCategoryPublic: build.query({
      query: ({ categoryId, subCategoryId }) => ({
        url: `/get-courses-category/${categoryId}${
          subCategoryId ? `/${subCategoryId}` : ""
        }`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCoursesOfInstructor: build.query({
      query: ({
        instructorId,
        page,
      }: {
        instructorId: string;
        page: number;
      }) => ({
        url: `/get-courses-instructor/${instructorId}?page=${page}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseStep1Mutation,
  useCreateCourseStep2Mutation,
  useCreateCourseStep3Mutation,
  useUploadImageCourseMutation,
  useUploadVideoMutation,
  useDeleteFileCloudinaryMutation,
  useGetCourseInstructorQuery,
  usePublicCourseByIdMutation,
  useGetAllCourseQuery,
  useDeleteCourseAdminMutation,
  useGetMyCourseByIntructorQuery,
  useGetCourseByIdPublicQuery,
  useGetpurchaserCourseQuery,
  useUpdateIsCompletedMutation,
  useUpdateLengthWatchedMutation,
  useGetProgressLectureQuery,
  useGetProgressCoursesUserQuery,
  useGetCoursesCategoryPublicQuery,
  useGetCoursesOfInstructorQuery,
} = courseApi;
