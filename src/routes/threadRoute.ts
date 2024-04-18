import { Router } from "express";
import authentication from "../middlewares/authentication";
import uploadMiddleware from "../middlewares/upload";
import { createThread, getReplies, getThread, getThreads } from "../controllers/thread";

const threadRouter = Router();

    threadRouter.post("/thread", authentication, uploadMiddleware("image"), createThread);
    threadRouter.get("/threads", getThreads);
    threadRouter.get("/thread/:id", getThread);
    threadRouter.get("/replies/:id", authentication, getReplies);

export default threadRouter