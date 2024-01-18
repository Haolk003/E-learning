import { Response, Request, NextFunction } from "express";
import useragent from "useragent";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import courseInteractService from "../services/courseInteract.service";
import requestIp from "request-ip";
import jwt from "jsonwebtoken";

export const createCourseInteract = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;
    const uaString = req.headers["user-agent"];
    const agent = useragent.parse(uaString);
    let userId;
    let accessToken = req.cookies.access_token as string;
    if (!accessToken) {
      const refeshToken = req.cookies.refesh_token as string;
      if (refeshToken) {
        const decodeToken = jwt.verify(
          refeshToken,
          process.env.REFESH_TOKEN as string
        ) as { id: string; role: string };
        userId = decodeToken.id;
      }
    } else {
      const decodeToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN as string
      ) as { id: string; role: string };
      userId = decodeToken.id;
    }

    let deviceType = "Desktop";
    if (uaString && uaString.includes("Mobile")) {
      deviceType = "Mobile Phone";
    } else if (uaString && uaString.includes("Tablet")) {
      deviceType = "Tablet";
    } else {
      deviceType = "Desktop";
    }

    const clientIp = requestIp.getClientIp(req);
    const data = await courseInteractService.createInteractWebsite({
      userIp: clientIp,
      url,
      agent: agent.toAgent(),
      deviceType,
      userId,
    });
    res.status(200).json({ success: true, data: data });
  }
);

export const updateInteractPageView = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;
    const { id } = req.params;
    const interact = await courseInteractService.updateInteractPageView(
      id,
      url
    );
    res
      .status(200)
      .json({ success: true, data: interact, message: "update success" });
  }
);

export const updateInteractEndTime = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const interact = await courseInteractService.updateInteractEndTime(id);
    res
      .status(200)
      .json({ success: true, data: interact, message: "update success" });
  }
);

export const updateInteractionPageView = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { interation } = req.body;
    const interact = await courseInteractService.updateInteractionInPageView(
      id,
      interation
    );
    res
      .status(200)
      .json({ success: true, data: interact, message: "update success" });
  }
);

export const updateTimeSpent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { timeSpent } = req.body;
    const interact = await courseInteractService.updateTimeSpent(id, timeSpent);
    res
      .status(200)
      .json({ success: true, data: interact, message: "update success" });
  }
);
