import { Router } from "express";
import userRouter from "./useRouter"
import profileRouter from "./profileRoute"
import threadRouter from "./threadRoute";

const router = Router();

router.use("/", userRouter);
router.use("/", profileRouter);
router.use("/", threadRouter);

export default router