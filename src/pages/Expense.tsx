import { IonCol, IonGrid, IonIcon, IonModal, IonRow } from "@ionic/react";
import React, { useState } from "react";
import { BudgetExpense } from "../model/BudgetExpense";
import { addOutline } from "ionicons/icons";
import NewExpenseForm from "../components/NewExpenseForm";

type Props = {
    onAddExpense: (expense: BudgetExpense) => void
}

const Expense: React.FC<Props> = ({ onAddExpense }) => {
    const [showModal, setShowModal] = useState(false);
    const [expenses, setExpenses] = useState<BudgetExpense[]>([]);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    // how to get budget?
    const budget = 1000000;

    const handleAddExpense = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleExpenseSubmitted = (expense: BudgetExpense) => {
        onAddExpense(expense);
        setShowModal(false);
        setExpenses((prevExpenses) => [...prevExpenses, expense])
        setTotalExpenses((prevTotal) => prevTotal + expense.expense)
    };

    const remainingBudget = budget - totalExpenses;

    return (
        <div>
            <IonGrid >
                <IonRow>
                    <IonCol><h4>Name</h4></IonCol>
                    <IonCol><h4>Expense</h4></IonCol>
                </IonRow>
                {expenses.map((expense, index) => (
                    <>
                        <IonRow key={index}>
                            <IonCol className="align-left"><h4>{expense.name}</h4></IonCol>
                            <IonCol className="align-right"><h4>{expense.expense}</h4></IonCol>
                        </IonRow>
                    </>
                ))}
            </IonGrid>
            <button onClick={handleAddExpense} className="add-button margin-top">
                <IonIcon icon={addOutline} className="custom-icon" />
                <p>Add new expense row</p>
            </button>
            <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
                <NewExpenseForm onSubmit={handleExpenseSubmitted} onCancel={handleCloseModal} />
            </IonModal>
            <div className="cal">
                <h4>Total Expenses: <span className="highlight">{totalExpenses}</span></h4>
                <h4>Remaining Budget: <span className="highlight">{remainingBudget}</span></h4>
            </div>
        </div>
    );
}

export default Expense;