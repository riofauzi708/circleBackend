import { Request, Response } from "express";
import * as threadService from "../services/thread";

export const getThreads = async (req: Request, res: Response) =>{ 
    try {
        const threads = await threadService.getThreads();
        res.send({
            status: "success",
            data: threads
        });
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).send({
            status: "failed",
            message: err.message
        });
    }
}


export const getThread = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const thread = await threadService.getThread(+id);
        res.send({
            status: "success",
            data: thread
        });
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).send({
            status: "failed",
            message: err.message
        });
    }
}

export const createThread = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        body.userId  = res.locals.user;
        const thread = await threadService.createThread(
            body, 
            req.files as {[fieldname: string]: Express.Multer.File[]});
        res.send({
            status: "success",
            data: thread
        });
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).send({
            status: "failed",
            message: err.message
        });
    }
}