import React, { useContext } from 'react';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle
} from '@ionic/react';
import { cashOutline, swapHorizontalOutline, documentTextOutline, personCircleOutline, logOutOutline, homeOutline } from 'ionicons/icons';
import { AuthContext } from '../context/AuthContext';
import './SideMenu.css';

const SideMenu: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>NeoVexBank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/dashboard" routerDirection="root">
              <IonIcon icon={homeOutline} slot="start" />
              <IonLabel>Inicio</IonLabel>
            </IonItem>
            <IonItem routerLink="/balance" routerDirection="forward">
              <IonIcon icon={cashOutline} slot="start" />
              <IonLabel>Consulta de Saldo</IonLabel>
            </IonItem>
            <IonItem routerLink="/transfer" routerDirection="forward">
              <IonIcon icon={swapHorizontalOutline} slot="start" />
              <IonLabel>Transferencias</IonLabel>
            </IonItem>
            <IonItem routerLink="/statements" routerDirection="forward">
              <IonIcon icon={documentTextOutline} slot="start" />
              <IonLabel>Estado de Cuenta</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile" routerDirection="forward">
              <IonIcon icon={personCircleOutline} slot="start" />
              <IonLabel>Perfil</IonLabel>
            </IonItem>
            <IonItem button onClick={logout}>
              <IonIcon icon={logOutOutline} slot="start" />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;