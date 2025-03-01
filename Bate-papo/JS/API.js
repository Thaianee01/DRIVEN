const UUID = '058a144e-4f75-4f88-b504-a3063a8264a5'; // UUID da sala do chat

// URLs da API
const URL_ENTRAR = `https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`;
const URL_STATUS = `https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`;
const URL_MENSAGENS = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;
const URL_ENVIAR = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;
const URL_PARTICIPANTES = `https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`;

let nomeUsuario = "";
const usuario = { name: nomeUsuario };
let visibilidade = "Público"; // Inicialização com "Público" como padrão
let destinatario = "Todos"; // Inicialização com "Todos" como padrão

//-------------------------------------------------------------------------------------------------------Login
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
            buscarParticipantes(); // Busca os participantes imediatamente após o login
            setInterval(manterConexao, 5000); // Mantém a conexão ativa
            setInterval(buscarMensagens, 3000); // Atualiza as mensagens a cada 3 segundos
            setInterval(buscarParticipantes, 3000); // Atualiza a lista de participantes a cada 3 segundos

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
    selecionarPadroes(); //Seleciona Todos e Publico ao iniciar o chat
}

//-----------------------------------------------------------------------------------------------Menu de contatos
function atualizarListaContatos(participantes) {
    const contatosList = document.querySelector('.contatos-list');
    contatosList.innerHTML = ""; // Limpa a lista atual

    // Adiciona o item "Todos" como primeiro contato
    const todosItem = document.createElement('li');
    todosItem.classList.add('contato-item');
    todosItem.innerHTML = `
        <div class="icon-text-group">
            <ion-icon name="people-sharp"></ion-icon>
            <span>Todos</span>
        </div>
        <ion-icon name="checkmark" class="checkmark"></ion-icon>
    `;
    todosItem.onclick = () => selecionarDestinatario(todosItem, 'Todos');
    contatosList.appendChild(todosItem);

    // Adiciona os demais participantes
    participantes.forEach(participante => {
        if (participante.name !== nomeUsuario) { // Não adiciona o próprio usuário
            const contatoItem = document.createElement('li');
            contatoItem.classList.add('contato-item');
            contatoItem.innerHTML = `
                <div class="icon-text-group">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <span>${participante.name}</span>
                </div>
                <ion-icon name="checkmark" class="checkmark"></ion-icon>
            `;
            contatoItem.onclick = () => selecionarDestinatario(contatoItem, participante.name);
            contatosList.appendChild(contatoItem);
        }
    });
}
//--------------------------------------------------------------------------------------------------Barra Lateral
function toggleSidebar() {
    const asideElement = document.getElementById("sidebar");
    const overlayElement = document.getElementById("overlay"); 

    asideElement.classList.toggle("active"); 
    overlayElement.classList.toggle("active");
}

// Função para selecionar automaticamente "Todos" e "Público" após o login
function selecionarPadroes() {
    const itemTodos = document.querySelector('#contatos-list .contato-item');
    const itemPublico = document.querySelector('.visibilidade-item');

    if (itemTodos) {
        selecionarDestinatario(itemTodos, 'Todos');
    }

    if (itemPublico) {
        selecionarVisibilidade(itemPublico);
    }
}

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
    console.log(`Usuário ${destinatario} selecionado`);

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
            exibirMensagem(mensagens);
        })
        .catch(error => {
            console.error('Erro ao buscar mensagens:', error);
        });
}

//---------------------------------------------------------------------------------------------------- Exibir Mensagens
function exibirMensagem(mensagens) {
    const messagesContainer = document.querySelector(".messages-container"); 
    messagesContainer.innerHTML = "";
    mensagens.forEach(mensagem => {
        if (filtro(mensagem)) {
            const messageElement = criarElementoMensagem(mensagem);
            messagesContainer.appendChild(messageElement);
        }
    });

    scroll();
}

function enviarMensagem() {
    const messageInput = document.getElementById('message-input');
    const texto = messageInput.value;

    if (!texto) return;
    console.log("Visibilidade selecionada:", visibilidade);
    console.log(texto);
    const mensagem = {
        from: nomeUsuario,
        to: destinatario,
        text: texto,
        type: visibilidade === "Privado" ? "private_message" : "message"
    };

    axios.post(URL_ENVIAR, mensagem, {
        headers: {
            'Content-Type': 'application/json' // Adiciona o cabeçalho necessário
        }
    })
    .then(() => {
        messageInput.value = ''; // Limpa o input
        buscarMensagens(); // Atualiza as mensagens
    })
    .catch(error => {
        console.error('Erro ao enviar mensagem:', error);
        alert('Erro ao enviar mensagem. Verifique os dados e tente novamente.');
    });
}

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
        elemento.classList.add('status-message');
    } else if (tipoMensagem === 'private_message') {
        elemento.classList.add('private-message');
    } else {
        elemento.classList.add('normal-message');
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
    const Container = document.querySelector(".chat-box");
    Container.scrollTop = Container.scrollHeight;
}

//------------------------------------------------------------------------------------------- Buscar Participantes
function buscarParticipantes() {
    axios.get(URL_PARTICIPANTES)
        .then(response => {
            const participantes = response.data;
            atualizarListaContatos(participantes); // Atualiza a lista de contatos
        })
        .catch(error => {
            console.error('Erro ao buscar participantes:', error);
        });
}