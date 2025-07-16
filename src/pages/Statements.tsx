import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote } from '@ionic/react';
import SideMenu from '../components/SideMenu';
import './Statements.css';

const dummyStatements = [
  { date: '2025-07-01', desc: 'Transferencia recibida', amount: '+$5,000.00', type: 'in' },
  { date: '2025-06-30', desc: 'Pago de servicios', amount: '-$800.00', type: 'out' },
  { date: '2025-06-29', desc: 'Depósito en ventanilla', amount: '+$2,000.00', type: 'in' },
  { date: '2025-06-28', desc: 'Compra en línea', amount: '-$3,200.00', type: 'out' },
];

const Statements: React.FC = () => (
  <IonPage>
    <SideMenu />
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Estado de Cuenta</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="statements-content">
      <IonList>
        {dummyStatements.map((tx, idx) => (
          <IonItem key={idx} lines="full" className={tx.type === 'in' ? 'tx-in' : 'tx-out'}>
            <IonLabel>
              <h2>{tx.desc}</h2>
              <p>{tx.date}</p>
            </IonLabel>
            <IonNote slot="end" color={tx.type === 'in' ? 'success' : 'danger'}>
              {tx.amount}
            </IonNote>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  </IonPage>
);

export default Statements;