import mongoose, { Schema, Types } from "mongoose";

interface IcartShema extends Document {
  userId: Types.ObjectId;
  items: {
    courseId: mongoose.Types.ObjectId;
    price: number;
  }[];
  modifiedOn: Date;
  totalPrice: number;
  isApplyCoupon: boolean;
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
    isApplyCoupon: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartShema);
