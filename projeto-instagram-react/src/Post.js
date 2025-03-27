import React from "react";

export default function Post({ post, onToggleSalvo, onToggleCurtido, onImageClick }) {
    
    const formatarLikes = (likes) => {
        return likes.toLocaleString("pt-BR");
    };

    return (
        <div className="post">
            <div className="topo">
                <div className="usuario">
                    <img src={post.imagem} alt={post.usuario} />
                    {post.usuario}
                </div>
            </div>

            <div className="conteudo" onClick={onImageClick}>
                <img src={post.conteudo} alt={`Post de ${post.usuario}`} />
            </div>

            <div className="fundo">
                <div className="acoes">
                    <div>
                        <ion-icon
                            name={post.curtido ? "heart" : "heart-outline"}
                            onClick={onToggleCurtido}
                            style={{ color: post.curtido ? "red" : "black" }}
                        ></ion-icon>
                        <ion-icon name="chatbubble-outline"></ion-icon>
                        <ion-icon name="paper-plane-outline"></ion-icon>
                    </div>
                    <div onClick={onToggleSalvo}>
                        <ion-icon
                            name={post.salvo ? "bookmark" : "bookmark-outline"}
                        ></ion-icon>
                    </div>
                </div>

                <div className="curtidas">
                    <img src={post.curtidas.imagemPerfil} alt={post.curtidas.perfil} />
                    <div className="texto">
                        Curtido por <strong>{post.curtidas.perfil}</strong> e
                        <strong> outras {formatarLikes(post.curtidas.likes)} pessoas</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}