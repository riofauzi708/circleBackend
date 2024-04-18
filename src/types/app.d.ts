export interface IRegister {
    username: string
    email: string
    fullname: string
    password: string
}

export type AuthMiddlewareData = {
    id: string;
}

export interface IProfile {
    bio?: string
    avatar?: string
    cover?: string
    userId?: number
}