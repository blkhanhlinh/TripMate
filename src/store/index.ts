import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './features/user'
import { placeSlice } from './features/place'
import { tripSlice } from './features/trip'
import { memorySlice } from './features/memory'
import { favoritesSlice } from './features/favorites'
import { daySlice } from './features/day'
import { budgetExpenseSlice } from './features/budget-expense'
import { attractionSlice } from './features/attraction'

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        place: placeSlice.reducer,
        trip: tripSlice.reducer,
        memory: memorySlice.reducer,
        favorite: favoritesSlice.reducer,
        day: daySlice.reducer,
        budgetExpense: budgetExpenseSlice.reducer,
        attraction: attractionSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
