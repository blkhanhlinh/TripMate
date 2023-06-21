export const API = {
    BASE: 'https://trip-plan.up.railway.app/api',
    ENDPOINTS: {
        AUTH: {
            SIGNIN: '/user/signin',
            SIGNUP: '/user/signup',
        },
        USER: {
            CURRENT: '/user',
        },
        PLACE: {
            ALL: '/place',
        },
    },
}

export enum State {
    LOADING = 'LOADING',
    IDLE = 'IDLE',
}
