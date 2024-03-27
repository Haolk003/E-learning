"use client";

import React, { useEffect, useState } from "react";
import { useGetProfileInstructorQuery } from "@/features/user/userApi";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/userType";
import dompurify from "dompurify";
import Image from "next/image";

import { CiLink, CiTwitter, CiYoutube, CiFacebook } from "react-icons/ci";
import Link from "next/link";

import { useGetCoursesOfInstructorQuery } from "@/features/course/courseApi";
import { CourseType } from "@/types/couresContentType";
import Rating from "../ui/Rating";
type Props = {
  id: string;
};
const IntructorProfileLayout: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  const { data, isLoading, isError, isSuccess } =
    useGetProfileInstructorQuery(id);
  const [page, setPage] = useState(1);
  const { data: courses } = useGetCoursesOfInstructorQuery({
    instructorId: id,
    page: page,
  });

  const [userData, setUserData] = useState<UserType | null>(null);
  const [courseData, setCourseData] = useState<CourseType[]>([]);
  //   useEffect(() => {
  //     if (isError) {
  //       router.push("/");
  //     }
  //   }, [isError]);
  useEffect(() => {
    if (data) {
      setUserData(data.data.user);
    }
  }, [data]);

  useEffect(() => {
    if (courses) {
      setCourseData(courses.data);
    }
  }, [courses]);
  return (
    <div>
      {userData && data && (
        <div className="flex md:flex-row flex-col-reverse gap-10">
          <div className="md:w-[80%] w-full px-3">
            <h4 className="text-xl font-semibold text-gray11 mb-2">
              Instructor
            </h4>
            <h2 className="md:text-4xl text-2xl font-bold mb-2">
              {userData.lastName} {userData.firstName}
            </h2>
            <p className="font-semibold text-xl mt-2">{userData.headline}</p>
            <div className="flex items-center gap-8 mt-6">
              <div className="flex flex-col gap-2">
                <p className="text-gray9">Total students</p>
                <p className="font-semibold text-2xl">
                  {data.data.totalStudents}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-gray9">Total reviews</p>
                <p className="font-semibold text-2xl">
                  {data.data.totalReviews}
                </p>
              </div>
            </div>
            <h4 className="text-2xl font-semibold mt-4">About me</h4>
            <div
              className="space-x-6 mt-3 leading-6"
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(userData.bio || ""),
              }}
            ></div>
            <h2 className="text-[18px] font-semibold my-4">
              My Courses ({courseData.length})
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              {courseData &&
                courseData.map((item, index) => {
                  const totalHours = item.courseData.reduce((total, item2) => {
                    return total + item2.videoLength;
                  }, 0);
                  const totalLecture = item.courseData.reduce(
                    (total, item2) => {
                      return total + item2.lectures.length;
                    },
                    0
                  );
                  return (
                    <Link
                      href={`/course/${item._id}`}
                      className="flex flex-col gap-3  border-b border-gray8 dark:border-gray6 pb-4"
                      key={item._id}
                    >
                      <div className="w-full ">
                        <Image
                          src={item.thumbnail.url}
                          alt=""
                          width={300}
                          height={250}
                          className="object-cover w-full h-[200px]  "
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-[70%]">
                        <h3 className="text-[16px] font-semibold ">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[16px]">
                            {item.ratings.toFixed(1)}
                          </p>
                          <Rating ratings={item.ratings} />
                        </div>
                        <div className="flex items-center gap-1 text-gray9 text-[12px] w-full">
                          <p>{totalHours.toFixed(2)} total hours</p>
                          <span>·</span>
                          <p>{totalLecture} lectures</p>
                          <span>·</span>
                          <p>{item.level}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <p className="font-semibold text-[16px]">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="line-through text-gray8 font-thin text-[14px]">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="md:w-[20%] flex flex-col md:gap-5 px-5">
            <div className="md:w-[200px] md:h-[200px] w-[100px] h-[100px] overflow-hidden flex items-center justify-center">
              <Image
                src={
                  userData.avatar ? userData.avatar.url : `/assets/avatar.jpg`
                }
                alt=""
                width={200}
                height={200}
                className="md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full object-cover overflow-hidden"
              />
            </div>
            <div className="flex flex-col gap-2 md:mt-0 mt-4">
              {userData.website && (
                <Link
                  href={userData.website}
                  className="flex md:w-[200px] w-full h-[50px] justify-center font-semibold items-center gap-2 dark:border-gray8 border-[2px]"
                >
                  <CiLink size={30} />
                  <p className="text-[16px]">Website</p>
                </Link>
              )}
              {userData.twitterLink && (
                <Link
                  href={userData.twitterLink}
                  className="flex md:w-[200px] w-full h-[50px] justify-center font-semibold items-center gap-2 dark:border-gray8 border-[2px]"
                >
                  <CiTwitter size={30} />
                  <p className="text-[16px]">Twitter</p>
                </Link>
              )}
              {userData.youtubeLink && (
                <Link
                  href={userData.youtubeLink}
                  className="flex md:w-[200px] w-full h-[50px] justify-center font-semibold items-center gap-2 dark:border-gray8 border-[2px]"
                >
                  <CiYoutube size={30} />
                  <p className="text-[16px]">Youtube</p>
                </Link>
              )}
              {userData.facebookLink && (
                <Link
                  href={userData.facebookLink}
                  className="flex md:w-[200px] w-full h-[50px] justify-center font-semibold items-center gap-2 dark:border-gray8 border-[2px]"
                >
                  <CiFacebook size={30} />
                  <p className="text-[16px]">Facebook</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntructorProfileLayout;
