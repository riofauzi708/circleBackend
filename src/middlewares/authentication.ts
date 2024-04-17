import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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

        res.locals.user = decode;

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