// src/pages/Transactions.tsx
import React, { useState } from "react";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonInput, IonButton } from "@ionic/react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import "./Transactions.css";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  description: string;
}

const Transactions: React.FC = () => {
  const [accountId, setAccountId] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://31.220.31.203:8081/transactions/${accountId}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch {
      setTransactions([]);
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <Navbar />
      <IonContent className="transactions-content">
        <h2 className="transactions-title">Transacciones</h2>
        <div className="transactions-form">
          <IonInput
            value={accountId}
            placeholder="ID de Cuenta"
            onIonChange={(e) => setAccountId(e.detail.value!)}
            className="input-trans"
          />
          <IonButton onClick={fetchTransactions} className="trans-btn-glow">Buscar</IonButton>
        </div>
        <div className="transactions-list">
          {loading ? (
            <IonSpinner name="crescent" />
          ) : (
            transactions.length === 0 ? (
              <p className="trans-nodata">No hay transacciones.</p>
            ) : (
              transactions.map((t) => (
                <IonCard className="trans-card glass" key={t.id}>
                  <IonCardHeader>
                    <IonCardTitle>{t.type} - ${t.amount.toLocaleString()}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div><strong>Fecha:</strong> {new Date(t.date).toLocaleString()}</div>
                    <div><strong>Descripción:</strong> {t.description}</div>
                  </IonCardContent>
                </IonCard>
              ))
            )
          )}
        </div>
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};

export default Transactions;