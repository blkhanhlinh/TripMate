import React from "react";
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import "../theme/styles.css"
import { addOutline, arrowBackOutline, flameOutline, golfOutline, headsetOutline, heartOutline, locationOutline } from "ionicons/icons";

const data = {
    "_id": "64941b3a119b071b37ff4814",
    "name": "Hoi An",
    "address": "Viet Nam",
    "image": "https://vcdn1-dulich.vnecdn.net/2022/06/01/Hoi-An-VnExpress-5851-16488048-4863-2250-1654057244.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=Z2ea_f0O7kgGZllKmJF92g",
    "description": "Located on the north bank of the lower Thu Bon River, Hoi An is an ancient town in Quang Nam, more than 30 km from Da Nang city, 122 km from Hue. Referring to Hoi An, it is necessary to mention the rows of ancient saffron-colored houses, the sparkling river with lanterns at night, or delicious dishes at affordable prices.",
    "type": "Hot places"
}

const PlaceDetails: React.FC = () => {
    const router = useIonRouter()
    const handleOnclick = () => {
        router.push('/my/trips/add')
    }
    return (
        <>
            <IonPage>
                <IonContent>
                    <div className="place-container">
                        <div className="header-back">
                            <IonIcon icon={arrowBackOutline} size="large" />
                            <IonIcon icon={heartOutline} size="large" />
                        </div>
                        <div>
                            <img src={data.image} className="custom-pic" />
                        </div>
                        <div className="place-content">
                            <h1>{data.name}</h1>
                            <div className="address">
                                <IonIcon icon={locationOutline} />
                                <h4>{data.address}</h4>
                            </div>
                            <p>{data.description}</p>
                            <h3>Tags</h3>
                            <div className="tags">
                                <IonIcon icon={flameOutline} />
                                <p>{data.type}</p>
                            </div>
                        </div>
                        <button className='custom-button margin-top' onClick={handleOnclick}>
                            <IonIcon icon={addOutline} size='large' /><span>Create new trip</span>
                        </button>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PlaceDetails;