import { Router } from "express";
import authentication from "../middlewares/authentication";
import { follow, getFollowers, getFollowings } from "../controllers/follow";
const followerRouter = Router();

followerRouter.post("/follow", authentication, follow);
followerRouter.get("/follower/:followingId", authentication, getFollowers);
followerRouter.get("/following/:followerId", authentication, getFollowings);

export default followerRouter;