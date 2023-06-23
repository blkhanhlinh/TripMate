/* eslint-disable no-useless-catch */
import apiInstance from '../../api'
import { API } from '../../constants/api'
import { BudgetExpense } from '../../model/BudgetExpense'

const getBudgetExpenseByTripId = async (tripId: string) => {
    try {
        const res = await apiInstance.get(API.ENDPOINTS.BUDGET_EXPENSE.INDEX, {
            params: {
                trip_id: tripId,
            },
        })
        return res.data
    } catch (err) {
        throw err
    }
}

const createBudgetExpense = async (budgetExpense: BudgetExpense) => {
    try {
        const res = await apiInstance.post(API.ENDPOINTS.BUDGET_EXPENSE.INDEX, budgetExpense)
        return res.data
    } catch (err) {
        throw err
    }
}

const deleteBudgetExpense = async (budgetExpenseId: string) => {
    try {
        const res = await apiInstance.delete(
            `${API.ENDPOINTS.BUDGET_EXPENSE.INDEX}/${budgetExpenseId}`
        )
        return res.data
    } catch (err) {
        throw err
    }
}

export { getBudgetExpenseByTripId, createBudgetExpense, deleteBudgetExpense }
