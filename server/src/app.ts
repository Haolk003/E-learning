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
import multer from "multer";
import http from "http";

import "./app/passport";
import { mongoConnect } from "./app/mongoConnect";

export const app = express();
const server = http.createServer(app);

const upload = multer({
  storage: multer.memoryStorage(),
});
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// app.use(upload.single("myFile"));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", courseProgressRouter);
interface CustomError extends Error {
  statusCode?: number;
}
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as CustomError;
  err.statusCode = 404;
  next(err);
});
app.use(ErrorMiddleWare);
server.listen(process.env.SERVER_HOST, () => {
  console.log(`Server is listening with port ${process.env.SERVER_HOST}`);
  mongoConnect();
});

export default server;
