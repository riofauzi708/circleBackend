import { Router } from "express";
import { Register, Login, getUsers } from "../controllers/user";
import authentication from "../middlewares/authentication";

const userRouter = Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/users", authentication, getUsers);

export default userRouter;
