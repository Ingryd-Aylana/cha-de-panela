import React, { useState } from "react";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import "./ConfirmModal.css";

export default function ConfirmModal({ open, onClose }) {
  const [nome, setNome] = useState("");
  const [acompanhante, setAcompanhante] = useState("");
  const [confirmado, setConfirmado] = useState(false); // Novo estado

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nome.trim().length < 2) return alert("Digite seu nome completo.");
    
    // Salva confirmação no Firestore
    const docId = Date.now().toString() + Math.random().toString(36).slice(2, 8);
    await setDoc(doc(db, "confirmacoes", docId), {
      nome: nome.trim(),
      acompanhante: acompanhante.trim(),
      criadoEm: new Date().toISOString()
    });
    
    // Altera o estado para exibir a mensagem de sucesso
    setConfirmado(true);
    
    // Limpa os campos depois de um tempo e fecha o modal
    setTimeout(() => {
      setNome("");
      setAcompanhante("");
      setConfirmado(false);
      onClose();
    }, 2000); // Fecha após 2 segundos
  };

  return (
    <div className="modal-confirm-bg">
      <div className="modal-confirm-card">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {confirmado ? (
          <div className="success-message">
            <h3>Presença confirmada! 🎉</h3>
            <p>Obrigado por confirmar. Nos vemos lá!</p>
          </div>
        ) : (
          <>
            <h3>Confirmar presença</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                autoFocus
              />
              <input
                type="text"
                placeholder="Nome do acompanhante (opcional)"
                value={acompanhante}
                onChange={e => setAcompanhante(e.target.value)}
              />
              <button type="submit" className="btn-confirm">Confirmar</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}