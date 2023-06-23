import { IonContent, IonIcon, IonPage } from "@ionic/react"
import { arrowBackOutline } from "ionicons/icons"
import React from "react"
import { useHistory } from "react-router"
import "../theme/styles.css"
import Searchbar from "../components/Searchbar"
import Phuket from "../assets/phuket.png"

const Favorites: React.FC = () => {
    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    }

    return (
        <IonPage className="container">
            <IonContent>
                <div className='subheading'>
                    <IonIcon icon={arrowBackOutline} size='large' onClick={handleBack}/>
                    <h1>Favorite places</h1>
                </div>
                <Searchbar />
                <div className="places margin-top">
                    <div className="place">
                        <img src={Phuket} alt="place" />
                        <div className="place-info">
                            <h2>Place name</h2>
                            <p>Discover new places and find new adventures.</p>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Favorites