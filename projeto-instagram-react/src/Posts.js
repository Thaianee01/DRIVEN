import React, { useState } from "react";
import Post from "./Post";

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
            curtidas: {perfil: "adorable_animals", imagemPerfil: "assets/adorable_animals.svg", likes: 99159 },
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

    // Função para curtir/descurtir ao clicar na imagem do post
    const imageClick = (index) => {
        const novosPosts = [...posts];
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

    // Retorno JSX (Dentro da função Posts!)
    return (
        <div className="posts">
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post}
                    onToggleSalvo={() => toggleSalvo(index)}
                    onToggleCurtido={() => toggleCurtido(index)}
                    onImageClick={() => imageClick(index)}
                />
            ))}
        </div>
    );
}