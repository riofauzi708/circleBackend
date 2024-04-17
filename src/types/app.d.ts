export interface IRegister {
    username: string
    email: string
    fullname: string
    password: string
}

export type AuthMiddlewareData = {
    id: string;
}