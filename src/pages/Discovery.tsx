import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Discovery.css';
import Searchbar from '../components/Searchbar';

const Discovery: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discovery</IonTitle>
        </IonToolbar>
        <Searchbar/>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Discovery</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Discovery page" />
      </IonContent>
    </IonPage>
  );
};

export default Discovery;
