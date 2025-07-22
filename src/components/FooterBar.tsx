// src/components/FooterBar.tsx
import React from "react";
import {
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./FooterBar.css";

const FooterBar: React.FC = () => {
  const history = useHistory();

  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons>
          <IonButton onClick={() => history.push("/dashboard")}>Inicio</IonButton>
          <IonButton onClick={() => history.push("/balance")}>Saldo</IonButton>
          <IonButton onClick={() => history.push("/transfer")}>Transferencia</IonButton>
          <IonButton onClick={() => history.push("/statements")}>Estados</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};

export default FooterBar;