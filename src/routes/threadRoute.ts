import { Router } from "express";
import authentication from "../middlewares/authentication";
import uploadMiddleware from "../middlewares/upload";
import { createThread, getThread, getThreads } from "../controllers/thread";

const threadRouter = Router();

    threadRouter.post("/thread", authentication, uploadMiddleware("image"), createThread);
    threadRouter.get("/threads", authentication, getThreads);
    threadRouter.get("/thread/:id", authentication, getThread);

export default threadRouter