import courseModel, { ICourseData } from "../models/course.model";
import userModel from "../models/user.model";
import reviewModel from "../models/review.model";
import ErrorHandle from "../utils/errorHandle";
import sendEmail from "../utils/sendEmail";

type addReviewType = {
  comment: string;
  rating: number;
  userId: string;
  courseId: string;
};
const addReview = async ({
  comment,
  courseId,
  rating,
  userId,
}: addReviewType) => {
  const findCourse = await courseModel.findById(courseId);
  if (!findCourse) {
    throw new ErrorHandle(400, "Course does not exist");
  }
  const findReviewUser = await reviewModel.findOne({ courseId: courseId });
  if (findReviewUser) {
    throw new ErrorHandle(400, "You have already reviewed this course");
  }
  const newReview = await reviewModel.create({
    user: userId,
    courseId: courseId,
    comment: comment,
    rating: rating,
  });

  if (newReview) {
    const totalRatingReview =
      (findCourse.ratings * findCourse.reviews.length + rating) /
      (findCourse.reviews.length + 1);
    findCourse.reviews?.push(newReview._id);
    findCourse.ratings = totalRatingReview;
    await findCourse.save();
  }
  return newReview;
};

const getAllReview = async () => {
  const reviews = await reviewModel
    .find()
    .sort("-createdAt")
    .populate("user courseId");
  return reviews;
};

const getReviewsCourse = async (courseId: string) => {
  const getReviews = await reviewModel
    .find({ courseId: courseId })
    .populate("user", "avatar firstName lastName email");
  return getReviews;
};
type EditReviewData = {
  comment: string;
  star: number;
};
const EditReviews = async (
  reviewId: string,
  userId: string,
  data: EditReviewData
) => {
  const updateReview = await reviewModel.findOneAndUpdate(
    { _id: reviewId, user: userId },
    {
      $set: { ...data },
    },
    { new: true }
  );
  if (!updateReview) {
    throw new ErrorHandle(400, "Update Review Failure");
  }
  return updateReview;
};
const reviewService = {
  addReview,
  getAllReview,
  getReviewsCourse,
  EditReviews,
};

export default reviewService;
