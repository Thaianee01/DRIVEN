const UUID = '7749bc8f-d169-4ca1-bf91-a8546fdf8c50'; // UUID da sala do chat

// URLs da API
const URL_ENTRAR = `https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`;
const URL_STATUS = `https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`;
const URL_MENSAGENS = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;
const URL_ENVIAR = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;

let nomeUsuario = "";
const usuario = { name: nomeUsuario };

//-----------------------------------------------------------------------------------------------Login
function login() {
    nomeUsuario = document.querySelector(".login-input").value;

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
            manterConexao(); // Inicia o loop de manter conexão
            buscarMensagens(); // Busca mensagens imediatamente
            setInterval(buscarMensagens, 3000); // Atualiza mensagens a cada 3 segundos
            setInterval(manterConexao, 5000); // Mantém conexão a cada 5 segundos
        })
        .catch(error => { 
            if (error.response && error.response.status === 400) {
                alert('Nome já em uso. Tente outro nome.');
            } else {
                console.error('Erro ao entrar na sala:', error);
                alert('Erro ao entrar na sala. Tente novamente.');
            }
        });

    iniciarChat()
}

function iniciarChat() {
    const loginScreen = document.getElementById("login");
    const chatScreen = document.getElementById("chat");

    loginScreen.style.display = "none";
    chatScreen.style.display = "block";
}

//-----------------------------------------------------------------------------------------------Menu de contatos

function toggleSidebar() {
    const asideElement = document.getElementById("sidebar");
    const overlayElement = document.getElementById("overlay"); 

    asideElement.classList.toggle("active"); 
    overlayElement.classList.toggle("active");
}

//-----------------------------------------------------------------------------------------------Status da Conexão

function manterConexao() {
    axios.post(URL_STATUS, usuario)
        .then(() => console.log(`Status de ${usuario.name} mantido ativo.`))
        .catch(error => {
            console.error('Erro ao manter conexão:', error);
            alert('Erro ao manter conexão. Tente recarregar a página.');
        });
}

//---------------------------------------------------------------------------------------------------- Mensagens

function enviarMensagem() {
    const messageInput = document.getElementById('message-input');
    const texto = messageInput.value;
    const destinatario = destinatarioInput.value || 'Todos';

    if (!texto) return;

    const mensagem = {
        from: nomeUsuario,
        to: destinatario,
        text: texto,
        type: 'message'
    };

    axios.post(URL_ENVIAR, mensagem)
        .then(() => {
            messageInput.value = ''; // Limpa o input
            buscarMensagens(); // Atualiza as mensagens
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        });
}

document.getElementById('send-btn').addEventListener('click', enviarMensagem);

function buscarMensagens() {
    axios.get(URL_MENSAGENS)
        .then(response => { 
            console.log(response.data);
            const mensagens = response.data;
            exibirMensagens(mensagens);
        })
        .catch(error => {
            console.error('Erro ao buscar mensagens:', error);
        });
}

function exibirMensagens(mensagens) {
    const messagesContainer = document.querySelector(".messages-container"); 
    messagesContainer.innerHTML = "";
    mensagens.forEach(mensagem => {
        if (filtro(mensagem)) {
            const messageElement = criarElementoMensagem(mensagem);
            messagesContainer.appendChild(messageElement);
        }
        console.log(mensagens);
    });

    scroll();
}

//----------------------------------------------------------------------------------------------- Filtrar mensagens
function filtro(mensagem) {
    return (
        mensagem.type !== 'private_message' || // Exibe mensagens públicas
        mensagem.to === nomeUsuario ||         // Exibe mensagens privadas destinadas ao usuário atual
        mensagem.from === nomeUsuario          // Exibe mensagens privadas enviadas pelo usuário atual
    );
}

function criarElementoMensagem(mensagem) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    aplicarEstilo(messageElement, mensagem.type);
    adicionarConteudoMensagem(messageElement, mensagem);

    return messageElement;
}

function aplicarEstilo(elemento, tipoMensagem) {
    if (tipoMensagem === 'status') {
        elemento.classList.add('status');
    } else if (tipoMensagem === 'private_message') {
        elemento.classList.add('reservada');
    } else {
        elemento.classList.add('normal');
    }
}

function adicionarConteudoMensagem(elemento, mensagem) {
    elemento.innerHTML = `
        <span class="time">[${mensagem.time}]</span>
        <span class="from">${mensagem.from}</span>
        <span class="to">para ${mensagem.to}:</span>
        <span class="text">${mensagem.text}</span>
    `;
}

function scroll() {
    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


