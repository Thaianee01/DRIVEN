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
    
            {recommended.map((r) => (
              <div className="sugestao" key={r.user}>
                <div className="usuario">
                  <img src={`assets/${r.user}.svg`} alt={r.user} />
                  <div className="texto">
                    <div className="nome">{r.user}</div>
                    <div className="razao">{r.reason}</div>
                  </div>
                </div>
                <div className="seguir">Seguir</div>
              </div>
            ))}
          </div>
    
          <div className="links">
            Sobre • Ajuda • Imprensa • API • Carreiras • Privacidade • Termos •
            Localizações • Contas mais relevantes • Hashtags • Idioma
          </div>
          <div className="copyright"> © 2023 INSTAGRAM DO FACEBOOK </div>
        </div>
      );
    }