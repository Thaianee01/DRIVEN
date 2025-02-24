const UUID = '980b2502-0ce6-40f7-be85-66b3806860d0'; // UUID da sala do chat

// URLs da API com o UUID
const URL_ENTRAR = `https://mock-api.driven.com.br/api/v6/uol/participants/${UUID}`;
const URL_STATUS = `https://mock-api.driven.com.br/api/v6/uol/status/${UUID}`;
const URL_MENSAGENS = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;
const URL_ENVIAR = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;

let nomeUsuario = "";
const usuario = { name: nomeUsuario };

function login() {
    nomeUsuario = document.querySelector(".login-input").value.trim();

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
        .catch(error => { // Certifique-se de que 'error' está definido aqui
            if (error.response && error.response.status === 400) {
                alert('Nome já em uso. Tente outro nome.');
            } else {
                console.error('Erro ao entrar na sala:', error);
                alert('Erro ao entrar na sala. Tente novamente.');
            }
        });
    
    iniciarChat() //layout em arquivo separado
}

function manterConexao() {
    axios.post(URL_STATUS, usuario)
        .then(() => console.log(`Status de ${usuario.name} mantido ativo.`))
        .catch(error => {
            console.error('Erro ao manter conexão:', error);
            alert('Erro ao manter conexão. Tente recarregar a página.');
        });
}

function buscarMensagens() {
    axios.get(URL_MENSAGENS)
        .then(response => {
            const mensagens = response.data;
            exibirMensagens(mensagens);
        })
        .catch(error => console.error('Erro ao buscar mensagens:', error));
    
    console.log(response.data)
}

function buscarMensagens() {
    axios.get(URL_MENSAGENS)
        .then(response => { 
            console.log(response.data); // Verifica os dados recebidos
            const mensagens = response.data;
            exibirMensagens(mensagens);
        })
        .catch(error => { // Certifique-se de que 'error' está definido aqui
            console.error('Erro ao buscar mensagens:', error);
        });
}

function exibirMensagens(mensagens) {
    const messagesContainer = document.querySelector(".messages-container"); 
    messagesContainer.innerHTML = "";
    mensagens.forEach(mensagem => {
        if (deveExibirMensagem(mensagem)) {
            const messageElement = criarElementoMensagem(mensagem);
            messagesContainer.appendChild(messageElement);
        }
        console.log(mensagens);
    });


    rolarParaFinal();
}

function deveExibirMensagem(mensagem) {
    return !(
        mensagem.type === 'private_message' && 
        mensagem.to !== nomeUsuario && 
        mensagem.from !== nomeUsuario
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

function rolarParaFinal() {
    const messagesContainer = document.querySelector(".messages-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}





