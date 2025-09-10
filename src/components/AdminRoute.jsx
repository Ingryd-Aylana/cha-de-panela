import React, { useState } from "react";
import AdminView from "./AdminView";
import './AdminRoute.css'; // Importe se criar arquivo separado, ou só use App.css

export default function AdminRoute() {
  const [autorizado, setAutorizado] = useState(false);
  const [senha, setSenha] = useState("");

  // Altere para a senha que você escolher!
  const senhaCorreta = "LC123";

  if (!autorizado) {
    return (
      <div className="admin-area-container">
        <h2>Acesse sua lista</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button
          onClick={() => {
            if (senha === senhaCorreta) setAutorizado(true);
            else alert("Senha incorreta!");
          }}
        >
          Entrar
        </button>
      </div>
    );
  }

  return <AdminView />;
}
