import React, { useState } from "react";
import { IonIcon, IonInput } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { BudgetExpense } from "../model/BudgetExpense";
import "../theme/styles.css"

type NewExpenseProps = {
    onSubmit: (expense: BudgetExpense) => void;
    onCancel: () => void;
};

const NewExpenseForm: React.FC<NewExpenseProps> = ({ onSubmit, onCancel }) => {
    const [name, setName] = useState("")
    const [expense, setExpense] = useState(0);

    const handleSubmit = () => {
        const newExpense: BudgetExpense = {
            name: name,
            expense: expense,
            trip_id: ""
        };
        onSubmit(newExpense);
    };

    const handleOnClick = () => {
        onCancel();
    };

    return (
        <div className="container">
            <div className='subheading'>
                <IonIcon icon={closeOutline} size='large' onClick={handleOnClick}/>
                <h1>Expense details</h1>
            </div>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="group">
                    <h4>Name</h4>
                    <IonInput fill="outline" value={name} onIonChange={(e) => setName(e.detail.value!)} />
                </div>

                <div className="group">                    
                    <h4>Expense (VND)</h4>
                    <IonInput fill="outline" type="number" value={expense} onIonChange={() => setExpense(expense)}/>
                </div>

                <div className="button-group">
                    <button type="submit" className="custom-button">Add expense</button>
                    <button onClick={onCancel} className="custom-outline-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default NewExpenseForm;