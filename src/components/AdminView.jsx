// src/components/AdminView.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "./GiftList.css";

function AdminView() {
  const [itens, setItens] = useState([]);
  const [confirmados, setConfirmados] = useState([]);

  // Presentes reservados
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "presentes"), (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data());
      setItens(docs);
    });
    return () => unsub();
  }, []);

  // Lista de confirmações de presença
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "confirmacoes"), (snapshot) => {
      setConfirmados(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, []);

  return (
    <div className="gift-list-container">
      <h2>Presentes Reservados</h2>
      <ul>
        {itens
          .filter((item) => item.reservadoPor)
          .map((item, idx) => (
            <li key={item.nome + idx}>
              <span>
                <b>{item.nome}</b> ({item.categoria})
              </span>
              <span className="presenteador">
                Reservado por: {item.reservadoPor}
              </span>
            </li>
          ))}
        {itens.filter((item) => item.reservadoPor).length === 0 && (
          <li>Nenhum presente reservado ainda!</li>
        )}
      </ul>

      <hr style={{ margin: "36px 0 22px 0", border: "none", borderTop: "1px solid #e6d3be" }} />

      <h2>Confirmações de Presença</h2>
      <ul>
        {confirmados.length === 0 && <li>Nenhuma confirmação ainda 😢</li>}
        {confirmados.map((p, idx) => (
          <li key={p.nome + idx}>
            <b>{p.nome}</b>
            {p.acompanhante && p.acompanhante.trim() && (
              <span> &nbsp; <b>+ {p.acompanhante}</b></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminView;
