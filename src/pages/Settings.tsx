import { IonContent, IonIcon, IonPage } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons";
import React from "react"
import { useHistory } from "react-router"
import "../theme/styles.css"
import Onworking from "../assets/onworking.png"

const Settings: React.FC = () => {
    const history = useHistory();
    const handleBack = () => {
        history.goBack();
    }
    return (
        <IonPage className="container">
            <IonContent>
                <div className="subheading">
                    <IonIcon icon={arrowBackOutline} size='large' onClick={handleBack} />
                    <h1>Settings</h1>
                </div>
                <div className="margin-top align-center">
                    <img src={Onworking} alt="onworking" />
                    <h3>This feature is under construction</h3>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings