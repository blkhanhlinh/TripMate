import {
    IonContent,
    IonInput,
    IonPage,
    useIonRouter,
    IonButtons,
    IonIcon,
    IonToast,
    useIonAlert,
    IonSpinner,
} from '@ionic/react'
import React, { useState, ChangeEvent } from 'react'
import SignupSVG from '../assets/signup.svg'
import '../theme/styles.css'
import { arrowBackOutline } from 'ionicons/icons'
import useNavigate from '../hooks/useNavigate'
import { PAGE } from '../constants/page'
import { User } from '../model/User'
import { useAppDispatch } from '../store/hook'
import { signUpThunk } from '../store/features/user/thunk'

const Signup: React.FC = () => {
    useNavigate({
        currentPage: PAGE.SIGNUP,
        pageToNavigate: PAGE.MY.DISCOVERY.ROOT,
    })

    const [form, setForm] = useState<User>({
        username: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const onInputChange = (e: any) => {
        if (e.target.name === 'confirmPassword') setConfirmPassword(e.target.value)
        else setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const dispatch = useAppDispatch()
    const [presentAlert] = useIonAlert()
    const handleSignup = async () => {
        if (confirmPassword !== form.password) {
            return presentAlert({
                header: 'Warning',
                subHeader: 'Confirm password is not match',
                message: 'Please check your confirm password',
                buttons: ['OK'],
            })
        }

        if (Object.values(form).some((value) => value === '')) {
            return presentAlert({
                header: 'Warning',
                subHeader: 'Please fill all fields',
                message: 'Please fill all fields',
                buttons: ['OK'],
            })
        }

        try {
            setLoading(true)
            const res = await dispatch(signUpThunk(form))
            if (res.payload) {
                router.push(PAGE.MY.DISCOVERY.ROOT)
            }
        } catch (err) {
            console.log({ err })
        } finally {
            setLoading(false)
        }
    }

    const router = useIonRouter()

    return (
        <IonPage className="signup">
            <IonContent>
                <img src={SignupSVG} alt="Signup" className="img-log" />
                <div className="header-container">
                    <IonButtons
                        slot="start"
                        className="back-button"
                        onClick={() => router.goBack()}
                    >
                        <IonIcon size="large" src={arrowBackOutline} />
                    </IonButtons>
                    <h1 className="ion-text-center ion-padding-top ion-padding-bottom">Sign up</h1>
                </div>
                <div>
                    <div>
                        <IonInput
                            label="Username"
                            labelPlacement="floating"
                            fill="outline"
                            name="username"
                            placeholder="Enter your username"
                            className="ion-margin-top"
                            value={form.username}
                            onIonChange={onInputChange}
                        />
                        <IonInput
                            label="Password"
                            type="password"
                            labelPlacement="floating"
                            fill="outline"
                            name="password"
                            placeholder="Enter password"
                            className="ion-margin-top"
                            value={form.password}
                            onIonChange={onInputChange}
                        />
                        <IonInput
                            label="Confirm password"
                            type="password"
                            labelPlacement="floating"
                            fill="outline"
                            placeholder="Confirm password"
                            className="ion-margin-top"
                            name="confirmPassword"
                            value={confirmPassword}
                            onIonChange={onInputChange}
                        />
                        <IonInput
                            label="Full Name"
                            labelPlacement="floating"
                            fill="outline"
                            name="full_name"
                            placeholder="Enter your full name"
                            className="ion-margin-top"
                            value={form.full_name}
                            onIonChange={onInputChange}
                        />
                    </div>
                    <button
                        className="custom-button"
                        onClick={handleSignup}
                        style={{
                            opacity: loading ? 0.5 : 1,
                        }}
                        disabled={loading}
                    >
                        {loading ? <IonSpinner /> : 'Sign up'}
                    </button>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Signup
