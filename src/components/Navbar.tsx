// src/components/Navbar.tsx
import React, { useContext } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>NeoVexBank</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => history.push("/dashboard")}>Inicio</IonButton>
          <IonButton onClick={() => history.push("/profile")}>Perfil</IonButton>
          <IonButton color="danger" onClick={logout}>Salir</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;