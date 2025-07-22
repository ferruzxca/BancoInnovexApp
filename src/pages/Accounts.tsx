// src/pages/Accounts.tsx

import React, { useEffect, useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSpinner,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonList,
  IonToast,
  IonIcon,
} from "@ionic/react";
import { addCircleOutline, closeCircleOutline, trashOutline, createOutline } from "ionicons/icons";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { AuthContext } from "../context/AuthContext";
import "./Accounts.css";

// Interfaces para tipado
export interface User {
  id: number;
  email: string;
  role: string;
}

export interface AccountType {
  id: number;
  typeName: string;
  description: string;
}

export interface Customer {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  updatedAt: string;
  user: User;
}

export interface Account {
  id: number;
  customer: Customer;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  status: string;
}

const Accounts: React.FC = () => {
  const { token, logout } = useContext(AuthContext);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAccountId, setEditAccountId] = useState<number | null>(null);

  const [form, setForm] = useState({
    customerId: "",
    accountNumber: "",
    balance: "",
    accountTypeId: "",
    status: "ACTIVA",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Cargar cuentas, usuarios, account types y customers
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        // Cuentas
        const res = await fetch("http://31.220.31.203:8081/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const accountsData = await res.json();
        setAccounts(accountsData);

        // Usuarios
        const resUsers = await fetch("http://31.220.31.203:8081/api/public/users");
        const usersData = await resUsers.json();
        setUsers(usersData.usuarios || []);

        // Customers
        const resCustomers = await fetch("http://31.220.31.203:8081/customer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const customersData = await resCustomers.json();
        setCustomers(customersData);

        // Account Types
        const resTypes = await fetch("http://31.220.31.203:8081/account-type", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const typesData = await resTypes.json();
        setAccountTypes(typesData);
      } catch (err) {
        setToastMsg("Error cargando datos");
        setShowToast(true);
      }
      setLoading(false);
    };
    if (token) fetchAll();
  }, [token]);

  // Handlers CRUD
  const handleAddAccount = async () => {
    try {
      const body = {
        customer: { id: Number(form.customerId) },
        accountNumber: form.accountNumber,
        balance: Number(form.balance),
        accountType: { id: Number(form.accountTypeId) },
        status: form.status,
      };
      const res = await fetch("http://31.220.31.203:8081/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setToastMsg("Cuenta agregada correctamente");
        setShowToast(true);
        setShowModal(false);
        setForm({ customerId: "", accountNumber: "", balance: "", accountTypeId: "", status: "ACTIVA" });
        // Recargar cuentas
        const newAccounts = await fetch("http://localhost:8080/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(await newAccounts.json());
      } else {
        setToastMsg("Error al agregar cuenta");
        setShowToast(true);
      }
    } catch {
      setToastMsg("Error en el servidor");
      setShowToast(true);
    }
  };

  const handleEditAccount = (acc: Account) => {
    setIsEditing(true);
    setEditAccountId(acc.id);
    setForm({
      customerId: acc.customer.id.toString(),
      accountNumber: acc.accountNumber,
      balance: acc.balance.toString(),
      accountTypeId: acc.accountType.id.toString(),
      status: acc.status,
    });
    setShowModal(true);
  };

  const handleUpdateAccount = async () => {
    try {
      const body = {
        customer: { id: Number(form.customerId) },
        accountNumber: form.accountNumber,
        balance: Number(form.balance),
        accountType: { id: Number(form.accountTypeId) },
        status: form.status,
      };
      const res = await fetch(`http://31.220.31.203:8081/account/${editAccountId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setToastMsg("Cuenta actualizada correctamente");
        setShowToast(true);
        setShowModal(false);
        setIsEditing(false);
        setEditAccountId(null);
        setForm({ customerId: "", accountNumber: "", balance: "", accountTypeId: "", status: "ACTIVA" });
        const updatedAccounts = await fetch("http://31.220.31.203:8081/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(await updatedAccounts.json());
      } else {
        setToastMsg("Error al actualizar cuenta");
        setShowToast(true);
      }
    } catch {
      setToastMsg("Error en el servidor");
      setShowToast(true);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta cuenta?")) return;
    try {
      const res = await fetch(`http://31.220.31.203:8081/account/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setToastMsg("Cuenta eliminada");
        setShowToast(true);
        setAccounts(accounts.filter((acc) => acc.id !== id));
      } else {
        setToastMsg("No se pudo eliminar");
        setShowToast(true);
      }
    } catch {
      setToastMsg("Error en el servidor");
      setShowToast(true);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditAccountId(null);
    setForm({ customerId: "", accountNumber: "", balance: "", accountTypeId: "", status: "ACTIVA" });
    setShowModal(true);
  };

  return (
    <IonPage>
      <Navbar />
      <IonContent className="accounts-content">
        <h2 className="accounts-title">Cuentas Bancarias</h2>
        <IonButton color="primary" expand="block" onClick={openAddModal}>
          <IonIcon slot="start" icon={addCircleOutline} />
          Agregar cuenta
        </IonButton>
        {loading ? (
          <div className="accounts-spinner">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <div className="accounts-list">
            {accounts.length === 0 && (
              <p className="accounts-nodata">No hay cuentas registradas.</p>
            )}
            {accounts.map((acc) => (
              <IonCard className={`accounts-card glass ${acc.status !== "ACTIVA" ? "inactive" : ""}`} key={acc.id}>
                <IonCardHeader>
                  <IonCardTitle>
                    {acc.accountType.typeName} <span className="acc-status">{acc.status}</span>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    Titular: {acc.customer.name}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div><strong>Número de cuenta:</strong> <span className="acc-num">{acc.accountNumber}</span></div>
                  <div><strong>Saldo:</strong> <span className="acc-balance">${acc.balance.toLocaleString()}</span></div>
                  <div className="acc-desc">{acc.accountType.description}</div>
                  <div className="acc-meta">
                    <small>Email: {acc.customer.email}</small>
                  </div>
                  <IonButton
                    color="medium"
                    size="small"
                    onClick={() => handleEditAccount(acc)}
                  >
                    <IonIcon slot="start" icon={createOutline} />
                    Editar
                  </IonButton>
                  <IonButton
                    color="danger"
                    size="small"
                    onClick={() => handleDeleteAccount(acc.id)}
                  >
                    <IonIcon slot="start" icon={trashOutline} />
                    Eliminar
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <div className="modal-content">
            <h2>{isEditing ? "Editar Cuenta" : "Agregar Cuenta"}</h2>
            <IonList>
              <IonItem>
                <IonLabel position="floating">Cliente</IonLabel>
                <IonSelect
                  value={form.customerId}
                  onIonChange={e => setForm(f => ({ ...f, customerId: e.detail.value }))}
                  required
                >
                  {customers.map(c => (
                    <IonSelectOption value={c.id} key={c.id}>
                      {c.name} ({c.email})
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Número de cuenta</IonLabel>
                <IonInput
                  value={form.accountNumber}
                  onIonChange={e => setForm(f => ({ ...f, accountNumber: e.detail.value! }))}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Saldo</IonLabel>
                <IonInput
                  type="number"
                  value={form.balance}
                  onIonChange={e => setForm(f => ({ ...f, balance: e.detail.value! }))}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Tipo de cuenta</IonLabel>
                <IonSelect
                  value={form.accountTypeId}
                  onIonChange={e => setForm(f => ({ ...f, accountTypeId: e.detail.value }))}
                  required
                >
                  {accountTypes.map(t => (
                    <IonSelectOption value={t.id} key={t.id}>
                      {t.typeName}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Estatus</IonLabel>
                <IonSelect
                  value={form.status}
                  onIonChange={e => setForm(f => ({ ...f, status: e.detail.value }))}
                >
                  <IonSelectOption value="ACTIVA">ACTIVA</IonSelectOption>
                  <IonSelectOption value="INACTIVA">INACTIVA</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
            <div style={{ display: "flex", gap: "10px", marginTop: 20 }}>
              <IonButton
                color="success"
                expand="block"
                onClick={isEditing ? handleUpdateAccount : handleAddAccount}
              >
                {isEditing ? "Actualizar" : "Agregar"}
              </IonButton>
              <IonButton color="medium" expand="block" onClick={() => setShowModal(false)}>
                <IonIcon slot="start" icon={closeCircleOutline} />
                Cancelar
              </IonButton>
            </div>
          </div>
        </IonModal>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={2000}
          color="primary"
        />
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};

export default Accounts;