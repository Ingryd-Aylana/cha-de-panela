import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import InvitePage from './components/InvitePage';
import GiftList from './components/GiftList';
import AdminRoute from './components/AdminRoute'; // Agora usando proteção
// import AdminView from './components/AdminView'; // Não importa mais direto aqui

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública (Landing page + lista) */}
        <Route path="/" element={<PublicHome />} />

        {/* Rota protegida do admin */}
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

// Página pública (convite + lista de presentes)
function PublicHome() {
  const [showList, setShowList] = React.useState(false);

  return (
    <>
      {!showList && <InvitePage onSeeGifts={() => setShowList(true)} />}
      {showList && <GiftList onBack={() => setShowList(false)} />}
    </>
  );
}


export default App;
