import React, { useState } from 'react'
import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import DaysPlan from './DaysPlan'
import Expense from './Expense'
import { BudgetExpense } from '../model/BudgetExpense'
import { useParams } from 'react-router'
import useNavigate from '../hooks/useNavigate'
import { PAGE } from '../constants/page'

const TripDetails: React.FC = () => {
    useNavigate({
        currentPage: PAGE.MY.TRIPS.INFO.DETAILS,
        pageToNavigate: PAGE.MY.TRIPS.INFO.DETAILS,
    })
    const { id } = useParams<{
        id: string
    }>()
    const [isDayPlanTab, setIsDayPlanTab] = useState(true)

    const handleDaysPlan = () => {
        setIsDayPlanTab(true)
    }

    const handleExpense = () => {
        setIsDayPlanTab(false)
    }

    const router = useIonRouter()

    return (
        <>
            <IonPage className="container">
                <IonContent>
                    <div className="subheading" onClick={() => router.goBack()}>
                        <IonIcon icon={arrowBackOutline} size="large" />
                        <h1>Trip details plan</h1>
                    </div>
                    <div className="navigation">
                        <button
                            onClick={handleDaysPlan}
                            className={`nav-button ${isDayPlanTab ? 'active' : ''}`}
                        >
                            Days plan
                        </button>
                        <button
                            onClick={handleExpense}
                            className={`nav-button ${!isDayPlanTab ? 'active' : ''}`}
                        >
                            Budget & Expense
                        </button>
                    </div>
                    {isDayPlanTab && <DaysPlan tripId={id} dayIndex={1} />}
                    {!isDayPlanTab && <Expense tripId={id} />}
                </IonContent>
            </IonPage>
        </>
    )
}

export default TripDetails
