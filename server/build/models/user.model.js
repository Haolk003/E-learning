"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
const userSchema = new mongoose_1.default.Schema({
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
            validator: function (value) {
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
        enum: ["user", "admin", "instructor"],
    },
    linkedin: String,
    facebookLink: String,
    youtubeLink: String,
    twitterLink: String,
    bio: String,
    myCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Course" }],
    myLearning: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Course" }],
    headline: String,
    website: String,
    avatar: { public_id: String, url: String },
    googleUserId: String,
    facebookUserId: String,
    loginType: String,
    lastJoinedAt: { type: Date, default: Date.now() },
    timeBeginInstructors: { type: Date },
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcryptjs_1.default.compare(enterPassword, this.password);
};
userSchema.methods.signAccessToken = async function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id, role: this.role }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
    return token;
};
userSchema.methods.signRefeshToken = async function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id, role: this.role }, process.env.REFESH_TOKEN, { expiresIn: process.env.REFESH_TOKEN_EXPIRE });
    return token;
};
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
