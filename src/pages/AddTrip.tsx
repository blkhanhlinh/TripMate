import { IonButtons, IonContent, IonIcon, IonInput, IonPage, useIonRouter } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { PAGE } from '../constants/page'
import useNavigate from '../hooks/useNavigate'
import { Trip } from '../model/Trip'
import { selectPlace } from '../store/features/place/selector'
import { selectUser } from '../store/features/user/selector'
import { useAppSelector } from '../store/hook'
import '../theme/styles.css'
import moment from 'moment'
import { toDot } from '../utils/converter'

const AddTrip: React.FC = () => {
    useNavigate({
        currentPage: PAGE.MY.TRIPS.ADD,
        pageToNavigate: PAGE.MY.TRIPS.ADD,
    })
    const history = useHistory()
    const router = useIonRouter()
    const { user } = useAppSelector(selectUser)
    const { places } = useAppSelector(selectPlace)
    const [form, setForm] = useState<Trip>({
        destination: '',
        start_at: new Date(),
        end_at: new Date(),
        budget: 100000,
        name: '',
        user_id: user?._id,
        image: '',
        place_id: '',
    })

    const onInputChange = (e: any) => {
        if (e.target.name === 'start_at' || e.target.name === 'end_at') {
            setForm((prev) => ({
                ...prev,
                [e.target.name]: moment(e.target.value, 'DD/MM/YYYY').toDate(),
            }))
        } else {
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    const handleSubmit = async () => {
        //
        console.log({ form })
    }
    return (
        <IonPage className="container">
            <div className="subheading">
                <IonButtons slot="start">
                    <IonIcon icon={arrowBackOutline} size="large" onClick={() => router.goBack()} />
                </IonButtons>
                <h1>Trip information</h1>
            </div>
            <IonContent>
                <div className="custom-form">
                    <div className="flex">
                        <h4>Destination</h4>
                        <IonInput
                            placeholder="Enter destination"
                            fill="outline"
                            value={form.destination}
                            name="destination"
                            onIonChange={onInputChange}
                        />
                    </div>
                    <div className="flex">
                        <h4>Start date</h4>
                        <IonInput
                            fill="outline"
                            placeholder="DD/MM/YYYY"
                            name="start_at"
                            value={moment(form.start_at, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                            onIonChange={onInputChange}
                        ></IonInput>
                    </div>
                    <div className="flex">
                        <h4>End date</h4>
                        <IonInput
                            fill="outline"
                            placeholder="DD/MM/YYYY"
                            name="end_at"
                            value={moment(form.end_at, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                            onIonChange={onInputChange}
                        ></IonInput>
                    </div>
                    <div className="flex">
                        <h4>Budget (VND)</h4>
                        <IonInput
                            placeholder="Enter your budget (VND)"
                            fill="outline"
                            name="budget"
                            value={toDot(form.budget)}
                            onIonChange={onInputChange}
                        />
                    </div>
                    <div className="flex">
                        <h4>Trip name</h4>
                        <IonInput
                            placeholder="Enter your trip name"
                            fill="outline"
                            value={form.name}
                            name="name"
                            onIonChange={onInputChange}
                        />
                    </div>
                    <button onClick={handleSubmit} className="custom-button">
                        Start my trip
                    </button>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default AddTrip
