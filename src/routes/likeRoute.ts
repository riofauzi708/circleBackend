import { Router } from "express";
import authentication from "../middlewares/authentication";
import { createLike, getLikes } from "../controllers/like";
const likeRouter = Router();

likeRouter.post("/like", authentication, createLike);
likeRouter.get("/likes/:threadId", authentication, getLikes);

export default likeRouter;