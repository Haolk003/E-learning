import mongoose, { Document } from "mongoose";

export interface ICourseInteract extends Document {
  userId: mongoose.Schema.Types.ObjectId | undefined;
  startTime: Date;
  endTime: Date;
  pageView: {
    url: string;
    viewTime?: Date;
    timeSpent: number;
    interactions: string[];
  }[];
  totalTimeSpent: number;
  active: boolean;
  countryAccess: string;
  userAgent: string;
}

const CourseInteractSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  pageView: [
    {
      url: {
        type: String,
        required: true,
      },
      viewTime: {
        type: Date,
      },
      timeSpent: {
        type: Number,
        default: 0,
      },
      interactions: [
        {
          type: String,
        },
      ],
    },
  ],
  totalTimeSpent: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
  countryAccess: String,
  userAgent: String,
});

export default mongoose.model<ICourseInteract>(
  "CourseInteract",
  CourseInteractSchema
);
