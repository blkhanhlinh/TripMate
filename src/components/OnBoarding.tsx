import React from 'react';
import { IonButton, IonButtons, IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import './OnBoarding.css';
import onboarding1 from '../assets/onboarding1.svg';
import onboarding2 from '../assets/onboarding2.svg';
import onboarding3 from '../assets/onboarding3.svg';

interface ContainerProps {
    onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()} className='custom-button'>{children}</IonButton>;
};

const Onboarding: React.FC<ContainerProps> = ({ onFinish }) => {
    return (
        <IonPage>
            <IonContent>
                <Swiper
                    className="swiper-container"
                    pagination={{ clickable: true }}
                    navigation
                    loop={false}
                    onSlideChange={() => console.log('Slide changed')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide className="swiper-slide">
                        <img src={onboarding1} alt="Onboarding Slide 1" />
                        <h1>Discover</h1>
                        <p>Find inspiration, explore fascinating destinations</p>
                        <SwiperButtonNext>Next</SwiperButtonNext>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                        <img src={onboarding2} alt="Onboarding Slide 2" />
                        <h1>Plan your trip</h1>
                        <p>Select destinations and start scheduling details for your trip</p>
                        <SwiperButtonNext>Next</SwiperButtonNext>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                        <img src={onboarding3} alt="Onboarding Slide 3" />
                        <h1>Start your adventure</h1>
                        <p>Enjoy! Relax and chilling memories</p>
                        <IonButtons onClick={() => onFinish()} className="last-button">Get Started</IonButtons>
                    </SwiperSlide>
                </Swiper>
            </IonContent>
        </IonPage>
    );
};

export default Onboarding;