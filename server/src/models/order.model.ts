import mongoose from "mongoose";

interface IOrderShema extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  payment_info: object;
  payment_method: object;
  payment_stripe_id: string;
}
const orderShema = new mongoose.Schema<IOrderShema>({
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
  payment_info: {
    type: Object,
    required: true,
  },
  // payment_method: {
  //   type: Object,
  //   required: true,
  // },
});

export default mongoose.model("Order", orderShema);
