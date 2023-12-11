import mongoose, { Document, Schema } from "mongoose";

interface IUserCourseProgreessSChema extends Document {
  userId: string;
  courseId: string;
  lectureId: string;
  lengthWatched: number;
  isCompleted: boolean;
}
const userCourseProgressSchema: Schema<IUserCourseProgreessSChema> =
  new mongoose.Schema({
    userId: {
      type: String,

      required: true,
    },
    courseId: {
      type: String,

      required: true,
    },
    lectureId: {
      type: String,
      required: true,
    },
    lengthWatched: {
      type: Number, // giả sử thời gian tính bằng giây
      required: true,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  });

const UserCourseProgressModel = mongoose.model(
  "UserCourseProgress",
  userCourseProgressSchema
);

export default UserCourseProgressModel;
