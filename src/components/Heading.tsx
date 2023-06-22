import { IonIcon } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import React from "react";
import "./Heading.css";

const Heading: React.FC<{ header: string }> = (props) => {
  return (
    <div className="flex-header">
      <h1>{props.header}</h1>
      <IonIcon size="large" icon={notificationsOutline} />
    </div>
  );
};

export default Heading;