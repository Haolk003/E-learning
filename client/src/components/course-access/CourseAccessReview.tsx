import React, { FC, useState } from "react";
import { useStarPercentageQuery } from "@/features/review/reviewApi";
import { useGetReviewByCoureIdQuery } from "@/features/review/reviewApi";
import Rating from "../ui/Rating";
import ProgressPrecentRating from "../ui/progress/ProgressPrecentRating";

import { IoIosSearch } from "react-icons/io";

import { CourseType } from "@/types/couresContentType";

import SelectFilterRating from "../ui/select/SelectFilterRating";
import { reviewContentPublic } from "@/types/reviewType";
import ReviewCardItem from "../card/ReviewCardItem";
type Props = {
  courseId: string;
  courseData: CourseType;
};
const CourseAccessReview: FC<Props> = ({ courseId, courseData }) => {
  const { data } = useStarPercentageQuery(courseId);
  const {
    data: reviews,
    isLoading: reviewsLoading,
    isSuccess: isSuccessReview,
  } = useGetReviewByCoureIdQuery(courseId);
  const [ratingSelectType, setRatingSelectType] = useState("all");

  return (
    <>
      {data && reviews && (
        <div className="md:w-[80%] w-[90%] mx-auto py-5">
          <h2 className="text-2xl">Student feedback</h2>
          <div className="flex md:flex-row flex-col md:items-center items-start gap-4 mt-8 ">
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-5xl text-[#f6b100]">
                {courseData.ratings.toFixed(2)}
              </h2>
              <Rating ratings={courseData.ratings} />
              <p className="text-[#f6b100]">Course Rating</p>
            </div>
            <div className="w-[80%] flex flex-col gap-3">
              <div className="flex items-center gap-4 w-full">
                <div className="md:w-[80%] w-[60%]">
                  <ProgressPrecentRating
                    progress={data.data ? data.data["5 stars"] : 0}
                  />
                </div>
                <div className="flex items-center justify-between gap-1 w-[20%]">
                  <Rating ratings={5} />{" "}
                  <p>{data.data ? data.data["5 stars"] : 0}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="md:w-[80%] w-[60%]">
                  <ProgressPrecentRating
                    progress={data.data ? data.data["4 stars"] : 0}
                  />
                </div>
                <div className="flex items-center justify-between gap-1 w-[20%]">
                  <Rating ratings={4} />{" "}
                  <p>{data.data ? data.data["4 stars"] : 0}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="md:w-[80%] w-[60%]">
                  <ProgressPrecentRating
                    progress={data.data ? data.data["3 stars"] : 0}
                  />
                </div>
                <div className="flex items-center justify-between gap-1 w-[20%]">
                  <Rating ratings={3} />{" "}
                  <p>{data.data ? data.data["3 stars"] : 0}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="md:w-[80%] w-[60%]">
                  <ProgressPrecentRating
                    progress={data.data ? data.data["2 stars"] : 0}
                  />
                </div>
                <div className="flex items-center justify-between gap-1 w-[20%]">
                  <Rating ratings={2} />{" "}
                  <p>{data.data ? data.data["2 stars"] : 0}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="md:w-[80%] w-[60%]">
                  <ProgressPrecentRating
                    progress={data.data ? data.data["1 stars"] : 0}
                  />
                </div>
                <div className="flex items-center justify-between gap-1 w-[20%]">
                  <Rating ratings={1} />{" "}
                  <p>{data.data ? data.data["1 stars"] : 0}%</p>
                </div>
              </div>
            </div>
          </div>
          <h3 className="dark:text-white text-gray2 text-2xl mt-8 mb-4">
            Reviews
          </h3>
          <div className="flex items-center justify-between gap-6 w-full">
            <div className="flex items-center gap-3 border dark:border-white border-black h-[40px] w-[80%]">
              <input
                type="text"
                placeholder="Search reviews"
                className="w-full px-4 h-full bg-transparent outline-none"
              />
              <button className="h-[40px] w-[60px] flex items-center justify-center text-xl dark:bg-white dark:text-black bg-black text-white">
                <IoIosSearch />
              </button>
            </div>
            <div className="">
              <SelectFilterRating
                setTypeRating={setRatingSelectType}
                typeRating={ratingSelectType}
              />
            </div>
          </div>
          <div className="mt-4">
            {reviews.data.map((item: reviewContentPublic, index: number) => {
              return <ReviewCardItem data={item} key={item._id} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAccessReview;
