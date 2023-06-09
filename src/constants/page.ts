export const PAGE = {
    PROVIDER: '/provider',
    ONBOARDING: '/onboarding',
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    MY: {
        ROOT: '/my',
        PROFILE: {
            ROOT: '/my/profile',
            FAVORITES: '/my/profile/favorites',
            SETTINGS: '/my/profile/settings',
        },
        DISCOVERY: {
            ROOT: '/my/discovery',
            DETAIL: '/my/discovery/:id',
            FOR_YOU: '/my/discovery/for-you',
            HOT_PLACES: '/my/discovery/hot-places',
            FEATURED_EXPERIENCE: '/my/discovery/featured-experience',
        },
        TRIPS: {
            ROOT: '/my/trips',
            INFO: {
                ROOT: '/my/trips/:id',
                DETAILS: '/my/trips/:id/details',
            },
            ADD: '/my/trips/add/:place_id',
        },
        NOTIFICATIONS: {
            ROOT: '/my/notifications',
        },
    },
}
