import mongoose from "mongoose";

interface IOrderShema extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  payment_info: { id: string; object: string; amount: number };
  payment_method: object;
  payment_stripe_id: string;
  lectureId: string;
}
const orderShema = new mongoose.Schema<IOrderShema>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    lectureId: {
      type: String,
    },
    payment_info: {
      id: String,
      object: String,
      amount: { type: Number },
    },
    // payment_method: {
    //   type: Object,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderShema);
