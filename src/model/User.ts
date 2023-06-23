export interface User {
    _id?: string
    username: string
    password?: string
    image?: string
    full_name?: string
}

export enum AuthState {
    AUTHORIZED = 'AUTHORIZED',
    UNAUTHORIZED = 'UNAUTHORIZED',
}
