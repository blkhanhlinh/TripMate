import { IonIcon } from '@ionic/react'
import { locationOutline } from 'ionicons/icons'
import React from 'react'
import { Place } from '../model/Place'

const PlaceCard = ({ place, titleStyle }: { place: Place; titleStyle?: React.CSSProperties }) => {
    return (
        <>
            <img
                src={place.image}
                alt={place.name}
                style={{
                    height: 140,
                    objectFit: 'cover',
                    width: '100%',
                    borderRadius: 10,
                }}
                loading="lazy"
            />
            <div>
                <h5
                    style={{
                        fontWeight: 'bold',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        width: 160,
                        padding: '4px 14px',
                        textAlign: 'left',
                        ...titleStyle,
                    }}
                >
                    {place.name}
                </h5>
                <div
                    style={{
                        fontWeight: 'bold',
                        color: 'blue',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        padding: '0 14px',
                    }}
                >
                    <IonIcon icon={locationOutline} />
                    <span>{place.address}</span>
                </div>
            </div>
        </>
    )
}

export default PlaceCard
