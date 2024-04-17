import { Router } from "express";
import userRouter from "./useRouter"

const router = Router();

router.use("/", userRouter);

export default router