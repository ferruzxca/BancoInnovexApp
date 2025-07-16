import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/react';
import SideMenu from '../components/SideMenu';
import './Transfer.css';

const Transfer: React.FC = () => {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí deberías hacer la petición a la API para transferir
    setShowToast(true);
    setAccount('');
    setAmount('');
  };

  return (
    <IonPage>
      <SideMenu />
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Transferencia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="transfer-content">
        <form className="transfer-form" onSubmit={handleTransfer}>
          <IonItem>
            <IonLabel position="floating">Cuenta destino</IonLabel>
            <IonInput value={account} onIonChange={e => setAccount(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Monto (MXN)</IonLabel>
            <IonInput type="number" value={amount} onIonChange={e => setAmount(e.detail.value!)} required />
          </IonItem>
          <IonButton expand="block" type="submit" className="transfer-btn">
            Realizar transferencia
          </IonButton>
        </form>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Transferencia realizada exitosamente"
          duration={1800}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Transfer;