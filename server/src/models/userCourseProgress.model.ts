import mongoose, { Document, Schema } from "mongoose";

interface IUserCourseProgreessSChema extends Document {
  userId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  progress: {
    lectureId: string;
    lengthWatched: number;
    isCompleted: boolean;
  }[];
  lastWatchedLecture: {
    lectureTitle: string;
    lectureUrl: String;
    lectureId: String;
  };
}
const userCourseProgressSchema: Schema<IUserCourseProgreessSChema> =
  new mongoose.Schema(
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
      progress: [
        {
          lectureId: String,
          lengthWatched: { type: Number, default: 0 },
          isCompleted: { type: Boolean, default: false },
        },
      ],
      lastWatchedLecture: {
        lectureTitle: String,
        lectureUrl: String,
        lectureId: String,
      },
    },
    { timestamps: true }
  );

const UserCourseProgressModel = mongoose.model(
  "UserCourseProgress",
  userCourseProgressSchema
);

export default UserCourseProgressModel;
