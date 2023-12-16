import mongoose, { Document, Schema } from "mongoose";

interface IUserCourseProgreessSChema extends Document {
  userId: string;
  courseId: Schema.Types.ObjectId;
  progress: {
    lectureId: string;
    lengthWatched: number;
    isCompleted: boolean;
  }[];
  lastWatchedLectureId: string;
}
const userCourseProgressSchema: Schema<IUserCourseProgreessSChema> =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      progress: [
        {
          lectureId: String,
          lengthWatched: { type: Number, default: 0 },
          isCompleted: { type: Boolean, default: false },
        },
      ],
      lastWatchedLectureId: String,
    },
    { timestamps: true }
  );

const UserCourseProgressModel = mongoose.model(
  "UserCourseProgress",
  userCourseProgressSchema
);

export default UserCourseProgressModel;
