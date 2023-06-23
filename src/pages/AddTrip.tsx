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
import { arrowBackOutline } from 'ionicons/icons';
import '../theme/styles.css';
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import TripInfo from './TripInfo';
interface TripInfo {
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    tripName: string;
}

const AddTrip: React.FC = () => {
    const history = useHistory();
    const router = useIonRouter();
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [destination, setDestination] = useState('');
    const [budget, setBudget] = useState('');
    const [tripName, setTripName] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [tripInfo, setTripInfo] = useState<TripInfo | null>(null);

    const handleStartDateChange = (e: CustomEvent) => {
        setStartDate(moment(e.detail.value, 'DD/MM/YYYY'));
    };

    const handleEndDateChange = (e: CustomEvent) => {
        setEndDate(moment(e.detail.value, 'DD/MM/YYYY'));
    };

    const formattedStartDate = startDate ? startDate.format('DD/MM/YYYY') : '';
    const formattedEndDate = endDate ? endDate.format('DD/MM/YYYY') : '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        history.push("/my/trips/:id")

        if (
            destination.trim() === '' ||
            startDate === null ||
            endDate === null ||
            budget.trim() === '' ||
            tripName.trim() === ''
        ) {
            return;
        }

        const newTripInfo: TripInfo = {
            destination,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            budget,
            tripName,
        }
        setTripInfo(newTripInfo);

        console.log('Form submitted');
    };


    return (
        <IonPage className="container">
            <div className="subheading">
                <IonButtons slot="start">
                    <IonIcon
                        icon={arrowBackOutline}
                        size="large"
                        onClick={() => router.push('/my/trips')}
                    />
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
                            fill='outline'
                            placeholder="DD/MM/YYYY"
                            value={formattedStartDate}
                            onIonChange={handleStartDateChange}>
                        </IonInput>
                    </div>
                    <div className="flex">
                        <h4>End date</h4>
                        <IonInput
                            fill='outline'
                            placeholder="DD/MM/YYYY"
                            value={formattedEndDate}
                            onIonChange={handleEndDateChange}>
                        </IonInput>
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
                    <button type="submit" onClick={handleSubmit} className='custom-button'>
                        Start my trip
                    </button>
                    {formSubmitted && tripInfo && (
                        <TripInfo {...tripInfo} />
                    )}
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddTrip;