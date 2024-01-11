import { Schema, Document, model } from "mongoose";

interface Notify extends Document {
  message: string;
  sender: string;
  receiver: string;
  createdAt: Date;
}

const notifySchema = new Schema<Notify>({
  message: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const NotifyModel = model<Notify>("Notify", notifySchema);

export default NotifyModel;
