import mongoose, { Schema, Document, model } from "mongoose";

interface Notify extends Document {
  message: string;
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  status: string;
}

const notifySchema = new Schema<Notify>(
  {
    message: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
    },
  },
  { timestamps: true }
);

const NotifyModel = model<Notify>("Notify", notifySchema);

export default NotifyModel;
