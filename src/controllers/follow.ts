import db from "../db";
import { Request, Response } from "express";

export const follow = async (req: Request, res: Response) => {
    try {
        const { followerId, followingId } = req.body

        const follow = await db.follow.create({
            data: {
                followerId,
                followingId
            }
        });

        console.log(follow);

        res.send({
            status: 'success',
            data: follow
        })   
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: error
        });
    }
}

export const getFollower = async (req: Request, res: Response) => {
    try {
        const { followingId } = req.params;

        const follower = await db.follow.findMany({
            where: {
                followingId: +followingId,
            }
        });

        res.send({
            status: 'success',
            data: follower
        })

    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: error
        });
    }
}

export const unfollow = async (req: Request, res: Response) => {
    try {
        const { followerId } = req.body

        const unfollow = await db.follow.deleteMany({
            where: {
                followerId: +followerId,
            }
        });

        console.log(unfollow);

        res.send({
            status: 'success',
            data: unfollow
        })   
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: error
        });
    }
}