import express from 'express';
import * as dotenv from 'dotenv';
import db from "./src/db"
import { follow, getFollower, unfollow } from "./src/controllers/follow"
import router from "./src/routes"

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get('/', async (req, res) => {

    const ListUser = await db.user.findMany()
    const SingelUser = await db.user.findFirst({
        where: {
            id: 1,
        }
    })

    res.send({ListUser, SingelUser})
});

app.post('/follow', follow)
app.get('/follower/:followingId', getFollower)
app.delete('/unfollow', unfollow)

app.listen(PORT, async () => {
    await db.$connect();
    console.log(`Server is running on port ${process.env.PORT}`);
});