import Joi from "joi";
import { IRegister } from "../../types/app";

export const registerSchema = Joi.object<IRegister>({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
})