import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel, IonButton } from '@ionic/react';
import SideMenu from '../components/SideMenu';
import './Profile.css';

const Profile: React.FC = () => (
  <IonPage>
    <SideMenu />
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Mi Perfil</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="profile-content">
      <div className="profile-card">
        <IonAvatar className="profile-avatar">
          <img src="/assets/user.jpeg" alt="User" />
        </IonAvatar>
        <h2>Raúl Innovex</h2>
        <p>raul@neovexbank.com</p>
        <IonItem lines="none">
          <IonLabel>Cuenta: <b>0102030405</b></IonLabel>
        </IonItem>
        <IonButton expand="block" color="medium" className="logout-btn" routerLink="/login">
          Cerrar sesión
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
);

export default Profile;