import { Router } from "express";
import * as gptController from "../controllers/gptController.js";

const gptRouter = Router();

gptRouter.post("/complete", gptController.getCompletion);

export default gptRouter;