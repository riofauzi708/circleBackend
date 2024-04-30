import { Router } from "express";
import authentication from "../middlewares/authentication";
import { checkFollowStatus, follow, getFollowerUsers, getFollowers, getFollowingUsers, getFollowings, getSuggestedUsers } from "../controllers/follow";

const followerRouter = Router();

followerRouter.post("/follow", authentication, follow);
followerRouter.get("/check-follow/:id_user", authentication, checkFollowStatus);
followerRouter.get("/follower/:followingId", authentication, getFollowers);
followerRouter.get("/following/:followerId", authentication, getFollowings);
followerRouter.get("/suggest", authentication, getSuggestedUsers);
followerRouter.get("/followings", authentication, getFollowingUsers);
followerRouter.get("/followers", authentication, getFollowerUsers);

export default followerRouter;