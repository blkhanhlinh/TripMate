import { IonIcon, IonModal } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Attraction } from "../model/Attraction";
import '../theme/styles.css'
import NewAttraction from "./NewAttraction";

type Props = {
    date: string;
    onAddAttraction: (attraction: Attraction) => void
};

const DayPlan: React.FC<Props> = ({ date, onAddAttraction }) => {
    const [showModal, setShowModal] = useState(false);
    const [attractions, setAttractions] = useState<Attraction[]>([]);

    const handleAddAttraction = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAttractionSubmitted = (attraction: Attraction) => {
        onAddAttraction(attraction);
        setShowModal(false);
        setAttractions((prevAttractions) => [...prevAttractions, attraction])
    };

    return (
        <div className="day-screen">
            <button onClick={handleAddAttraction} className="add-button">
                <IonIcon icon={addOutline} className="custom-icon" />
                <p>Add new attraction</p>
            </button>

            <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
                <NewAttraction onSubmit={handleAttractionSubmitted} onCancel={handleCloseModal} />
            </IonModal>

            <div className="day-plan">
                <div className="attractions">
                    {attractions.map((attraction) => (
                        <div key={attraction._id} className="attraction">
                            <p>{attraction.time.toLocaleString()}</p>
                            <h3>{attraction.locationName}</h3>
                            <p>{attraction.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayPlan;
