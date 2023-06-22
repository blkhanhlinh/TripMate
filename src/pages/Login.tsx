import { IonButton, IonButtons, IonContent, IonInput, IonPage, IonRouterLink, useIonRouter } from "@ionic/react"
import React, { useState } from "react"
import LoginImg from "../assets/login.svg"
import { useHistory } from "react-router-dom"
import Onboarding from "../components/OnBoarding"
import "../theme/styles.css"

const Login: React.FC<{ setIsLoggedIn: (isLoggedIn: boolean) => void }> = ({ setIsLoggedIn }) => {
    const router = useIonRouter();
    const [onBoarding, setOnboarding] = useState(false);
    const doLogin = (event: any) => {
        event.preventDefault();
        console.log("do login");
        setIsLoggedIn(true);
    };

    const history = useHistory()

    const handleOnclick = () => {
        history.push("/my/discovery")
    };

    const finishOnBoarding = async () => {
        setOnboarding(true)
    }

    return (
        <>
            {!onBoarding ? (<Onboarding onFinish={finishOnBoarding} />) : (
                <IonPage className="login">
                    <img src={LoginImg} />
                    <h1 className="ion-text-left ion-padding-top ion-padding-bottom">Login</h1>
                    <IonContent scrollY={false}>
                        <form onSubmit={doLogin}>
                            <IonInput mode="md" label="Username" labelPlacement="floating" fill="outline" placeholder="Enter username"></IonInput>
                            <br />
                            <IonInput mode="md" label="Password" type="password" labelPlacement="floating" fill="outline" placeholder="Enter password"></IonInput>
                            <br />
                        </form>
                        <button type="submit" onClick={handleOnclick} className="custom-button">Login</button>
                        <p className="ion-text-center ion-padding-top">
                            Don&#39;t have an account? <span><IonRouterLink href="/signup">Sign up here</IonRouterLink></span>
                        </p>
                    </IonContent>
                </IonPage>
            )}
        </>
    )
}

export default Login