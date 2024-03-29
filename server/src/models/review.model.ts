import mongoose, { Schema } from "mongoose";

interface Ireview extends Document {
  user: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  courseId: mongoose.Schema.Types.ObjectId;
  instructorId: Schema.Types.ObjectId;
}
const reviewShema: Schema<Ireview> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewShema);

export default reviewModel;
