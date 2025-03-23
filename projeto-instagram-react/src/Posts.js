import React, { useState } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([
        {
            usuario: "meowed",
            imagem: "assets/meowed.svg",
            conteudo: "assets/gato-telefone.svg",
            salvo: false, // Começa como "não salvo"
            curtido: false, // Começa como "post não curtido"
            curtidas: { perfil: "respondeai", imagemPerfil: "assets/respondeai.svg", likes: 101523 },
        },

        {
            usuario: "barked",
            imagem: "assets/barked.svg",
            conteudo: "assets/dog.svg",
            salvo: false, // Começa como "não salvo"
            curtido: false, // Começa como "post não curtido"
            curtidas: { perfil: "adorable_animals", imagemPerfil: "assets/adorable_animals.svg", likes: 99159 },
        },

        {
            usuario: "meowed",
            imagem: "assets/meowed.svg",
            conteudo: "assets/gato-telefone.svg",
            salvo: false, // Começa como "não salvo"
            curtido: false, // Começa como "post não curtido"
            curtidas: { perfil: "smallcutecats", imagemPerfil: "assets/smallcutecats.svg", likes: 85000 },
        },
    ]);

    // Função para alternar entre "salvo" e "não salvo"
    const toggleSalvo = (index) => {
        const novosPosts = [...posts]; // Cria uma cópia da lista de posts
        novosPosts[index].salvo = !novosPosts[index].salvo; // Inverte o estado "salvo" do post clicado
        setPosts(novosPosts); // Atualiza a lista de posts com a nova versão
    };

    // Função para curtir/descurtir um post
    const toggleCurtido = (index) => {
        const novosPosts = [...posts]; // Cria uma cópia da lista de posts
        const post = novosPosts[index];

        // Alterna o estado de curtida
        post.curtido = !post.curtido;

        // Atualiza o número de likes
        if (post.curtido) {
            post.curtidas.likes += 1; // Adiciona um like
        } else {
            post.curtidas.likes -= 1; // Remove um like
        }

        setPosts(novosPosts);
    };

    // Função para curtir ao clicar na imagem do post
    const curtirPelaImagem = (index) => {
        const novosPosts = [...posts];
        const post = novosPosts[index];

        // Só curte se o post não estiver curtido
        if (!post.curtido) {
            post.curtido = true;
            post.curtidas.quantidade += 1; // Adiciona um like
            setPosts(novosPosts);
        }
    };

    const formatarLikes = (likes) => {
        return likes.toLocaleString("pt-BR"); // Formata o número com pontos de milhar
    };


    return (
        <div className="posts">
            {posts.map((post, index) => (
                <div key={index} className="post">
                    <div className="topo">
                        <div className="usuario">
                            <img src={post.imagem} alt={post.usuario} />
                            {post.usuario}
                        </div>
                    </div>

                    <div className="conteudo" onClick={() => curtirPelaImagem(index)}>
                        <img src={post.conteudo} alt={`Post de ${post.usuario}`} />
                    </div>

                    <div className="fundo">
                        <div className="acoes">
                        <div>
                            <ion-icon
                                name={post.curtido ? "heart" : "heart-outline"}
                                onClick={() => toggleCurtido(index)}
                                style={{ color: post.curtido ? "red" : "black" }}
                            ></ion-icon>
                            <ion-icon name="chatbubble-outline"></ion-icon>
                            <ion-icon name="paper-plane-outline"></ion-icon>
                        </div>
                        <div onClick={() => toggleSalvo(index)}>
                            <ion-icon
                                name={post.salvo ? "bookmark" : "bookmark-outline"}
                            ></ion-icon>
                        </div>
                    </div>

                        <div className="curtidas">
                            <img src={post.curtidas.imagemPerfil} alt={post.curtidas.perfil} />
                            <div className="texto">
                                Curtido por <strong>{post.curtidas.perfil}</strong> e{" "}
                                <strong>outras {formatarLikes(post.curtidas.likes)} pessoas</strong>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}