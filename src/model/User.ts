export interface User {
    _id?: string
    username: string
    password?: string
    image?: string
    fullName?: string
}

export enum AuthState {
    AUTHORIZED = 'AUTHORIZED',
    UNAUTHORIZED = 'UNAUTHORIZED',
}
