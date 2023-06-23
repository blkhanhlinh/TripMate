import React, { useState } from 'react'
import { Memory } from '../model/Memory'
import { IonIcon, useIonAlert } from '@ionic/react'
import { closeOutline, eyeOutline, trashOutline } from 'ionicons/icons'
import { useAppDispatch } from '../store/hook'
import { deleteMemoryThunk } from '../store/features/memory/thunk'

const MemoryCard = (memory: Memory) => {
    const [present] = useIonAlert()
    const dispatch = useAppDispatch()
    const [zoomImage, setZoomImage] = useState(false)
    const handleOnClickDeleteMemory = async () => {
        present({
            header: 'Delete memory',
            message: 'Are you sure you want to delete this memory?',
            buttons: [
                'Cancel',
                {
                    text: 'Delete',
                    handler: async () => {
                        await dispatch(deleteMemoryThunk(memory._id as string))
                    },
                },
            ],
        })
    }
    return (
        <div>
            <div
                style={{
                    position: 'relative',
                }}
            >
                <img src={memory?.image} alt={memory?.trip_id} key={memory._id} />
                <div
                    style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        gap: 8,
                        zIndex: 10,
                    }}
                >
                    <IonIcon
                        icon={eyeOutline}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            padding: 5,
                            color: 'blue',
                        }}
                        onClick={() => setZoomImage(true)}
                    />
                    <IonIcon
                        icon={trashOutline}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            padding: 5,
                        }}
                        onClick={handleOnClickDeleteMemory}
                        color="danger"
                    />
                </div>
            </div>
            <div
                style={{
                    display: zoomImage ? 'grid' : 'none',
                    position: 'fixed',
                    inset: 0,
                    placeItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 100,
                }}
            >
                <IonIcon
                    icon={closeOutline}
                    style={{
                        color: 'white',
                        position: 'absolute',
                        top: 20,
                        right: 20,
                    }}
                    onClick={() => setZoomImage(false)}
                    size="large"
                />
                <img
                    src={memory.image}
                    alt={memory.trip_id}
                    style={{
                        width: '100%',
                        height: 300,
                        borderRadius: 0,
                    }}
                />
            </div>
        </div>
    )
}

export default MemoryCard
