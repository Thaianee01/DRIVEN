import React, { useState } from "react";

export default function User() {
  const [name, setName] = useState("catanacomics");
  const [perfil, setPerfil] = useState("assets/catanacomics.svg");

  // Função para alterar o nome
  const ChangeName = () => {
    const newName = prompt("Digite o nome de usuário:");
    if (newName !== "") { 
      setName(newName); 
    }
  };

  // Função para alterar a imagem do perfil ao clicar na imagem
  const ChangePerfil = () => {
    const newPerfil = prompt("Digite o link da imagem do seu perfil:");
    if (newPerfil !== "") { 
      setPerfil(newPerfil);
    }
  };

  return (
    <div className="usuario">
      <img onClick={ChangePerfil} src={perfil} alt="imagem de perfil"/>
      <div className="texto">
        <span>
          <strong>{name}</strong>
          <ion-icon name="pencil" onClick={ChangeName} ></ion-icon>
        </span>
      </div>
    </div>
  );
}