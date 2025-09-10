import React, { useState, useEffect } from "react";
import "./GiftList.css";
import GiftForm from "./GiftForm";
import { db } from "../firebase";
import { setDoc, doc, collection, getDocs, onSnapshot } from "firebase/firestore";

const listaPresentes = [
    {
        categoria: "🍴 Cozinha",
        itens: [
            "Jogo de facas",
            "Jogo de pratos Nadir Saturno",
            "Jogo de panelas",
            "Jogo de talheres",
            "Descascador de legumes e Espremedor de limão",
            "Assadeiras antiaderentes",
            "Forma de bolo",
            "Forma de bolo",
            "Panela de pressão",
            "Leiteira e Coadores",
            "Porta temperos",
            "Pimenteiro e Moedor de pimenta",
            "Rolo para abrir massa e Fouet",
            "Bacia para lavar frutas",
            "Bacia para lavar frutas",
            "Petisqueira e Porta frios",
            "Bandeja grande e luva térmica",
            "Descanso de panela e Jogo americano",
            "Taças de sorvete",
            "Frigideira",
            "Refratário com tampa",
            "Refratário com tampa",
            "Garrafa térmica",
            "Garrafa de água (vidro)",
        ],
    },
    {
        categoria: "🛁 Banheiro",
        itens: [
            "Kit para pia do banheiro",
            "Escova de vaso sanitário"
        ],
    },
    {
        categoria: "🛏️ Quarto",
        itens: [
            "Jogos de cama com lençol de elástico",
            "Toalhas de banho e toalhas de rosto",
            "Toalhas de banho e toalhas de rosto",
            "Tapete para o lado da cama",
            "Cabides de veludo",
        ],
    },
    {
        categoria: "🛋️ Sala e Decoração",
        itens: [
            "Tapete sala",
            "Tapetes para pia",
            "Tapetes para fogão",
            "Toalha de mesa",
            "Cortina",
            "Jogos de passadeira",
        ],
    },
];

const coresPorCategoria = {
  "🍴 Cozinha": {
    cssClass: "cozinha",
    texto: "Verde-Musgo | Off-White"
  },
  "🛁 Banheiro": {
    cssClass: "banheiro",
    texto: "Off-White"
  },
  "🛏️ Quarto": {
    cssClass: "quarto",
    texto: "Cinza | Preto | Branco"
  },
  "🛋️ Sala e Decoração": {
    cssClass: "sala",
    texto: "Verde-Musgo | Bege"
  },
};


function GiftList({ onBack }) {
    const [itens, setItens] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [openCats, setOpenCats] = useState([]);
    // Adiciona um novo estado para controlar a visibilidade do pop-up
    const [showPixPopup, setShowPixPopup] = useState(false);

    // -- POPULAR O FIRESTORE SE ESTIVER VAZIO --
    useEffect(() => {
        async function seedBanco() {
            const snapshot = await getDocs(collection(db, "presentes"));
            if (snapshot.empty) {
                let count = 0;
                listaPresentes.forEach(cat => {
                    cat.itens.forEach(item => {
                        setDoc(doc(db, "presentes", (count++).toString()), {
                            nome: item,
                            categoria: cat.categoria,
                            reservadoPor: ""
                        });
                    });
                });
                alert("Banco populado! Atualize a página.");
            }
        }
        seedBanco();
    }, []);

    // -- LÊ OS ITENS DO FIRESTORE EM TEMPO REAL --
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "presentes"), (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setItens(docs);
        });
        return () => unsub();
    }, []);

    const toggleCategoria = (cat) => {
        setOpenCats((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const handleReservar = (item) => setItemSelecionado(item);

    // Nova função para copiar a chave Pix e mostrar o pop-up
    const handleCopyPix = () => {
        const pixKey = "177.476.937-96";
        navigator.clipboard.writeText(pixKey)
            .then(() => {
                setShowPixPopup(true);
                // Oculta o pop-up após 2 segundos
                setTimeout(() => {
                    setShowPixPopup(false);
                }, 2000);
            })
            .catch(err => {
                console.error("Erro ao copiar a chave Pix: ", err);
                alert("Ocorreu um erro ao copiar a chave. Por favor, tente novamente.");
            });
    };

    const categoriasUnicas = Array.from(new Set(itens.map(item => item.categoria)));
    const itensPorCategoria = categoriasUnicas.map((categoria) => ({
        categoria,
        itens: itens.filter((i) => i.categoria === categoria),
    }));

    return (
        <div className="gift-list-container">
            <h2>Lista de Presentes</h2>
            <div className="accordion-lista">
                {itensPorCategoria.map((cat, catIdx) => (
                    <div key={catIdx} className="accordion-item">
                        <button
                            className={`accordion-cabecalho ${openCats.includes(cat.categoria) ? "open" : ""}`}
                            onClick={() => toggleCategoria(cat.categoria)}
                        >
                            <span>{cat.categoria}</span>
                            <span className="arrow">
                                {openCats.includes(cat.categoria) ? "▲" : "▼"}
                            </span>
                        </button>
                        {openCats.includes(cat.categoria) && (
                            <ul className="accordion-conteudo">
                                {cat.itens
                                    .filter((item) => !item.reservadoPor)
                                    .map((item, idx) => (
                                        <li key={item.nome + idx}>
                                            <span>{item.nome}</span>
                                            <button
                                                onClick={() => handleReservar(item)}
                                            >
                                                Quero Presentear
                                            </button>
                                        </li>
                                    ))}
                                {cat.itens.filter((item) => !item.reservadoPor).length === 0 && (
                                    <li className="tudo-reservado">
                                        Todos os presentes dessa categoria já foram escolhidos! 🎁
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* --- Bloco do PIX --- */}
            <div className="pix-card">
                <h3>Quer ajudar com um Pix?</h3>
                <p>
                    Se preferir, você pode contribuir para nosso novo lar via Pix ❤️
                </p>
                <div className="pix-key-box">
                    <span className="pix-key">177.476.937-96 | Lucas Canuto</span>
                    <button
                        className="pix-copy"
                        // Chama a nova função de copiar
                        onClick={handleCopyPix}
                    >
                        Copiar
                    </button>
                </div>
            </div>
            
            <button className="btn-back" onClick={onBack}>← Voltar para o convite</button>

            <GiftForm
                open={itemSelecionado !== null}
                onClose={() => setItemSelecionado(null)}
                item={itemSelecionado}
                categoriaCor={itemSelecionado ? coresPorCategoria[itemSelecionado.categoria].cssClass : null}
                corTexto={itemSelecionado ? coresPorCategoria[itemSelecionado.categoria].texto : null}
            />

            {/* Adiciona o pop-up de sucesso do Pix */}
            {showPixPopup && (
                <div className="pix-popup-container">
                    <div className="pix-popup">
                        <p>Chave Pix copiada com sucesso! 🎉</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GiftList;