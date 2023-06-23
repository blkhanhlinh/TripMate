import React, { useState } from 'react'
import { IonIcon, IonInput } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import { BudgetExpense } from '../model/BudgetExpense'
import '../theme/styles.css'
import { useAppDispatch } from '../store/hook'
import { createBudgetExpenseThunk } from '../store/features/budget-expense/thunk'

type NewExpenseProps = {
    onClose: () => void
    tripId: string
}

const NewExpenseForm: React.FC<NewExpenseProps> = ({ tripId, onClose }) => {
    const [form, setForm] = useState<BudgetExpense>({
        expense: 0,
        name: '',
        trip_id: tripId,
    })

    const onInputChange = (e: any) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const dispatch = useAppDispatch()
    const handleOnClickAddExpense = async () => {
        const res = await dispatch(createBudgetExpenseThunk(form))
        if (res.payload) {
            onClose()
        }
    }

    return (
        <div className="container">
            <div className="subheading">
                <IonIcon icon={closeOutline} size="large" onClick={onClose} />
                <h1>Expense details</h1>
            </div>
            <div className="form-container">
                <div className="group">
                    <h4>Name</h4>
                    <IonInput
                        fill="outline"
                        value={form.name}
                        name="name"
                        onIonChange={onInputChange}
                    />
                </div>

                <div className="group">
                    <h4>Expense (VND)</h4>
                    <IonInput
                        fill="outline"
                        type="number"
                        name="expense"
                        value={form.expense}
                        onIonChange={onInputChange}
                    />
                </div>

                <div className="button-group">
                    <button onClick={handleOnClickAddExpense} className="custom-button">
                        Add expense
                    </button>
                    <button onClick={onClose} className="custom-outline-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewExpenseForm
