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
import UseSetTimeAgo from "@/hooks/useSetTimeAgo";
import UseCaculatorSale from "@/hooks/useCaculatorSale";

import Checkout from "./Checkout";
import Loader from "../loader/Loader";
import Rating from "../ui/Rating";
import convertDuration from "@/utils/convertDuration";
import CoursePlayer from "../ui/CoursePlayer";
import CustomModal from "../ui/CustomModal";

import { CourseType } from "@/types/couresContentType";

import { reviewContentPublic } from "@/types/reviewType";

import { useGetReviewByCoureIdQuery } from "@/features/review/reviewApi";

const CourseLayout = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { data: reviews } = useGetReviewByCoureIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [createPaymentIntent, { data: paymentIntent }] =
    useCreatePaymentIntentMutation();

  const { data: isPurchased, refetch } = useCheckPurchaseCourseQuery(id);
  const { data, isLoading } = useGetCourseByIdPublicQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean[]>([]);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [courseData, setCourseData] = useState<CourseType | null>(null);
  const [reviewsData, setReviewsData] = useState<reviewContentPublic[]>([]);
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
    if (courseData) {
      setIsCollapsed(Array(data.data.courseData.length).fill(true));
      createPaymentIntent({
        amount: courseData.price * 100,
        currency: "USD",
      });
    }
  }, [courseData]);
  useEffect(() => {
    if (data) {
      setCourseData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (reviews) {
      setReviewsData(reviews.data);
    }
  }, [reviews]);
  return (
    <>
      <div className="w-[90%] mx-auto">
        {courseData && (
          <div className="flex  gap-10">
            <div className="w-[65%]">
              <h2 className="text-2xl">{courseData.title}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 mt-4">
                  <Rating ratings={courseData.ratings} />
                  <p className="flex ">
                    <span className="mr-2">{courseData.reviews.length}</span>{" "}
                    Reviews
                  </p>
                </div>
                <div>
                  <span className="mr-2">{courseData.sold}</span> Students
                </div>
              </div>
              <div className="">
                <h3 className="text-2xl mb-5 mt-7">
                  What you will learn from this course?
                </h3>
                <ul className="flex flex-col gap-5 text-[15px]">
                  {courseData.benefits.map((item, index) => (
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
                  {courseData.prerequisites.map((item, index) => (
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
                  {courseData.courseData.map((item, index) => {
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
                    __html: dompurify.sanitize(courseData.description),
                  }}
                ></div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Rating ratings={courseData.ratings || 0} />
                <h3 className="text-2xl">
                  {courseData.ratings.toFixed(2)} Course Rating
                </h3>
                <span className="text-2xl">•</span>
                <p className="text-2xl">{courseData.reviews.length} Reviews</p>
              </div>
              <div className="mb-5">
                {reviewsData &&
                  reviewsData.length > 0 &&
                  reviewsData.slice(0, 9).map((review, reviewIndex) => (
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
                          {UseSetTimeAgo({ time: review.createdAt })} •
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-[35%]">
              <CoursePlayer videoUrl={courseData.demoUrl.url} />
              <div className="flex gap-2 dark:text-white text-black text-3xl mt-3">
                {courseData.sale.discount > 0 && (
                  <p>
                    {UseCaculatorSale(
                      courseData.price,
                      courseData.sale.discount
                    )}
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
              {isPurchased && isPurchased.data ? (
                <Link
                  href={`/course-access/${id}/lecture/${courseData.courseData[0].lectures[0]._id}`}
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
      {paymentIntent && courseData && user && (
        <CustomModal
          component={
            <Checkout
              refesh={refetch}
              clientSecret={paymentIntent.data}
              handleCloseCheckout={handleCloseCheckout}
              courseData={courseData}
              user={user}
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
