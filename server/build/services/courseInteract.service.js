"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle_1 = __importDefault(require("../utils/errorHandle"));
const courseInteract_model_1 = __importDefault(require("../models/courseInteract.model"));
const axios_1 = __importDefault(require("axios"));
const createInteractWebsite = async (data) => {
    const response = await axios_1.default.get(`http://api.ipstack.com/${data.userIp}?access_key=${process.env.IPSTACK_ACCESSS_KEY}`);
    const newInteract = new courseInteract_model_1.default({
        startTime: new Date(),
        userAgent: data.agent,
        pageView: [{ url: data.url, viewTime: new Date() }],
        countryAccess: response.data.country_name,
        deviceType: data.deviceType,
        userId: data.userId,
    });
    if (response.data.country_name) {
        newInteract.countryAccess = response.data.country_name;
    }
    await newInteract.save();
    return newInteract;
};
const updateInteractPageView = async (id, url) => {
    const interact = await courseInteract_model_1.default.findOne({ _id: id });
    if (!interact) {
        throw new errorHandle_1.default(400, "Can not find Interact");
    }
    if (interact.pageView[interact.pageView.length - 1].url !== url) {
        interact.pageView.push({
            url: url,
            viewTime: new Date(),
            interactions: [],
            timeSpent: 0,
        });
    }
    await interact.save();
    return interact;
};
const updateInteractEndTime = async (id) => {
    const interact = await courseInteract_model_1.default.findOne({ _id: id });
    if (!interact) {
        throw new errorHandle_1.default(400, "Can not find Interact");
    }
    interact.endTime = new Date();
    interact.active = false;
    await interact.save();
    return interact;
};
const updateInteractionInPageView = async (id, interation) => {
    const interact = await courseInteract_model_1.default.findOne({ _id: id });
    if (!interact) {
        throw new errorHandle_1.default(400, "Can not find Interact");
    }
    interact.pageView[interact.pageView.length - 1].interactions.push(interation);
    await interact.save();
    return interact;
};
const updateTimeSpent = async (id, timeSpent) => {
    const interact = await courseInteract_model_1.default.findOne({ _id: id });
    if (!interact) {
        throw new errorHandle_1.default(400, "Can not find Interact");
    }
    interact.totalTimeSpent += timeSpent;
    interact.pageView[interact.pageView.length - 1].timeSpent += timeSpent;
    await interact.save();
    return interact;
};
const courseInteractService = {
    createInteractWebsite,
    updateInteractEndTime,
    updateInteractPageView,
    updateInteractionInPageView,
    updateTimeSpent,
};
exports.default = courseInteractService;
