"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeSpent = exports.updateInteractionPageView = exports.updateInteractEndTime = exports.updateInteractPageView = exports.createCourseInteract = void 0;
const useragent_1 = __importDefault(require("useragent"));
const catchAsyncError_1 = require("../middlewares/catchAsyncError");
const courseInteract_service_1 = __importDefault(require("../services/courseInteract.service"));
const request_ip_1 = __importDefault(require("request-ip"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createCourseInteract = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { url } = req.body;
    const uaString = req.headers["user-agent"];
    const agent = useragent_1.default.parse(uaString);
    let userId;
    let accessToken = req.cookies.access_token;
    if (!accessToken) {
        const refeshToken = req.cookies.refesh_token;
        if (refeshToken) {
            const decodeToken = jsonwebtoken_1.default.verify(refeshToken, process.env.REFESH_TOKEN);
            userId = decodeToken.id;
        }
    }
    else {
        const decodeToken = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN);
        userId = decodeToken.id;
    }
    let deviceType = "Desktop";
    if (uaString && uaString.includes("Mobile")) {
        deviceType = "Mobile Phone";
    }
    else if (uaString && uaString.includes("Tablet")) {
        deviceType = "Tablet";
    }
    else {
        deviceType = "Desktop";
    }
    const clientIp = request_ip_1.default.getClientIp(req);
    const data = await courseInteract_service_1.default.createInteractWebsite({
        userIp: clientIp,
        url,
        agent: agent.toAgent(),
        deviceType,
        userId,
    });
    res.status(200).json({ success: true, data: data });
});
exports.updateInteractPageView = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { url } = req.body;
    const { id } = req.params;
    const interact = await courseInteract_service_1.default.updateInteractPageView(id, url);
    res
        .status(200)
        .json({ success: true, data: interact, message: "update success" });
});
exports.updateInteractEndTime = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const interact = await courseInteract_service_1.default.updateInteractEndTime(id);
    res
        .status(200)
        .json({ success: true, data: interact, message: "update success" });
});
exports.updateInteractionPageView = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const { interation } = req.body;
    const interact = await courseInteract_service_1.default.updateInteractionInPageView(id, interation);
    res
        .status(200)
        .json({ success: true, data: interact, message: "update success" });
});
exports.updateTimeSpent = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { id } = req.params;
    const { timeSpent } = req.body;
    const interact = await courseInteract_service_1.default.updateTimeSpent(id, timeSpent);
    res
        .status(200)
        .json({ success: true, data: interact, message: "update success" });
});
