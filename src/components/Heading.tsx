import { IonIcon, useIonRouter } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import React from "react";
import "./Heading.css";
import { PAGE } from '../constants/page'

const Heading: React.FC<{ header: string }> = (props) => {
  const router = useIonRouter()
  const handleOnClick = () => {
    router.push(PAGE.MY.NOTIFICATIONS.ROOT)
  }
  return (
    <div className="flex-header">
      <h1>{props.header}</h1>
      <IonIcon size="large" icon={notificationsOutline} onClick={handleOnClick}/>
    </div>
  );
};

export default Heading;