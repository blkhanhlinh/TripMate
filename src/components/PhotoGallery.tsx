import { IonCard, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonRow, useIonAlert } from "@ionic/react";
import { Photo } from "../model/Photo";
import React from "react";
import { trash } from "ionicons/icons";

type Props = {
    photos: Photo[];
    deletePhoto: (fileName: string) => void;
}

const PhotoGallery: React.FC<Props> = ({ photos, deletePhoto }) => {
    const [displayAlert] = useIonAlert();
    const confirmDelete = (fileName: string) => {
        displayAlert({
            message: 'Are you sure you wanna delete this photo?',
            buttons: [
                {text: 'Cancel', role: 'cancel'},
                {text: 'OK', role: 'confirm'}
            ],
            onDidDismiss: (e) => {
                if(e.detail.role === 'cancel') return;
                deletePhoto(fileName);
            }
        })
    }
    return (
        <IonGrid>
            <IonRow>
                {photos.map((photo, idx) => (
                    <IonCol size="6" key={idx}>
                            <IonFab vertical="bottom" horizontal="center">
                                <IonFabButton
                                    onClick={() => confirmDelete(photo.filePath)}
                                    size="small"
                                >
                                    <IonIcon icon={trash} />
                                </IonFabButton>
                            </IonFab>
                            <img src={photo.webviewPath} className="memories-pic"/>
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    )
}

export default PhotoGallery;