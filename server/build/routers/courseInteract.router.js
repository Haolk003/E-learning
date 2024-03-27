"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseInteract_controller_1 = require("../controllers/courseInteract.controller");
const router = express_1.default.Router();
router.post("/logInteraction", courseInteract_controller_1.createCourseInteract);
router.put("/updateInteractEndTime/:id", courseInteract_controller_1.updateInteractEndTime);
router.put("/updateInteractPageView/:id", courseInteract_controller_1.updateInteractPageView);
router.put("/updateInteractionPageView/:id", courseInteract_controller_1.updateInteractionPageView);
router.put("/updateTimeSpent/:id", courseInteract_controller_1.updateTimeSpent);
exports.default = router;
