
import "./InvitePage.css";
import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function InvitePage({ onSeeGifts }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="invite-bg">
      <div className="invite-card">
        <div className="invite-header">
          <span className="invite-title">CHÁ DE <span className="highlight">PANELA</span></span>
        </div>

        <div className="invite-names">
          <span className="name-main">Carol</span>
          <span className="ampersand">&</span>
          <span className="name-main">Lucas</span>
        </div>

        <div className="invite-text">
          <p>Nosso novo lar está ganhando forma e queremos <b>celebrar com você.</b></p>
          <p><b>Junte-se</b> a nós para um chá de panela cheio de sorrisos e delícias.</p>
        </div>

        <div className="invite-date-box">
          <div className="date-left">DOMINGO</div>
          <div className="date-center">
            <span className="date-big">23</span>
            <span className="date-small">Novembro</span>
          </div>
          <div className="date-right">AS 13H</div>
        </div>

        <div className="invite-address">
          Bora Bora Resort Real<br />
          Av. Embaixador Abelardo Bueno, 2510 - Barra da Tijuca<br />
          Salão de Festas - Bloco 01
        </div>
        <div className="invite-extra">
          Traga sua bebida alcoólica e venha celebrar esse momento com a gente!
        </div>

        <div className="btn-row">
          <button className="btn-gifts" onClick={onSeeGifts}>
            Ver lista de presentes
          </button>
          <button
            className="btn-gifts"
            style={{ background: "#a45722" }}
            onClick={() => setShowModal(true)}
          >
            Confirmar presença
          </button>
        </div>
      </div>
      <ConfirmModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default InvitePage;
