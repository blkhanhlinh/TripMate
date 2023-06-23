import React from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import Phuket from "../assets/phuket.png"
import moment from 'moment';
import { cameraOutline, mapOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import PhotoGallery from '../components/PhotoGallery';

interface TripInfoProps {
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    tripName: string;
}

const TripInfor: React.FC<TripInfoProps> = ({ destination, startDate, endDate, budget, tripName }) => {
    const formattedStartDate = moment(startDate, 'DD/MM/YYYY').format('ddd, MMM D');
    const formattedEndDate = moment(endDate, 'DD/MM/YYYY').format('ddd, MMM D YYYY');
    const displayDate = startDate && endDate ? `${formattedStartDate} - ${formattedEndDate}` : ''

    const { photos, takePhoto, deletePhoto } = usePhotoGallery();

    const history = useHistory()

    const handleOnclick = () => {
        history.push('/my/discovery')
    }

    const handlePlanOnclick = () => {
        history.push('/my/trips/:id')
    }

    return (
        <>
            <IonPage>
                <IonContent>
                    <img src={Phuket}></img>
                    <div className='trip-info'>
                        <h1 className='trip-name'><strong>{tripName}</strong></h1>
                        <div className='flex-row'>
                            <IonIcon icon={mapOutline} className='custom-icon' />
                            <h3 className='trip-destination'>{destination}</h3>
                        </div>
                        <h3 className='trip-date'>{displayDate}</h3>
                        <h3 className='trip-budget'>My budget: {budget} VND</h3>
                        <button className='custom-outline-button' onClick={handleOnclick}>Discovery</button>
                        <button className='custom-button' onClick={handlePlanOnclick}>Trip details plan</button>
                    </div>
                    <div className='memories'>
                        <h2 className='memories-title'>Memories</h2>
                        <div className='memories-container'>
                            <div className='add-pic' onClick={takePhoto}>
                                <IonIcon icon={cameraOutline} size='large' />
                            </div>
                        </div>
                        <PhotoGallery photos={photos} deletePhoto={deletePhoto} />
                    </div>
                </IonContent>
            </IonPage>
        </>
    );
};

export default TripInfor;