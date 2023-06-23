import { IonCol, IonGrid, IonIcon, IonModal, IonRow, useIonAlert } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { BudgetExpense } from '../model/BudgetExpense'
import { addOutline, trashOutline } from 'ionicons/icons'
import NewExpenseForm from '../components/NewExpenseForm'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { selectBudgetExpenses } from '../store/features/budget-expense/selector'
import {
    deleteBudgetExpenseThunk,
    getBudgetExpenseByTripIdThunk,
} from '../store/features/budget-expense/thunk'
import { selectTrips } from '../store/features/trip/selector'
import { toDot } from '../utils/converter'

type Props = {
    tripId: string
}

const Expense: React.FC<Props> = ({ tripId }) => {
    const [showModal, setShowModal] = useState(false)
    // const [expenses, setExpenses] = useState<BudgetExpense[]>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getBudgetExpenseByTripIdThunk(tripId))
    }, [tripId])
    const { status, budgetExpenses: expenses } = useAppSelector(selectBudgetExpenses)
    const { trips } = useAppSelector(selectTrips)
    const trip = trips && trips.find((trip) => trip._id === tripId)

    const handleAddExpense = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const budget = trip?.budget || 0
    const totalExpenses = expenses ? expenses.reduce((acc, expense) => acc + expense.expense, 0) : 0
    const remainingBudget = budget - totalExpenses

    const [present] = useIonAlert()
    const handleDeleteExpense = async (id: string) => {
        present({
            header: 'Delete expense',
            message: 'Are you sure you want to delete this expense?',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    handler: async () => {
                        await dispatch(deleteBudgetExpenseThunk(id))
                    },
                },
            ],
        })
    }

    return (
        <div>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <h4
                            style={{
                                fontWeight: 800,
                            }}
                        >
                            Name
                        </h4>
                    </IonCol>
                    <IonCol>
                        <h4
                            style={{
                                textAlign: 'right',
                                fontWeight: 800,
                                
                            }}
                        >
                            Expense
                        </h4>
                    </IonCol>
                </IonRow>
                {expenses &&
                    (expenses.length > 0 ? (
                        expenses.map((expense, index) => (
                            <IonRow key={index}>
                                <IonCol className="align-left">
                                    <h4>{expense.name}</h4>
                                </IonCol>
                                <IonCol className="align-right">
                                    <h4
                                        style={{
                                            display: 'flex',
                                            gap: '8px',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        {toDot(expense.expense)}
                                        <IonIcon
                                            icon={trashOutline}
                                            color="danger"
                                            onClick={() =>
                                                handleDeleteExpense(expense._id as string)
                                            }
                                        />
                                    </h4>
                                </IonCol>
                            </IonRow>
                        ))
                    ) : (
                        <p
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Nothing to see
                        </p>
                    ))}
            </IonGrid>
            <button onClick={handleAddExpense} className="add-button">
                <IonIcon icon={addOutline} className="custom-icon" />
                <p>Add new expense row</p>
            </button>
            <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
                <NewExpenseForm onClose={handleCloseModal} tripId={tripId} />
            </IonModal>
            <div className="cal">
                <h4>
                    Total <span className="non-highlight">{toDot(totalExpenses)}</span>
                </h4>
                <h4>
                    Budget <span className="non-highlight">{toDot(budget)}</span>
                </h4>
                <h4>
                    Remaining budget <span className="highlight">{toDot(remainingBudget)}</span>
                </h4>
            </div>
        </div>
    )
}

export default Expense
