/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    createBudgetExpense,
    deleteBudgetExpense,
    getBudgetExpenseByTripId,
} from '../../reducers/budget-expense'
import { BudgetExpense } from '../../../model/BudgetExpense'

const getBudgetExpenseByTripIdThunk = createAsyncThunk(
    'budgetExpense/getBudgetExpenseByTripId',
    async (tripId: string) => {
        try {
            const res = await getBudgetExpenseByTripId(tripId)
            return res
        } catch (err) {
            throw err
        }
    }
)

const createBudgetExpenseThunk = createAsyncThunk(
    'budgetExpense/createBudgetExpense',
    async (budgetExpense: BudgetExpense) => {
        try {
            const res = await createBudgetExpense(budgetExpense)
            return res
        } catch (err) {
            throw err
        }
    }
)

const deleteBudgetExpenseThunk = createAsyncThunk(
    'budgetExpense/deleteBudgetExpense',
    async (budgetExpenseId: string) => {
        try {
            const res = await deleteBudgetExpense(budgetExpenseId)
            return res
        } catch (err) {
            throw err
        }
    }
)

export { getBudgetExpenseByTripIdThunk, createBudgetExpenseThunk, deleteBudgetExpenseThunk }
