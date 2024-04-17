import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthMiddlewareData } from "../types/app";

const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                status: "failed",
                message: "unauthorized",
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY!);

        if (!decode) {
            return res.status(401).send({
                status: "failed",
                message: "unauthorized",
            });
        }

        console.log(decode);

        res.locals.user = (decode as AuthMiddlewareData).id;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: error,
        });
    }
}

export default authentication