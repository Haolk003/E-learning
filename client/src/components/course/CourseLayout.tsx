"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dompurify from "dompurify";

import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { BiMoviePlay } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "@/store/hook";

import { useGetCourseByIdPublicQuery } from "@/features/course/courseApi";
import {
  useCreatePaymentIntentMutation,
  useCheckPurchaseCourseQuery,
} from "@/features/order/orderApi";
import { openLogin } from "@/features/layout/layoutSlice";
import useSetTimeAgo from "@/hooks/useSetTimeAgo";
import useCaculatorSale from "@/hooks/useCaculatorSale";

import Checkout from "./Checkout";
import Loader from "../loader/Loader";
import Rating from "../ui/Rating";
import convertDuration from "@/utils/convertDuration";
import CoursePlayer from "../ui/CoursePlayer";
import CustomModal from "../ui/CustomModal";

import { CourseType } from "@/types/couresContentType";

const CourseLayout = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [createPaymentIntent, { data: paymentIntent }] =
    useCreatePaymentIntentMutation();

  const { data: isPurchased } = useCheckPurchaseCourseQuery(id);
  const { data, isLoading, isSuccess, error } = useGetCourseByIdPublicQuery(
    id,
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [isCollapsed, setIsCollapsed] = useState<boolean[]>([]);
  const [openCheckout, setOpenCheckout] = useState(false);

  let course;
  if (data?.data) {
    course = data.data as CourseType;
  }

  const changeIsCollapsed = (index: number) => {
    const newIsCollapse = [...isCollapsed];
    newIsCollapse[index] = !isCollapsed[index];
    setIsCollapsed(newIsCollapse);
  };
  const handleBuyCourse = () => {
    if (!user) {
      dispatch(openLogin(""));
    } else {
      setOpenCheckout(true);
    }
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };
  useEffect(() => {
    if (data) {
      setIsCollapsed(Array(data.data.courseData.length).fill(true));
      createPaymentIntent({ amount: 20, currency: "USD" });
    }
  }, [data]);
  console.log(isPurchased);
  return (
    <>
      <div className="w-[90%] mx-auto">
        {course && (
          <div className="flex  gap-10">
            <div className="w-[65%]">
              <h2 className="text-2xl">{course.title}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 mt-4">
                  <Rating ratings={course.ratings} />
                  <p className="flex ">
                    <span className="mr-2">{course.reviews.length}</span>{" "}
                    Reviews
                  </p>
                </div>
                <div>
                  <span className="mr-2">{course.sold}</span> Students
                </div>
              </div>
              <div className="">
                <h3 className="text-2xl mb-5 mt-7">
                  What you will learn from this course?
                </h3>
                <ul className="flex flex-col gap-5 text-[15px]">
                  {course.benefits.map((item, index) => (
                    <li className="flex items-center gap-3" key={item._id}>
                      <IoCheckmarkDoneOutline size={20} />
                      <p>{item.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <h3 className="text-2xl mb-5 mt-12">
                  What are the prequisites for starting this course?
                </h3>
                <ul className="flex flex-col gap-5 text-[15px]">
                  {course.prerequisites.map((item, index) => (
                    <li className="flex items-center gap-3" key={item._id}>
                      <IoCheckmarkDoneOutline size={20} />
                      <p>{item.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl mt-12 mb-8">Course Overview</h3>
                <div className="flex flex-col gap-4">
                  {course.courseData.map((item, index) => {
                    return (
                      <div key={item._id}>
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <h4>{item.videoSection}</h4>
                            <div className="flex items-center gap-1">
                              <p>{item.lectures.length} Lessons </p>
                              <span>·</span>
                              <p>{convertDuration(item.videoLength)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => changeIsCollapsed(index)}
                            className={`${
                              !isCollapsed[index] && "rotate-180 "
                            } duration-200`}
                          >
                            <IoIosArrowDown />
                          </button>
                        </div>
                        {!isCollapsed[index] && (
                          <div className="flex flex-col gap-2">
                            {item.lectures.map((lecture, lectureIndex) => (
                              <div
                                className="flex items-center gap-3"
                                key={item._id}
                              >
                                <BiMoviePlay className="text-4xl text-blue8" />
                                <div>
                                  <h5>{lecture.title}</h5>
                                  <p>{convertDuration(lecture.duration)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="">
                <h3 className="text-2xl mb-4 mt-10">Course Details</h3>
                <div
                  className="leading-8"
                  dangerouslySetInnerHTML={{
                    __html: dompurify.sanitize(course.description),
                  }}
                ></div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Rating ratings={course.ratings || 0} />
                <h3 className="text-2xl">
                  {course.ratings.toFixed(2)} Course Rating
                </h3>
                <span className="text-2xl">•</span>
                <p className="text-2xl">{course.reviews.length} Reviews</p>
              </div>
              <div className="mb-5">
                {course.reviews &&
                  course.reviews.length > 0 &&
                  course.reviews.map((review, reviewIndex) => (
                    <div className="flex gap-3 mt-5" key={review._id}>
                      <Image
                        src={
                          review.user.avatar
                            ? review.user.avatar.url
                            : "/assets/avatar.jpg"
                        }
                        alt=""
                        width={40}
                        height={40}
                        className="object-cover w-[40px] h-[40px] rounded-full"
                      />
                      <div className="">
                        <div className="flex items-center gap-2">
                          <h4>
                            {review.user.lastName} {review.user.firstName}
                          </h4>
                          <Rating ratings={review.rating || 0} />
                        </div>
                        <p className="text-[14px]">{review.comment}</p>
                        <span className="text-[13px]">
                          {useSetTimeAgo({ time: review.createdAt })} •
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-[35%]">
              <CoursePlayer videoUrl={course.demoUrl.url} />
              <div className="flex gap-2 dark:text-white text-black text-3xl mt-3">
                {course.sale.discount > 0 && (
                  <p>{useCaculatorSale(course.price, course.sale.discount)}</p>
                )}

                <p
                  className={`${
                    course.sale.discount > 0
                      ? "relative -top-2 left-0"
                      : " font-semibold text-3xl"
                  }`}
                >
                  ${course.price.toFixed(2)}
                </p>
              </div>
              {isPurchased && isPurchased.data ? (
                <Link
                  href={`/course-access/${id}/lecture/${course.courseData[0].lectures[0]._id}`}
                  className=" text-white  "
                >
                  <button className="!w-[180px] !h-[50px] bg-ruby11 !mt-5 rounded-[50px]">
                    Enter to Course
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-ruby11 text-white rounded-[50px] w-[180px] h-[50px] mt-4"
                  onClick={handleBuyCourse}
                >
                  Buy Course
                </button>
              )}

              <ul
                className="list-inside list-disc flex flex-col gap-2
           mt-7"
              >
                <li>Source code included</li>
                <li>Full lifetime access</li>
                <li>Certificate of completion</li>
                <li>Premium Support</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {paymentIntent && (
        <CustomModal
          component={
            <Checkout
              clientSecret={paymentIntent.data}
              handleCloseCheckout={handleCloseCheckout}
            />
          }
          open={openCheckout}
          handleClose={handleCloseCheckout}
        />
      )}

      {isLoading && (
        <div className="fixed top-0 left-0 bg-blackA5 w-screen h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default CourseLayout;
