import { Request, Response } from "express";
import * as profileService from "../services/profile";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const  userId  = res.locals.user;
        const {body} = req;
        const files = req.files as {[fieldname: string]: Express.Multer.File[]};
        const cover = files.cover[0].filename;
        const avatar = files.avatar[0].filename;

        if (cover) {
            body.cover = cover;
        }
        if (avatar) {
            body.avatar = avatar;
        }

        await profileService.updateProfile(userId, body);

        res.send({
            status: "success",
            data: body
        });
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error
        });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const  userId  = res.locals.user;
        const profile = await profileService.getProfile(userId);
        
        res.send({
            status: "success",
            data: profile
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            status: "failed",
            message: error
        });
    }
}

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const { id: Id } = req.params

        const profile = await profileService.getProfile(+Id);
        
        res.send({
            status: "success",
            data: profile
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            status: "failed",
            message: error
        });
    }
}