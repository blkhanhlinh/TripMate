/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { State } from '../../../constants/api'
import { BudgetExpense } from '../../../model/BudgetExpense'
import {
    createBudgetExpenseThunk,
    deleteBudgetExpenseThunk,
    getBudgetExpenseByTripIdThunk,
} from './thunk'

interface IBudgetExpenseSlice {
    budgetExpenses?: BudgetExpense[]
    status: State
}

const initialState: IBudgetExpenseSlice = {
    status: State.IDLE,
}

export const budgetExpenseSlice = createSlice({
    name: 'budgetExpense',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBudgetExpenseByTripIdThunk.pending, (state) => {
                state.status = State.LOADING
            })
            .addCase(getBudgetExpenseByTripIdThunk.fulfilled, (state, action) => {
                state.budgetExpenses = action.payload.budgetExpenses
                state.status = State.IDLE
            })
            .addCase(getBudgetExpenseByTripIdThunk.rejected, (state) => {
                state.status = State.IDLE
            })
        builder
            .addCase(createBudgetExpenseThunk.pending, (state) => {})
            .addCase(createBudgetExpenseThunk.fulfilled, (state, action) => {
                state.budgetExpenses?.push(action.payload.newBudgetExpense)
            })
            .addCase(createBudgetExpenseThunk.rejected, (state) => {})
        builder
            .addCase(deleteBudgetExpenseThunk.pending, (state) => {})
            .addCase(deleteBudgetExpenseThunk.fulfilled, (state, action) => {
                state.budgetExpenses = state.budgetExpenses?.filter(
                    (budgetExpense) => budgetExpense._id !== action.payload.deletedId
                )
            })
            .addCase(deleteBudgetExpenseThunk.rejected, (state) => {})
    },
})

export {}
