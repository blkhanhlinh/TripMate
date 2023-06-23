import React from 'react'
import { IonContent, IonPage, useIonRouter } from '@ionic/react'
import useNavigate from '../hooks/useNavigate'
import { PAGE } from '../constants/page'

const TripDetails: React.FC = () => {
    useNavigate({
        currentPage: PAGE.MY.TRIPS.INFO.DETAILS,
        pageToNavigate: PAGE.MY.TRIPS.INFO.DETAILS,
    })
    const router = useIonRouter()
    console.log(router.routeInfo)
    return (
        <>
            <IonPage>
                <IonContent>
                    <h1>Trip Details</h1>
                </IonContent>
            </IonPage>
        </>
    )
}

export default TripDetails
