import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Si ambos campos tienen texto, navega a dashboard
    if (username.trim() && password.trim()) {
      window.location.href = '/dashboard'; // Redirección directa
    } else {
      alert('Escribe usuario y contraseña');
    }
  };

  return (
    <IonPage>
      <IonContent className="login-content" fullscreen>
        <div className="login-box">
          <img
            src="/assets/logo_neovex.jpeg"
            alt="NeoVexBank"
            className="logo"
          />
          <h1>NeoVexBank</h1>
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel position="floating">Usuario</IonLabel>
              <IonInput
                value={username}
                onIonChange={e => setUsername(e.detail.value!)}
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
      </IonContent>
    </IonPage>
  );
};

export default Login;