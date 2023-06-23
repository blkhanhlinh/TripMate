import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import useNavigate from '../hooks/useNavigate'
import { PAGE } from '../constants/page'

const Profile: React.FC = () => {
    useNavigate({
        currentPage: PAGE.MY.PROFILE.ROOT,
        pageToNavigate: PAGE.MY.PROFILE.ROOT,
    })
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <h1>Profile</h1>
            </IonContent>
        </IonPage>
    )
}

export default Profile
