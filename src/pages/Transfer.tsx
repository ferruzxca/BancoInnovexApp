import React, { useEffect, useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { AuthContext } from "../context/AuthContext";
import "./Transfer.css";

// Tipos
interface AccountType {
  id: number;
  typeName: string;
  description: string;
}
interface Customer {
  id: number;
  name: string;
  email: string;
}
interface Account {
  id: number;
  customer: Customer;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  status: string;
}

const Transfer: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  // Form fields
  const [sender, setSender] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  // UI states
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Cambia si usas server real
        const res = await fetch("https://servidorbanquigt.site:8081/account", {
        //const res = await fetch("http://localhost:8080/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAccounts(data.filter((a: Account) => a.status === "ACTIVA"));
        }
      } catch {}
      setLoading(false);
    };
    fetchAccounts();
  }, [token]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender || !receiver || !amount || Number(amount) <= 0) {
      setToastMsg("Completa todos los campos correctamente.");
      setShowToast(true);
      return;
    }
    if (sender === receiver) {
      setToastMsg("No puedes transferir a la misma cuenta.");
      setShowToast(true);
      return;
    }
    setIsSending(true);
    try {
      // Cambia si usas el servidor real
       const res = await fetch("https://servidorbanquigt.site:8081/transactions/transfer", {
      //const res = await fetch("http://localhost:8080/transactions/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderAccountId: Number(sender),
          receiverAccountId: Number(receiver),
          amount: Number(amount),
        }),
      });
      if (res.ok) {
        setToastMsg("Transferencia realizada con éxito 🚀");
        setShowToast(true);
        setSender("");
        setReceiver("");
        setAmount("");
      } else {
        const error = await res.json();
        setToastMsg(error.mensaje || "No se pudo realizar la transferencia.");
        setShowToast(true);
      }
    } catch {
      setToastMsg("Error de conexión con el servidor.");
      setShowToast(true);
    }
    setIsSending(false);
  };

  return (
    <IonPage>
      <Navbar />
      <IonContent className="transfer-content">
        <h2 className="transfer-title">Transferencia entre Cuentas</h2>
        {loading ? (
          <div className="transfer-spinner">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <form className="transfer-form glass" onSubmit={handleTransfer}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Selecciona las cuentas</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <label>Cuenta origen:</label>
                <IonSelect
                  value={sender}
                  placeholder="Selecciona cuenta origen"
                  onIonChange={e => setSender(e.detail.value)}
                >
                  {accounts.map(acc => (
                    <IonSelectOption value={String(acc.id)} key={acc.id}>
                      {acc.customer.name} - {acc.accountNumber} (${acc.balance.toLocaleString()})
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <label style={{ marginTop: "15px" }}>Cuenta destino:</label>
                <IonSelect
                  value={receiver}
                  placeholder="Selecciona cuenta destino"
                  onIonChange={e => setReceiver(e.detail.value)}
                >
                  {accounts.map(acc => (
                    <IonSelectOption value={String(acc.id)} key={acc.id + "_r"}>
                      {acc.customer.name} - {acc.accountNumber}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <label style={{ marginTop: "15px" }}>Monto:</label>
                <IonInput
                  className="transfer-amount"
                  type="number"
                  placeholder="Monto a transferir"
                  value={amount}
                  min={1}
                  onIonChange={e => setAmount(e.detail.value!)}
                  required
                />
                <IonButton
                  expand="block"
                  type="submit"
                  className="transfer-btn"
                  disabled={isSending}
                  style={{ marginTop: "24px" }}
                >
                  {isSending ? "Enviando..." : "Transferir"}
                </IonButton>
              </IonCardContent>
            </IonCard>
          </form>
        )}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={2000}
          color={toastMsg.includes("éxito") ? "success" : "danger"}
        />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};

export default Transfer;