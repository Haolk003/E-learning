"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middlewares/error");
const express_session_1 = __importDefault(require("express-session"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const course_router_1 = __importDefault(require("./routers/course.router"));
const review_router_1 = __importDefault(require("./routers/review.router"));
const order_route_1 = __importDefault(require("./routers/order.route"));
const userCourseProgress_router_1 = __importDefault(require("./routers/userCourseProgress.router"));
const noteCourse_router_1 = __importDefault(require("./routers/noteCourse.router"));
const category_router_1 = __importDefault(require("./routers/category.router"));
const analytics_router_1 = __importDefault(require("./routers/analytics.router"));
const courseInteract_router_1 = __importDefault(require("./routers/courseInteract.router"));
const cart_router_1 = __importDefault(require("./routers/cart.router"));
const coupon_router_1 = __importDefault(require("./routers/coupon.router"));
const notify_router_1 = __importDefault(require("./routers/notify.router"));
const multer_1 = __importDefault(require("multer"));
const http_1 = __importDefault(require("http"));
const cronJob_1 = __importDefault(require("./utils/cronJob"));
cronJob_1.default.start();
require("./app/passport");
const mongoConnect_1 = require("./app/mongoConnect");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
const server = http_1.default.createServer(exports.app);
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "public")));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use((0, cors_1.default)({
    origin: [
        process.env.CLIENT_HOST,
        process.env.CLIENT_HOST2,
    ],
    credentials: true,
}));
exports.app.use((0, express_session_1.default)({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));
// const limiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 1000,
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
// });
// app.use(limiter);
// app.use(upload.single("myFile"));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use("/api/v1", auth_router_1.default);
exports.app.use("/api/v1", user_router_1.default);
exports.app.use("/api/v1", course_router_1.default);
exports.app.use("/api/v1", review_router_1.default);
exports.app.use("/api/v1", order_route_1.default);
exports.app.use("/api/v1", userCourseProgress_router_1.default);
exports.app.use("/api/v1", noteCourse_router_1.default);
exports.app.use("/api/v1", category_router_1.default);
exports.app.use("/api/v1", analytics_router_1.default);
exports.app.use("/api/v1", courseInteract_router_1.default);
exports.app.use("/api/v1", cart_router_1.default);
exports.app.use("/api/v1", coupon_router_1.default);
exports.app.use("/api/v1", notify_router_1.default);
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
exports.app.use(error_1.ErrorMiddleWare);
server.listen(process.env.PORT || 8000, () => {
    console.log(`Server is listening with port ${process.env.PORT || 8000}`);
    (0, mongoConnect_1.mongoConnect)();
});
exports.default = server;
