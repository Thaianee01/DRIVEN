const UUID = 'efe2f372-db66-48fc-ae9b-b8fa0a527694'; // UUID da sala do chat

// URLs da API
const URL_ENTRAR = `https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`;
const URL_STATUS = `https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`;
const URL_MENSAGENS = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;
const URL_ENVIAR = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;

let nomeUsuario = "";
const usuario = { name: nomeUsuario };
let visibilidade = "Público"; // Inicialização com "Público" como padrão
let destinatario = "Todos"; // Inicialização com "Todos" como padrão

//-----------------------------------------------------------------------------------------------Login
function login() {
    nomeUsuario = document.getElementById('nome').value;

    if (!nomeUsuario) {
        alert("Por favor, digite seu nome.");
        return;
    }

    usuario.name = nomeUsuario;
    entrarNaSala(usuario);
}

function entrarNaSala(usuario) {
    axios.post(URL_ENTRAR, usuario)
        .then(() => {
            console.log(`Usuário ${usuario.name} entrou na sala.`);
            manterConexao();
            buscarMensagens(); 

            // Mantém a conexão e busca mensagens em intervalos regulares
            setInterval(manterConexao, 5000);
            setInterval(buscarMensagens, 3000);
            iniciarChat();
        })
        .catch(error => { 
            if (error.response && error.response.status === 400) {
                alert('Nome já em uso. Tente outro nome.');
            } else {
                console.error('Erro ao entrar na sala:', error);
                alert('Erro ao entrar na sala. Tente novamente.');
            }
        });
}

function iniciarChat() {
    const loginScreen = document.getElementById("login");
    const chatScreen = document.getElementById("chat");

    loginScreen.style.display = "none";
    chatScreen.style.display = "block";
}

//-----------------------------------------------------------------------------------------------Menu de contatos
function toggleSidebar() {
    const aside = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay"); 

    aside.classList.toggle("active"); 
    overlay.classList.toggle("active");
}

window.onload = function() {
    // Seleciona o item "Todos" automaticamente ao carregar a página
    const todos = document.querySelector('.contato-item'); 
    todos.classList.add('selecionado');
    todos.querySelector('.checkmark').classList.add('selecionado');

    const publico = document.querySelector('.visibilidade-item');
    publico.classList.add('selecionado');
    publico.querySelector('.checkmark').classList.add('selecionado');
};

// Função de seleção de destinatário
function selecionarDestinatario(elemento, nome) {
    const contatos = document.querySelectorAll('.contato-item');
    contatos.forEach(item => {
        item.classList.remove('selecionado');
        item.querySelector('.checkmark').classList.remove('selecionado');
    });

    // Marca o item clicado como selecionado
    elemento.classList.add('selecionado');
    elemento.querySelector('.checkmark').classList.add('selecionado');

    // Atualiza o destinatário selecionado
    destinatario = nome;
    console.log (`Usuário ${destinatario} selecionado`)

    // Atualiza a frase do destinatário com base no nome selecionado
    atualizarFrase(destinatario, visibilidade);
}

// Função de seleção de visibilidade
function selecionarVisibilidade(element) {
    const visibilidadeItems = document.querySelectorAll('.visibilidade-item');
    visibilidadeItems.forEach(item => {
        item.classList.remove('selecionado');
        item.querySelector('.checkmark').classList.remove('selecionado');
    });

    // Marca o item clicado como selecionado
    element.classList.add('selecionado');
    element.querySelector('.checkmark').classList.add('selecionado');

    // Atualiza a visibilidade selecionada
    visibilidade = element.querySelector('span').innerText;

    // Atualiza a frase de destinatário e visibilidade selecionados
    atualizarFrase(destinatario, visibilidade);
}

// Função para atualizar a frase informativa
function atualizarFrase(destinatario, visibilidade) {
    const frase = document.querySelector("#personalized-message");
    frase.innerText = `Enviando para ${destinatario} (${visibilidade})`;
}

//-----------------------------------------------------------------------------------------------------Status da Conexão
function manterConexao() {
    axios.post(URL_STATUS, usuario)
        .then(() => {
            console.log(`Status de ${usuario.name} mantido ativo.`);
        })
        .catch(error => {
            console.error('Erro ao manter conexão:', error);
            alert('Erro ao manter conexão. Tente recarregar a página.');
        });
}
//------------------------------------------------------------------------------------------- Buscar Mensagens
function buscarMensagens() {
    axios.get(URL_MENSAGENS)
        .then(response => {
            console.log("Mensagens recebidas:", response.data);
            const mensagens = response.data;
            exibirMensagem(mensagens); // Exibe mensagens após o filtro
        })
        .catch(error => {
            console.error('Erro ao buscar mensagens:', error);
        });
}

//------------------------------------------------------------------------------------------- Enviar Mensagem
function exibirMensagem(mensagens) {
    const Container = document.getElementById("messages-container");
    Container.innerHTML = ""; // Limpa as mensagens anteriores

    mensagens.forEach(mensagem => {
        // Filtro para mensagens públicas ou privadas destinadas ao usuário logado
        if (mensagem.type === "message" || 
            (mensagem.type === "private_message" && 
             (mensagem.to === usuario.name || mensagem.from === usuario.name))) {
            
            const mensagemElement = document.createElement("div");
            mensagemElement.classList.add("message");

            // Adiciona classe específica para mensagens privadas
            if (mensagem.type === "private_message") {
                mensagemElement.classList.add("private-message");
            }

            // Formatação da mensagem
            mensagemElement.innerHTML = `
                <span class="from">${mensagem.from}</span>
                <span class="to">para ${mensagem.to}:</span>
                <span class="text">${mensagem.text}</span>
                <span class="time">${new Date(mensagem.time).toLocaleTimeString()}</span>
            `;

            Container.appendChild(mensagemElement);
        }
    });

    // Rolagem automática para a última mensagem
    Container.scrollTop = Container.scrollHeight;
}


salvaaaaaaaaaaaaar
<aside class="sidebar" id ="sidebar">
        <div class="contatos">
            <h2>Escolha um contato para enviar mensagem:</h2>
            <div class="contato-item" onclick="selecionarDestinatario(this, 'Todos')">
                <div class="icon-text-group">
                    <ion-icon name="people-sharp"></ion-icon>
                    <span>Todos</span>
                </div>
                <ion-icon name="checkmark" class="checkmark"></ion-icon>
            </div>

            <div class="contato-item" onclick="selecionarDestinatario(this, 'Maria')">
                <div class="icon-text-group">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <span>Maria</span>
                </div>
                <ion-icon name="checkmark" class="checkmark" ></ion-icon>
            </div>

            <div class="contato-item" onclick="selecionarDestinatario(this, 'João')">
                <div class="icon-text-group">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <span>João</span>
                </div>
                <ion-icon name="checkmark" class="checkmark"></ion-icon>
            </div>
        </div>