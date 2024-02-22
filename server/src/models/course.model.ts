import mongoose, { Schema } from "mongoose";

export interface IComment extends Document {
  user: mongoose.Schema.Types.ObjectId;
  question: string;
  questionReply?: IComment;
}

export interface ICourse extends Document {
  title: string;
  reviews: mongoose.Types.ObjectId[];
  author: mongoose.Schema.Types.ObjectId;
  price: number;
  sold: number;
  demoUrl: {
    public_id: string;
    url: string;
  };
  ratings: number;
  purchased: number;
  sale: {
    startDate: Date;
    endDate: Date;
    dicount: number;
  };
  thumbnail: {
    public_id: string;
    url: string;
  };
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  tags: string;
  level: string;
  courseData: ICourseData[];
  status: string;
  prerequisites: { title: string }[];
  benefits: { title: string }[];
  progress: number;
  subCategory: Schema.Types.ObjectId;
}

export interface ICourseData {
  description: string;
  lectures: {
    title: string;
    duration: number;
    videoUrl: {
      public_id: string;
      url: string;
    };
    _id: string;
  }[];
  questions?: [
    {
      title: string;
      answer: [{ title: string; user: mongoose.Schema.Types.ObjectId }];
      user: mongoose.Schema.Types.ObjectId;
    }
  ];

  videoSection: string;
  videoLength: number;
  videoPlayer: string;
}

const commentShema = new Schema<IComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: String,
    },
    questionReply: [Object],
  },
  { timestamps: true }
);

const courseDataShema = new Schema<ICourseData>(
  {
    description: String,
    questions: [commentShema],
    lectures: [
      {
        title: String,
        duration: Number,
        videoUrl: { public_id: String, url: String },
      },
    ],
    videoSection: String,
    videoLength: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
const courseSchema: Schema<ICourse> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ratings: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sale: {
      startDate: { type: Date },
      endDate: { type: Date },
      discount: { type: Number, default: 0 },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    level: String,
    tags: String,

    thumbnail: {
      public_id: String,
      url: String,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    demoUrl: { public_id: String, url: String },
    sold: { type: Number, default: 0 },
    courseData: [courseDataShema],
    status: { type: String, enum: ["draft", "public"], default: "draft" },
    prerequisites: [{ title: String }],
    benefits: [{ title: String }],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courseSchema);

export default courseModel;
