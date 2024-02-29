import mongoose from "mongoose";

interface IOrderShema extends Document {
  userId: mongoose.Types.ObjectId;
  payment_info: { id: string; currency: string; amount: number };
  payment_method: object;
  payment_stripe_id: string;
  products: mongoose.Types.ObjectId[];
}
const orderShema = new mongoose.Schema<IOrderShema>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],

    payment_info: {
      id: String,
      currency: String,
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
