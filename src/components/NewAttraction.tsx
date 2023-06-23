import React, { useState } from "react";
import { Attraction } from "../model/Attraction";
import { IonIcon, IonInput } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
type NewAttractionProps = {
    onSubmit: (attraction: Attraction) => void;
    onCancel: () => void;
};

const NewAttraction: React.FC<NewAttractionProps> = ({ onSubmit, onCancel }) => {
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = () => {
        const newAttraction: Attraction = {
            locationName,
            address,
            time: new Date(time),
            day_id: ""
        };
        onSubmit(newAttraction);
    };

    const handleOnClick = () => {
        onCancel();
    };

    return (
        <div className="container">
            <div className='subheading'>
                <IonIcon icon={closeOutline} size='large' onClick={handleOnClick}/>
                <h1>Trip details plan</h1>
            </div>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="group">
                    <h4>Location Name</h4>
                    <IonInput fill="outline" value={locationName} onIonChange={(e) => setLocationName(e.detail.value!)} />
                </div>

                <div className="group">
                    <h4>Address</h4>
                    <IonInput fill="outline" value={address} onIonChange={(e) => setAddress(e.detail.value!)} />
                </div>

                <div className="group">                    
                    <h4>Time</h4>
                    <IonInput fill="outline" type="datetime-local" value={time} onIonChange={(e) => setTime(e.detail.value!)} />
                </div>

                <div className="button-group">
                    <button type="submit" className="custom-button">Add attraction</button>
                    <button onClick={onCancel} className="custom-outline-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default NewAttraction;