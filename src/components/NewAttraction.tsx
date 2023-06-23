import React, { useState } from 'react'
import { Attraction } from '../model/Attraction'
import { IonIcon, IonInput, useIonAlert } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import moment from 'moment'
import { useAppDispatch } from '../store/hook'
import { createAttractionThunk } from '../store/features/attraction/thunk'
type NewAttractionProps = {
    onCancel: () => void
    dayId: string
}

const NewAttraction: React.FC<NewAttractionProps> = ({ onCancel, dayId }) => {
    const [form, setForm] = useState<Attraction>({
        address: '',
        day_id: dayId,
        location_name: '',
        time: moment(new Date()).format('HH:mm'),
    })

    const onInputChange = (e: any) => {
        if (e.target.name === 'time') {
            setForm((prev) => ({
                ...prev,
                [e.target.name]: moment(e.target.value, 'HH:mm').format('HH:mm'),
            }))
        } else setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const [present] = useIonAlert()
    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        //
        console.log({ form })
        if (Object.values(form).some((value) => value === '')) {
            return present({
                header: 'Error',
                message: 'Please fill all fields',
                buttons: ['OK'],
            })
        }
        const res = await dispatch(createAttractionThunk(form))
        if (res.payload) {
            onCancel()
        }
    }

    const handleOnClick = () => {
        onCancel()
    }
    return (
        <div className="container">
            <div className="subheading">
                <IonIcon icon={closeOutline} size="large" onClick={handleOnClick} />
                <h1>Trip details plan</h1>
            </div>
            <div className="form-container">
                <div className="group">
                    <h4>Location Name</h4>
                    <IonInput
                        fill="outline"
                        name="location_name"
                        value={form.location_name}
                        onIonChange={onInputChange}
                    />
                </div>

                <div className="group">
                    <h4>Address</h4>
                    <IonInput
                        fill="outline"
                        name="address"
                        value={form.address}
                        onIonChange={onInputChange}
                    />
                </div>

                <div className="group">
                    <h4>Time</h4>
                    <IonInput
                        fill="outline"
                        type="time"
                        name="time"
                        value={form.time}
                        onIonChange={onInputChange}
                    />
                </div>

                <div className="button-group">
                    <button onClick={handleSubmit} className="custom-button">
                        Add attraction
                    </button>
                    <button onClick={onCancel} className="custom-outline-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewAttraction
