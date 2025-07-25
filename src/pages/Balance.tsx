import React, { useEffect, useState, useContext } from "react";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSpinner } from "@ionic/react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { AuthContext } from "../context/AuthContext";
import "./Balance.css";

// Interfaces
interface AccountType {
  id: number;
  typeName: string;
  description: string;
}
interface Customer {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  updatedAt: string;
}
interface Account {
  id: number;
  customer: Customer;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  status: string;
}

const Balance: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Cambia el fetch si usas el servidor real:
        const res = await fetch("https://servidorbanquigt.site:8081/account", {
        //const res = await fetch("http://localhost:8080/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAccounts(data);
        } else {
          setAccounts([]);
        }
      } catch {
        setAccounts([]);
      }
      setLoading(false);
    };
    fetchAccounts();
  }, [token]);

  return (
    <IonPage>
      <Navbar />
      <IonContent className="balance-content">
        <h2 className="balance-title">Saldos de Cuentas</h2>
        {loading ? (
          <div className="balance-spinner">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <div className="balance-list">
            {accounts.length === 0 && (
              <p className="balance-nodata">No hay cuentas disponibles.</p>
            )}
            {accounts.map((acc) => (
              <IonCard className={`balance-card glass ${acc.status !== "ACTIVA" ? "inactive" : ""}`} key={acc.id}>
                <IonCardHeader>
                  <IonCardTitle>
                    {acc.customer.name}
                  </IonCardTitle>
                  <IonCardSubtitle>
                    Cuenta: <span className="acc-num">{acc.accountNumber}</span>
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div>
                    <span className="balance-label">Saldo:</span>{" "}
                    <span className="acc-balance">${acc.balance.toLocaleString()}</span>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};

export default Balance;