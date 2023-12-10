import mongoose, { Schema } from "mongoose";

interface Ireview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  courseId: mongoose.Schema.Types.ObjectId;
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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewShema);

export default reviewModel;
