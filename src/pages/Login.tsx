// src/pages/Login.tsx (COMPLETO Y CORREGIDO para React Router v5)

import React, { useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonToast
} from "@ionic/react";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email.trim(), password.trim());
    if (success) {
      history.replace("/dashboard");
    } else {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        <div className="login-box">
          <img
            src="/assets/logo-neovexbank.png"
            alt="NeoVexBank"
            className="logo"
            style={{ width: "60vw", maxWidth: "300px", margin: "0 auto", display: "block" }}
          />
          <h1 style={{ textAlign: "center" }}>NeoVexBank</h1>
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel position="floating">Correo electrónico</IonLabel>
              <IonInput
                value={email}
                type="email"
                onIonChange={e => setEmail(e.detail.value!)}
                required
                autofocus
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                required
              />
            </IonItem>
            <IonButton expand="block" type="submit" className="login-btn">
              Iniciar sesión
            </IonButton>
          </form>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Correo o contraseña incorrectos"
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;