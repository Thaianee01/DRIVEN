const UUID = '109048d3-3adb-4067-baf6-23582572ce93'; // UUID da sala do chat

// URLs da API
const URL_ENTRAR = `https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`;
const URL_STATUS = `https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`;
const URL_MENSAGENS = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;
const URL_ENVIAR = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;

let nomeUsuario = "";
const usuario = { name: nomeUsuario };

//-----------------------------------------------------------------------------------------------Login
function login() {
    nomeUsuario = document.getElementById('nome').value.trim();

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

    iniciarChat();
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

function selecionarDestinatario(elemento, destinatario) {
    // Remove a classe 'selecionado' de todos os itens
    const todosItens = document.querySelectorAll('.contato-item');
    todosItens.forEach(item => {
        item.classList.remove('selecionado');
    });

    // Adiciona a classe 'selecionado' apenas ao item clicado
    elemento.classList.add('selecionado');

    // Aqui você pode adicionar a lógica para selecionar o destinatário
    console.log('Destinatário selecionado:', destinatario);
}

// function selecionarDestinatario(element, nome) {
    //limparSelecoes(".contato-item");
    //element.classList.add("selected");
    //console.log(`Destinatário selecionado: ${nome}`);

//antes do chatgpt
    
window.onload = function() {
    // Seleciona o item "Todos" automaticamente ao carregar a página
    const todos = document.querySelector('.contato-item'); //seleciona o primeiro
    todos.classList.add('selecionado');
    todos.querySelector('.checkmark').classList.add('selecionado');

    const publico = document.querySelector('.visibilidade-item');
    publico.classList.add('selecionado');
    publico.querySelector('.open').classList.add('selecionado');
};


function selecionarDestinatario(elemento, nome) {
    const contatos = document.querySelectorAll('.contato-item');
    contatos.forEach(item => {
        item.classList.remove('selecionado');
        item.querySelector('.checkmark').classList.remove('selecionado');
    });

    // Marca o item clicado como selecionado
    elemento.classList.add('selecionado');
    elemento.querySelector('.checkmark').classList.add('selecionado');

}


aaaaaaaaaaaaaaaaaa
function enviarMensagem() {
    const messageInput = document.getElementById('message-input');
    const texto = messageInput.value;
    if (!texto) return;

    const destinatario = document.querySelector(".contato-item.selecionado")?.textContent || 'Todos';
    
    let type;

    if (destinatario === 'Todos') {
        type = 'message';
    } else {
        type = 'private_message';
    }

    const mensagem = {
        from: nomeUsuario,
        to: destinatario,
        text: texto,
        type: type
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
    });

    scroll();
}
















function selecionarVisibilidade(element, visibilidade) {
    const publico = document.querySelector('.visibilidade-item'); //seleciona o primeiro
    publico.classList.add('selecionado');
    publico.querySelector('.open').classList.add('selecionado');


    limparSelecoes(".visibilidade-item");
    element.classList.add("selected");
    console.log(`Visibilidade selecionada: ${visibilidade}`);
}

function limparSelecoes(selector) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove("selected"));
}




//Deixa selecionado previamente todos os contatos
function Todos() {
    const contatos = document.querySelectorAll('.contato-item');
    if (contatos) {
        contatos.classList.add('selecionado');
        console.log('Primeiro destinatário selecionado.');
    }
}
function selecionarDestinatario(elemento, destinatario) {
    const todosItens = document.querySelectorAll('.contato-item');
    todosItens.forEach(item => {
        item.classList.remove('selecionado');
    });

    // Adiciona a classe 'selecionado' ao item clicado
    elemento.classList.add('selecionado');

    // Aqui você pode adicionar a lógica para selecionar o destinatário
    console.log('Destinatário selecionado:', destinatario);
}

function selecionarVisibilidade(element, visibilidade) {
    limparSelecoes(".visibilidade-item");
    element.classList.add("selected");
    console.log(`Visibilidade selecionada: ${visibilidade}`);
}

function limparSelecoes(selector) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove("selected"));
}


function selecionarVisibilidade(element, visibilidade) {
    limparSelecoes(".visibilidade-item");
    element.classList.add("selected");
    console.log(`Visibilidade selecionada: ${visibilidade}`);
}

function limparSelecoes(selector) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove("selected"));
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
    const texto = messageInput.value.trim();
    const destinatario = document.querySelector(".contato-item.selected")?.textContent || 'Todos';

    if (!texto) return;

    const mensagem = {
        from: nomeUsuario,
        to: destinatario,
        text: texto,
        type: destinatario === 'Todos' ? 'message' : 'private_message'
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
    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}



//codigo antigo 


//----------------------------------------------------------------------------------------------- Filtrar mensagens
// Função de filtro para verificar o status da mensagem
function filtro(mensagem) {
    const statusSelecionado = document.querySelector('.visibilidade-item.selecionado span').innerText;

    // Filtra mensagens privadas, públicas ou status, dependendo da seleção
    if (statusSelecionado === 'Todos') {
        return true; // Exibe todas as mensagens
    } else if (statusSelecionado === 'Público' && mensagem.type !== 'private_message') {
        return true; // Exibe mensagens públicas (não privadas)
    } else if (statusSelecionado === 'Reservado' && mensagem.type === 'private_message') {
        return true; // Exibe mensagens privadas
    } else if (statusSelecionado === 'Status' && mensagem.type === 'status') {
        return true; // Exibe mensagens de status
    }

    return false; // Se não se enquadrar em nenhum filtro, não exibe a mensagem
}


function enviarMensagem() {
    const messageInput = document.getElementById('message-input');
    const texto = messageInput.value;
    const destinatarioInput = document.getElementById('destinatario-input');
    const destinatario = destinatarioInput.value || 'Todos'; // Certifique-se de ter o ID correto para o input de destinatário

    if (!texto) return;

    const mensagem = {
        from: nomeUsuario,  // Certifique-se de que `nomeUsuario` está definido corretamente
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

function filtro(mensagem) {
    // Adicione os filtros específicos aqui, se necessário
    return true;
}

function criarElementoMensagem(mensagem) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Adicione o conteúdo e o estilo aqui
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
    const textoElemento = document.createElement('p');
    textoElemento.textContent = mensagem.text;
    elemento.appendChild(textoElemento);
}

function scroll() {
    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
