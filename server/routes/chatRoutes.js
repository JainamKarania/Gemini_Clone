import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendMessage, streamMessage } from "../controllers/chatController.js";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: { error: "Rate limit: too many requests. Please wait a moment." },
});

const router = Router();
router.post("/", limiter, sendMessage);
router.post("/stream", limiter, streamMessage);

export default router;