import { Router } from "express";
import userRouter from "./useRouter"
import profileRouter from "./profileRoute"

const router = Router();

router.use("/", userRouter);
router.use("/", profileRouter);

export default router