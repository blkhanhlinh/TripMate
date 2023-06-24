import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import PlaceCard from '../components/PlaceCard';
import { Place } from '../model/Place';

interface SearchResultsProps {
  places: Place[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ places }) => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <div>
          {places.length > 0 ? (
            places.map((place) => (
              <div key={place._id}>
                <PlaceCard place={place} />
              </div>
            ))
          ) : (
            <p>No matching results</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchResults;