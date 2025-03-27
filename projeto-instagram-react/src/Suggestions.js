import React from 'react';
import Suggestion from './Suggestion';

export default function Suggestions() {
    // Array de sugestões
    const recommended = [
        { user: "bad.vibes.memes", reason: "Segue você" },
        { user: "chibirdart", reason: "Segue você" },
        { user: "smallcutecats", reason: "Segue você" }
    ];

    return (
        <div className="sidebar">
            <div className="sugestoes">
                <div className="titulo">
                    Sugestões para você
                    <div>Ver tudo</div>
                </div>
                <Suggestion props={recommended} />
            </div>

            <div className="links">
                Sobre • Ajuda • Imprensa • API • Carreiras • Privacidade • Termos •
                Localizações • Contas mais relevantes • Hashtags • Idioma
            </div>
            <div className="copyright">© 2023 INSTAGRAM DO FACEBOOK</div>
        </div>
    );
}