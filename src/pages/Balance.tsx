import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent } from '@ionic/react';
import SideMenu from '../components/SideMenu';
import './Balance.css';

const Balance: React.FC = () => (
  <IonPage>
    <SideMenu />
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Consulta de Saldo</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="balance-content">
      <IonCard className="balance-card">
        <IonCardContent>
          <div className="balance-title">Saldo disponible</div>
          <div className="balance-amount">$25,470.00 MXN</div>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
);

export default Balance;