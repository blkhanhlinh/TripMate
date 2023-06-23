export const API = {
    BASE: 'https://trip-mate.up.railway.app/api',
    // BASE: 'http://localhost:2003',
    ENDPOINTS: {
        IMAGE_UPLOAD: '/image-server/upload',
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
        TRIP: {
            USER: '/trip/user',
            INDEX: '/trip',
        },
        MEMORY: {
            INDEX: '/memory',
        },
        FAVORITE: {
            INDEX: '/favorite',
            USER: '/favorite/user',
        },
        DAY: {
            INDEX: '/day',
        },
        BUDGET_EXPENSE: {
            INDEX: '/budget-expense',
        },
        ATTRACTION: {
            INDEX: '/attraction',
        },
    },
}

export enum State {
    LOADING = 'LOADING',
    IDLE = 'IDLE',
}
