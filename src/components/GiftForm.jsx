import React, { useState } from "react";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import "./GiftForm.css"; // Importe o CSS para que ele seja aplicado

function GiftForm({ open, onClose, item, categoriaCor, corTexto }) {
  const [nomePresenteador, setNomePresenteador] = useState("");
  const [reservado, setReservado] = useState(false);

  if (!open || !item) return null;

  const handleConfirmar = async () => {
    if (nomePresenteador.trim().length < 2) {
      alert("Por favor, digite seu nome.");
      return;
    }

    try {
      const novoItem = {
        ...item,
        reservadoPor: nomePresenteador,
      };
      
      await setDoc(doc(db, "presentes", item.id), novoItem);
      
      setReservado(true);
      
      setTimeout(() => {
        setNomePresenteador("");
        setReservado(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Erro ao confirmar a reserva:", error);
      alert("Ocorreu um erro ao confirmar a reserva. Tente novamente.");
    }
  };

  return (
    // Usa a prop 'categoriaCor' para aplicar a classe de cor dinâmica
    <div className={`modal-reserva-bg ${categoriaCor}`}>
      <div className="modal-reserva-card">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {reservado ? (
          <div className="success-message">
            <h3>Presente Reservado! 🎉</h3>
            <p>Obrigado por escolher o presente, {nomePresenteador}!</p>
          </div>
        ) : (
          <>
            <h3>Reservar "{item.nome}"</h3>
            <p>Categoria: {item.categoria}</p>
            {/* Exibe o texto com as cores predominantes */}
            <p className="cor-texto">Cores Predominantes: <b>{corTexto}</b></p>
            
            <label>
              Seu nome:
              <input
                type="text"
                value={nomePresenteador}
                onChange={(e) => setNomePresenteador(e.target.value)}
                autoFocus
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleConfirmar}>Confirmar Reserva</button>
              <button className="cancelar" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GiftForm;