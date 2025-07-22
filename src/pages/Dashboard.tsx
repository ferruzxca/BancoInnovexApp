import React, { useContext } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <IonPage>
        <Navbar />
        <IonContent className="dashboard-content">
          <div className="dashboard-loading">Cargando usuario...</div>
        </IonContent>
        <FooterBar />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Navbar />
      <IonContent className="dashboard-content">
        <div className="bank-card glass">
          <div className="bank-header">
            <img src="/assets/logo_neovex.jpeg" alt="NeoVexBank Logo" className="bank-logo" />
            <div className="bank-brand">
              <h1>NeoVexBank</h1>
              <span className="role-label">
                {user.role === "ADMIN" ? "Administrador" : "Usuario"}
              </span>
            </div>
          </div>
          <div className="user-welcome">
            <span className="wave">👋</span>
            <h2>Hola, <b>{user.email || "Usuario"}</b></h2>
            <p>¡Bienvenido a tu banca digital!</p>
          </div>
          <div className="dashboard-actions">
            <button className="action-btn" onClick={() => history.push("/balance")}>
              <span className="icon">💰</span> Ver Saldo
            </button>
            <button className="action-btn" onClick={() => history.push("/accounts")}>
              <span className="icon">🏦</span> Mis Cuentas
            </button>
            <button className="action-btn" onClick={() => history.push("/transfer")}>
              <span className="icon">💸</span> Transferir
            </button>
            <button className="action-btn" onClick={() => history.push("/statements")}>
              <span className="icon">📄</span> Estados de Cuenta
            </button>
            <button className="action-btn" onClick={() => history.push("/profile")}>
              <span className="icon">👤</span> Perfil
            </button>
            {user.role === "ADMIN" && (
              <button className="action-btn admin-btn" onClick={() => history.push("/users")}>
                <span className="icon">🛡️</span> Gestión de Usuarios
              </button>
            )}
          </div>
        </div>
        <div className="dashboard-fab">
          <button className="fab-btn" onClick={() => history.push("/transfer")}>+</button>
        </div>
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};

export default Dashboard;