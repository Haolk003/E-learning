import mongoose, { Model, Schema } from "mongoose";
import { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
export interface IUser extends Document {
  firstName: string;
  avatar: {
    public_id: string;
    url: string;
  };
  loginType: string;
  googleUserId: string;
  facebookUserId: string;
  lastName: string;
  password: string;
  email: string;
  isBanned: boolean;
  myLearning: Schema.Types.ObjectId[];
  website: string;
  facebookLink: string;
  youtubeLink: string;
  twitterLink: string;
  role: string;
  linkedin: string;
  bio: string;
  headline: string;
  isVerified: boolean;
  myCourses: Schema.Types.ObjectId[];
  timeBeginInstructors: Date;
  comparePassword: (enterPassword: string) => Promise<boolean>;
  signAccessToken: () => string;
  signRefeshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
    email: {
      type: String,
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value), "Please enter a valid email";
        },
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    linkedin: String,
    facebookLink: String,
    youtubeLink: String,
    twitterLink: String,
    bio: String,
    myCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    myLearning: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    headline: String,
    website: String,
    avatar: { public_id: String, url: String },
    googleUserId: String,
    facebookUserId: String,
    loginType: String,
    timeBeginInstructors: { type: Date },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.comparePassword = async function (enterPassword: string) {
  return await bcrypt.compare(enterPassword, this.password);
};
userSchema.methods.signAccessToken = async function () {
  const token = jwt.sign(
    { id: this._id as string, role: this.role },
    process.env.ACCESS_TOKEN as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  );

  return token;
};
userSchema.methods.signRefeshToken = async function () {
  const token = jwt.sign(
    { id: this._id as string, role: this.role },
    process.env.REFESH_TOKEN as string,
    { expiresIn: process.env.REFESH_TOKEN_EXPIRE }
  );
  return token;
};
const userModel = mongoose.model("User", userSchema);

export default userModel;
