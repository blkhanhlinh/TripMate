import React, { useState } from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import DaysPlan from './DaysPlan';
import Expense from './Expense';
import { BudgetExpense } from '../model/BudgetExpense';

const TripDetails: React.FC = () => {
  const [dayPlan, setDayPlan] = useState(true)
  const [expense, setExpense] = useState(false)

  const [expenses, setExpenses] = useState<BudgetExpense[]>([])

  const handleAddExpense = (expense: BudgetExpense) => {
    setExpenses([...expenses, expense])
  };

  const handleDaysPlan = () => {
    setDayPlan(true)
    setExpense(false)
  }

  const handleExpense = () => {
    setExpense(true)
    setDayPlan(false)
  }
  return (
    <>
      <IonPage className='container'>
        <IonContent>
          <div className='subheading'>
            <IonIcon icon={arrowBackOutline} size='large'/>
            <h1>Trip details plan</h1>
          </div>
          <div className='navigation'>
            <button onClick={handleDaysPlan} className={`nav-button ${dayPlan? 'active' : ''}`}>Days plan</button>
            <button onClick={handleExpense} className={`nav-button ${expense? 'active' : ''}`}>Budget & Expense</button>
          </div>
          {dayPlan && <DaysPlan tripId="string" dayIndex={1}/>}
          {expense && <Expense onAddExpense={handleAddExpense}/>}
        </IonContent>
      </IonPage>
    </>
  );
};

export default TripDetails;