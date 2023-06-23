import React from 'react';
import { IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react';
import "../theme/styles.css"
import Heading from '../components/Heading';
import { addOutline } from 'ionicons/icons';

const Trips: React.FC = () => {
  return (
    <IonPage className="container">
      <Heading header="My Trips" />
      <IonContent>
        <div className='ongoing-trip'>
          <h2>Ongoing trip</h2>
        </div>
        <div className='past-trips'>
          <h2>Past trips</h2>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Trips;
