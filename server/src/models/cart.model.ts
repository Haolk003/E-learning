import mongoose, { Schema, Types } from "mongoose";

interface IcartShema extends Document {
  userId: Types.ObjectId;
  items: {
    courseId: Types.ObjectId;
    price: number;
  }[];
  modifiedOn: Date;
  totalPrice: number;
  applyCoupon: Types.ObjectId | null;
}

const cartShema = new mongoose.Schema<IcartShema>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
    applyCoupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartShema);
