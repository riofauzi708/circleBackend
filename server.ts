import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import db from "./src/db";
import { follow, getFollowers } from "./src/controllers/follow";
import router from "./src/routes";
import path from "path";

dotenv.config();
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use(router);

app.get("/", async (req, res) => {
   const listUser = await db.user.findMany();
   const singleUser = await db.user.findFirst({
      where: {
         id: 1,
      },
   });

   res.send({
      listUser,
      singleUser,
   });
});

app.post("/follow", follow);
app.get("/followers", getFollowers);

app.listen(PORT, async () => {
   await db.$connect();
   console.log(`server is running on port ${PORT}`);
});