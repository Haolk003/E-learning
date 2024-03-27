import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import passport from "passport";
import logger from "morgan";
import cookiesParser from "cookie-parser";
import { ErrorMiddleWare } from "./middlewares/error";
import session from "express-session";
import authRouter from "./routers/auth.router";
import userRouter from "./routers/user.router";
import courseRouter from "./routers/course.router";
import reviewRouter from "./routers/review.router";
import orderRouter from "./routers/order.route";
import courseProgressRouter from "./routers/userCourseProgress.router";
import noteCourseRouter from "./routers/noteCourse.router";
import categoryRouter from "./routers/category.router";
import analyticsRouter from "./routers/analytics.router";
import courseInteractRouter from "./routers/courseInteract.router";
import cartRouter from "./routers/cart.router";
import couponRouter from "./routers/coupon.router";
import notifyRouter from "./routers/notify.router";
import multer from "multer";
import http from "http";
import job from "./utils/cronJob";
import { rateLimit } from "express-rate-limit";
job.start();
import "./app/passport";
import { mongoConnect } from "./app/mongoConnect";
import path from "path";

export const app = express();
const server = http.createServer(app);

const upload = multer({
  storage: multer.memoryStorage(),
});
app.use(express.static(path.join(__dirname, "..", "..", "public")));
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.use(
  cors({
    origin: [
      process.env.CLIENT_HOST as string,
      process.env.CLIENT_HOST2 as string,
    ],
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 1000,
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
// });

// app.use(limiter);
// app.use(upload.single("myFile"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", courseProgressRouter);
app.use("/api/v1", noteCourseRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", analyticsRouter);
app.use("/api/v1", courseInteractRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", couponRouter);
app.use("/api/v1", notifyRouter);
interface CustomError extends Error {
  statusCode?: number;
}
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as CustomError;
  err.statusCode = 404;
  next(err);
});
app.use(ErrorMiddleWare);
server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening with port ${process.env.PORT || 8000}`);
  mongoConnect();
});

export default server;
