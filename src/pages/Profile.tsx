import React, { useContext, useState, useEffect } from "react";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonToast } from "@ionic/react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile: React.FC = () => {
  const { user, token } = useContext(AuthContext);
  const [now, setNow] = useState(new Date());
  const [showToast, setShowToast] = useState(false);

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Para copiar el token
  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setShowToast(true);
    }
  };

  if (!user) {
    return (
      <IonPage>
        <Navbar />
        <IonContent className="profile-content">
          <div className="profile-loading">Cargando perfil...</div>
        </IonContent>
        <FooterBar />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Navbar />
      <IonContent className="profile-content">
        <IonCard className="profile-card glass">
          <div className="profile-avatar-container">
            <img
              src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${encodeURIComponent(user.email)}`}
              alt="Avatar"
              className="profile-avatar"
            />
          </div>
          <IonCardHeader>
            <IonCardTitle className="profile-name">
              {user.email}
            </IonCardTitle>
            <div className="profile-role">{user.role === "ADMIN" ? "Administrador" : "Usuario"}</div>
          </IonCardHeader>
          <IonCardContent>
            <div className="profile-detail">
              <b>Fecha y hora actual:</b>
              <span>{now.toLocaleString()}</span>
            </div>
            <div className="profile-detail">
              <b>Token actual:</b>
              <div className="profile-token-area">
                <span className="profile-token">{token?.slice(0, 22)}...{token?.slice(-22)}</span>
                <IonButton
                  size="small"
                  color="secondary"
                  fill="outline"
                  className="copy-btn"
                  onClick={copyToken}
                >Copiar</IonButton>
              </div>
            </div>
            <div className="profile-detail">
              <b>ID de usuario:</b> <span>{user.id}</span>
            </div>
            <div className="profile-detail">
              <b>Rol:</b> <span>{user.role}</span>
            </div>
          </IonCardContent>
        </IonCard>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Token copiado al portapapeles."
          duration={1600}
          color="success"
        />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};

export default Profile;