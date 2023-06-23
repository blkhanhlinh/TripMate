import {
    IonContent,
    IonInput,
    IonLoading,
    IonPage,
    IonRouterLink,
    IonSpinner,
    useIonRouter,
} from '@ionic/react'
import React, { useState } from 'react'
import LoginImg from '../assets/login.svg'
import Onboarding from '../components/OnBoarding'
import { PAGE } from '../constants/page'
import useNavigate from '../hooks/useNavigate'
import { signInThunk } from '../store/features/user/thunk'
import { useAppDispatch } from '../store/hook'
import '../theme/styles.css'

const Login: React.FC = () => {
    useNavigate({
        currentPage: PAGE.LOGIN,
        pageToNavigate: PAGE.MY.DISCOVERY.ROOT,
    })
    const [onBoarding, setOnboarding] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const router = useIonRouter()
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const dispatch = useAppDispatch()

    const onInputChange = (e: any) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleOnclick = async () => {
        setIsLoading(true)
        try {
            const res = await dispatch(signInThunk(form))
            if (res.payload.user) {
                router.push(PAGE.MY.DISCOVERY.ROOT)
            }
        } catch (err) {
            console.log({ err })
        } finally {
            setIsLoading(false)
        }
    }

    const finishOnBoarding = async () => {
        setOnboarding(true)
    }

    return (
        <>
            {!onBoarding ? (
                <Onboarding onFinish={finishOnBoarding} />
            ) : (
                <IonPage className="login">
                    <IonContent>
                        <img src={LoginImg} className="img-log" />
                        <h1 className="ion-text-left ion-padding-top ion-padding-bottom">Login</h1>
                        <form>
                            <IonInput
                                mode="md"
                                label="Username"
                                name="username"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Enter username"
                                onIonChange={onInputChange}
                            ></IonInput>
                            <br />
                            <IonInput
                                mode="md"
                                label="Password"
                                name="password"
                                type="password"
                                labelPlacement="floating"
                                fill="outline"
                                placeholder="Enter password"
                                onIonChange={onInputChange}
                            ></IonInput>
                            <br />
                        </form>
                        <button
                            type="submit"
                            onClick={handleOnclick}
                            className="custom-button"
                            disabled={loading}
                            style={{
                                opacity: loading ? 0.5 : 1,
                            }}
                        >
                            {loading ? <IonSpinner /> : <span>Login</span>}
                        </button>
                        <p className="ion-text-center ion-padding-top">
                            Don&#39;t have an account?{' '}
                            <span
                                onClick={() => router.push(PAGE.SIGNUP)}
                                role="button"
                                style={{
                                    cursor: 'pointer',
                                    color: '#007aff',
                                }}
                            >
                                Sign up here
                            </span>
                        </p>
                    </IonContent>
                </IonPage>
            )}
        </>
    )
}

export default Login
