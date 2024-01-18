import ErrorHandle from "../utils/errorHandle";
import courseInteractModel from "../models/courseInteract.model";
import axios from "axios";

type interactWebsite = {
  userIp?: any;
  agent?: string;
  url: string;
  deviceType: string;
  userId?: string;
};
const createInteractWebsite = async (data: interactWebsite) => {
  const response = await axios.get(
    `http://api.ipstack.com/${data.userIp}?access_key=${process.env.IPSTACK_ACCESSS_KEY}`
  );

  const newInteract = new courseInteractModel({
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

interface IUpdateInteractPageView {
  url: string;
}
const updateInteractPageView = async (id: string, url: string) => {
  const interact = await courseInteractModel.findOne({ _id: id });
  if (!interact) {
    throw new ErrorHandle(400, "Can not find Interact");
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

const updateInteractEndTime = async (id: string) => {
  const interact = await courseInteractModel.findOne({ _id: id });
  if (!interact) {
    throw new ErrorHandle(400, "Can not find Interact");
  }
  interact.endTime = new Date();
  interact.active = false;
  await interact.save();
  return interact;
};

const updateInteractionInPageView = async (id: string, interation: string) => {
  const interact = await courseInteractModel.findOne({ _id: id });
  if (!interact) {
    throw new ErrorHandle(400, "Can not find Interact");
  }
  interact.pageView[interact.pageView.length - 1].interactions.push(interation);
  await interact.save();
  return interact;
};

const updateTimeSpent = async (id: string, timeSpent: number) => {
  const interact = await courseInteractModel.findOne({ _id: id });
  if (!interact) {
    throw new ErrorHandle(400, "Can not find Interact");
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

export default courseInteractService;
