import { Router } from "express";
import userRouter from "./useRouter";
import profileRouter from "./profileRoute";
import threadRouter from "./threadRoute";
import followerRouter from "./followRoute";
import likeRouter from "./likeRoute";

const router = Router();

router.use("/", userRouter);
router.use("/", profileRouter);
router.use("/", threadRouter);
router.use("/", likeRouter);
router.use("/", followerRouter);

export default router