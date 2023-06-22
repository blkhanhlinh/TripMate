import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="loading-content">
        <div className="loading-container">
          <IonSpinner name="crescent" color="primary" />
          <p className="loading-text">Loading...</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Loading;