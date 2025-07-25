// src/pages/Users.tsx
import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner } from "@ionic/react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import "./Users.css";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://servidorbanquigt.site:8081/api/public/users");
        const data = await res.json();
        if (data.estado) setUsers(data.usuarios);
      } catch {}
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <IonPage>
      <Navbar />
      <IonContent className="users-content">
        <h2 className="users-title">Usuarios Registrados</h2>
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          users.map((u, idx) => (
            <IonCard className="users-card glass" key={idx}>
              <IonCardHeader>
                <IonCardTitle>{u.email}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div><strong>Rol:</strong> {u.role}</div>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};
export default Users;