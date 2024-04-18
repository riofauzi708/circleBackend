import { Router } from "express";
import uploadMiddleware from "../middlewares/upload";
import authentication from "../middlewares/authentication";
import { updateProfile, getProfile } from "../controllers/profile";

const profileRouter = Router();

profileRouter.patch("/profile", authentication, uploadMiddleware("cover"), updateProfile);
profileRouter.get("/profile", authentication, getProfile);

export default profileRouter