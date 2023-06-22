import React, { useState } from 'react';
import {
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonPage,
    IonToolbar,
    IonButton,
    useIonRouter,
} from '@ionic/react';
import { arrowBackOutline, calendarOutline } from 'ionicons/icons';
import "../theme/styles.css"

const AddTrip: React.FC = () => {
    const router = useIonRouter()
    const [showModal, setShowModal] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState<string>('');
    const [selectedEndDate, setSelectedEndDate] = useState<string>('');
    const [destination, setDestination] = useState('');
    const [budget, setBudget] = useState('');
    const [tripName, setTripName] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleDateChange = (event: CustomEvent<any>) => {
        setSelectedStartDate(event.detail.value as string);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (
            destination.trim() === '' ||
            selectedStartDate === '' ||
            selectedEndDate === '' ||
            budget.trim() === '' ||
            tripName.trim() === ''
        ) {
            return;
        }
        console.log('Form submitted');
    };

    return (
        <IonPage className="container">
            <div className="subheading">
                <IonButtons slot="start">
                    <IonIcon icon={arrowBackOutline} size="large" onClick={() => router.push('/my/trips')}/>
                </IonButtons>
                <h1>Trip information</h1>
            </div>
            <IonContent>
                <form className="custom-form" onSubmit={handleSubmit}>
                    <div className="flex">
                        <h4>Destination</h4>
                        <IonInput
                            placeholder="Enter destination"
                            fill="outline"
                            value={destination}
                            onIonChange={(e) => setDestination(e.detail.value!)}
                        />
                    </div>
                    <div className="flex">
                        <h4>Start date</h4>
                        <IonInput
                            placeholder="Enter start date"
                            fill="outline"
                            value={selectedStartDate}
                            readonly
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                    <div className="flex">
                        <h4>End date</h4>
                        <IonInput
                            placeholder="Enter end date"
                            fill="outline"
                            value={selectedEndDate}
                            readonly
                            onClick={() => setShowModal(true)}
                        />
                    </div>
                    <div className="flex">
                        <h4>Budget (VND)</h4>
                        <IonInput
                            placeholder="Enter your budget (VND)"
                            fill="outline"
                            value={budget}
                            onIonChange={(e) => setBudget(e.detail.value!)}
                        />
                    </div>
                    <div className="flex">
                        <h4>Trip name</h4>
                        <IonInput
                            placeholder="Enter your trip name"
                            fill="outline"
                            value={tripName}
                            onIonChange={(e) => setTripName(e.detail.value!)}
                        />
                    </div>
                    <button type="submit" disabled={formSubmitted}>
                        Start my trip
                    </button>
                </form>
                <IonModal className='modal' initialBreakpoint={0.5} breakpoints={[0, 0.5]} isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonContent>
                        <IonDatetime
                            placeholder="Select date"
                            onIonChange={handleDateChange}
                        ></IonDatetime>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default AddTrip;