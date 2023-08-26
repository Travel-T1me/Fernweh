import { Router } from "express";
import * as gptController from "../controllers/gptController.js";

const router = Router();

router.post("/complete", gptController.getCompletion);

export default router;