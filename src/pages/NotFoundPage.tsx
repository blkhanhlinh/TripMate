import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import onboading1 from "../assets/onboarding1.svg"
import "../theme/styles.css"

const NotFoundPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding not-found">
                <img src={onboading1}/>
                <h1>Page not found</h1>
            </IonContent>
        </IonPage>
    );
}

export default NotFoundPage