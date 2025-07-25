 import React from "react";
import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";
import "./FooterBar.css";

const FooterBar: React.FC = () => {
  return (
    <IonFooter className="footer-bar">
      <IonToolbar>
        <IonTitle className="footer-text">
          © 2025 NeoVexBank. Todos los derechos reservados. ¡Gracias por tu visita!
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default FooterBar;
