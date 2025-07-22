import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent, IonInput, IonButton, IonToast, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      history.push("/dashboard");
    } else {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        <div className="login-bg"></div>
        <form className="login-form" onSubmit={handleLogin}>
          <IonCard className="login-card glass">
            <IonCardHeader>
              <IonCardTitle>NeoVexBank Login</IonCardTitle>
            </IonCardHeader>
            <IonInput
              className="login-input"
              type="email"
              placeholder="Correo"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              required
            />
            <IonInput
              className="login-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              required
            />
            <IonButton expand="block" type="submit" className="login-btn">
              Iniciar Sesión
            </IonButton>
          </IonCard>
        </form>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Correo o contraseña incorrectos."
          duration={2000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;