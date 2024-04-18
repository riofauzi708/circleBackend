import { Router } from "express";
import uploadMiddleware from "../middlewares/upload";
import authentication from "../middlewares/authentication";
import { updateProfile, getProfile, getProfileById } from "../controllers/profile";

const profileRouter = Router();

profileRouter.patch("/profile", authentication, uploadMiddleware("cover"), updateProfile);
profileRouter.get("/profile", authentication, getProfile);
profileRouter.get("/profile/:id", authentication, getProfileById);

export default profileRouter