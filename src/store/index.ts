import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './features/user'
import { placeSlice } from './features/place'

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        place: placeSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
