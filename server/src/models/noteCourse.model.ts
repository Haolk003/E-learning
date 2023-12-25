import mongoose, { Document } from "mongoose";

interface INoteCourse extends Document {
  content: string;
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  lectureId: string;
  timing: number;
}

const noteCourseShema = new mongoose.Schema<INoteCourse>(
  {
    content: {
      type: String,
      required: true,
    },
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
      required: true,
    },
    timing: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const noteCourseModel = mongoose.model("NoteCourse", noteCourseShema);
export default noteCourseModel;
