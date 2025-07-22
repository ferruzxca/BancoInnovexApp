// src/pages/Statements.tsx
import React, { useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";
import "./Statements.css";

// Simulación de datos
const mockStatements = [
  {
    id: 1,
    accountNumber: "0011001122",
    balance: 15000.0,
    date: "2025-07-21",
    pdf: "/statements/statement_0011001122_julio.pdf"
  },
  {
    id: 2,
    accountNumber: "0022002211",
    balance: 8000.0,
    date: "2025-07-20",
    pdf: "/statements/statement_0022002211_julio.pdf"
  },
];

const Statements: React.FC = () => {
  const [statements, setStatements] = useState<any[]>([]);

  useEffect(() => {
    // Sustituye con fetch real de la API
    setStatements(mockStatements);
  }, []);

  return (
    <IonPage>
      <Navbar />
      <IonContent className="statements-content">
        <div className="statements-title">Estados de Cuenta</div>
        <div className="statements-list">
          {statements.length === 0 && (
            <div className="statement-empty">
              No hay estados de cuenta generados.
            </div>
          )}
          {statements.map((s) => (
            <div className="statement-card glass" key={s.id}>
              <div className="statement-card-header">
                <span className="statement-icon">📄</span>
                <div className="statement-info">
                  <div className="statement-account">
                    Cuenta: {s.accountNumber}
                  </div>
                  <div className="statement-date">
                    Generado: {s.date}
                  </div>
                </div>
              </div>
              <div className="statement-pdf">
                <a className="statement-pdf-link" href={s.pdf} download>
                  Descargar PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
      <FooterBar />
    </IonPage>
  );
};

export default Statements;