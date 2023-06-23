import { IonContent, IonInput, IonPage, useIonRouter, IonButtons, IonIcon } from '@ionic/react'
import React, { useState, ChangeEvent } from 'react'
import SignupSVG from '../assets/signup.svg'
import '../theme/styles.css'
import { arrowBackOutline } from 'ionicons/icons'

const Signup: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [fullname, setFullname] = useState('')
    const [status, setStatus] = useState({ loading: false, error: false })

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }
        setStatus({ loading: true, error: false })
        try {
            // const response = await signup(username, password, fullname);
            // if (response.status === 200) {
            //     setStatus({ loading: false, error: false });
            //     router.push('/login');
            // } else {
            //     setStatus({ loading: false, error: true });
            // }
        } catch (e) {
            setStatus({ loading: false, error: true })
        }
    }

    const router = useIonRouter()
    const [step, setStep] = useState(1)

    const doSignup = () => {
        if (step === 1) {
            setStep(2)
        } else {
            console.log('do Signup')
            router.goBack()
        }
    }

    return (
        <IonPage className="signup">
            <IonContent>
                <img src={SignupSVG} alt="Signup" className="img-log" />
                <div className="header-container">
                    <IonButtons slot="start" className="back-button">
                        {step === 2 ? (
                            <IonIcon
                                size="large"
                                src={arrowBackOutline}
                                onClick={() => setStep(1)}
                            />
                        ) : (
                            <IonIcon
                                size="large"
                                src={arrowBackOutline}
                                onClick={() => router.push('/login')}
                            />
                        )}
                    </IonButtons>
                    <h1 className="ion-text-center ion-padding-top ion-padding-bottom">Sign up</h1>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    {step === 1 && (
                        <div>
                            <IonInput
                                label="Username"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Enter your username"
                                className="ion-margin-top"
                                value={username}
                                onIonChange={(event) => setUsername(event.detail.value!)}
                            />
                            <IonInput
                                label="Password"
                                type="password"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Enter password"
                                className="ion-margin-top"
                                value={password}
                            />
                            <IonInput
                                label="Confirm password"
                                type="password"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Confirm password"
                                className="ion-margin-top"
                                value={confirmPassword}
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <IonInput
                                label="Full Name"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Enter your full name"
                                className="ion-margin-top"
                                value={fullname}
                            />
                            <IonInput
                                label="Avatar Image (optional)"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Provide an avatar image URL"
                                className="ion-margin-top"
                            />
                        </div>
                    )}
                    <button className="custom-button" onClick={doSignup}>
                        {step === 1 ? 'Next' : 'Sign up'}
                    </button>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Signup
