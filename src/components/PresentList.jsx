// src/components/PresentList.jsx
import React, { useState, useEffect } from "react";
import GiftForm from "./GiftForm";
import { db } from "../firebase";
import { collection, setDoc, doc, onSnapshot, getDocs } from "firebase/firestore";
import "./GiftList.css";

const listaPresentes = [ /* ...mesmo array das listas anteriores... */ ];

const getEstadoInicial = () => {
  let arr = [];
  listaPresentes.forEach((cat) =>
    cat.itens.forEach((item) =>
      arr.push({ nome: item, categoria: cat.categoria, reservadoPor: "" })
    )
  );
  return arr;
};

function PresentList() {
  const [itens, setItens] = useState(getEstadoInicial());
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [openCats, setOpenCats] = useState([]);

  // Firebase sync
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "presentes"), (snapshot) => {
      if (snapshot.empty) {
        getEstadoInicial().forEach((item, idx) => {
          setDoc(doc(db, "presentes", idx.toString()), item);
        });
        setItens(getEstadoInicial());
      } else {
        const docs = snapshot.docs.map((doc) => doc.data());
        setItens(docs);
      }
    });
    return () => unsub();
  }, []);

  // Accordion
  const toggleCategoria = (cat) => {
    setOpenCats((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  // Agrupa por categoria
  const itensPorCategoria = listaPresentes.map((cat) => ({
    categoria: cat.categoria,
    itens: itens.filter((i) => i.categoria === cat.categoria),
  }));

  return (
    <div className="gift-list-container">
      <h2>Lista de Presentes</h2>
      <div className="accordion-lista">
        {itensPorCategoria.map((cat, catIdx) => (
          <div key={catIdx} className="accordion-item">
            <button
              className={`accordion-cabecalho ${
                openCats.includes(cat.categoria) ? "open" : ""
              }`}
              onClick={() => toggleCategoria(cat.categoria)}
            >
              <span>{cat.categoria}</span>
              <span className="arrow">
                {openCats.includes(cat.categoria) ? "▲" : "▼"}
              </span>
            </button>
            {openCats.includes(cat.categoria) && (
              <ul className="accordion-conteudo">
                {cat.itens.map((item, idx) => (
                  <li key={idx} className={item.reservadoPor ? "reservado" : ""}>
                    <span>{item.nome}</span>
                    {item.reservadoPor ? (
                      <span className="presenteador">
                        Reservado por: {item.reservadoPor}
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          setItemSelecionado(
                            itens.findIndex(
                              (i) =>
                                i.nome === item.nome &&
                                i.categoria === item.categoria
                            )
                          )
                        }
                      >
                        Quero Presentear
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {/* Modal de reserva */}
      <GiftForm
        open={itemSelecionado !== null}
        onClose={() => setItemSelecionado(null)}
        item={itemSelecionado !== null ? itens[itemSelecionado] : null}
        idx={itemSelecionado}
        setNomePresenteador={null}
        itens={itens}
        setItens={setItens}
      />
    </div>
  );
}

export default PresentList;
