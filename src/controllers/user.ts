import { Request, Response } from "express";
import * as userService from "../services/user";


export const Register = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        const result = await userService.Register(body);
        res.send({
            status: "success",
            data: result,
        });
    } catch (error) {
        const err = error as unknown as Error;

        console.log(err);

        if (err.message === "username or email already exist") {
            return res.status(400).send({
                status: "failed",
                message: err.message,
            });
        }

        res.status(500).send({
            status: "failed",
            message: err.message,
        });
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        const token = await userService.Login(username, password);

        res.send({
            status: "success",
            data: token,
        });
    } catch (error) {
        const err = error as unknown as Error;

        res.status(500).send({
            status: "failed",
            message: err.message,
        });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();

        res.send({
            status: "success",
            data: users
        })
        
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).send({
            status: "failed",
            message: err.message
        })
    }
}