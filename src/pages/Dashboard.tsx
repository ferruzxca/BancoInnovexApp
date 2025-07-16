import React from 'react';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { cashOutline, swapHorizontalOutline, documentTextOutline, personCircleOutline } from 'ionicons/icons';
import SideMenu from '../components/SideMenu';
import './Dashboard.css';

const Dashboard: React.FC = () => (
  <IonPage>
    <SideMenu />
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Bienvenido a NeoVexBank</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="dashboard-content">
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard routerLink="/balance" className="dashboard-card">
              <IonCardContent>
                <IonIcon icon={cashOutline} className="card-icon" />
                <h2>Consulta de Saldo</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard routerLink="/transfer" className="dashboard-card">
              <IonCardContent>
                <IonIcon icon={swapHorizontalOutline} className="card-icon" />
                <h2>Transferencias</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard routerLink="/statements" className="dashboard-card">
              <IonCardContent>
                <IonIcon icon={documentTextOutline} className="card-icon" />
                <h2>Estado de Cuenta</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard routerLink="/profile" className="dashboard-card">
              <IonCardContent>
                <IonIcon icon={personCircleOutline} className="card-icon" />
                <h2>Perfil</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

export default Dashboard;