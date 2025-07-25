import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(true);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch('https://servidorbanquigt.site:8081/api/public/users');
      const data = await res.json();

      if (data.estado) {
        setUsuarios(data.usuarios);
        setMensaje(data.mensaje);
      } else {
        setMensaje(data.mensaje);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setMensaje('Error al conectar con la API');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuarios Registrados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {cargando ? (
          <IonSpinner name="crescent" />
        ) : (
          <>
            <IonText>
              <h2>{mensaje}</h2>
            </IonText>

            <IonList>
              {usuarios.map((usuario, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>ID: {usuario.id}</h2>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Rol:</strong> {usuario.role}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
