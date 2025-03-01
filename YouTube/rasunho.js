
function enviarMensagem() {
    const messageInput = document.getElementById('message-input');
    const texto = messageInput.value;  

    // Verificar se o texto está vazio
    if (!texto) return;

    // Selecionar o destinatário
    const contatoSelecionado = document.querySelector('.contato-item.selecionado span');
    const destinatarioSelecionado = contatoSelecionado ? contatoSelecionado.innerText : 'Todos'; 

    // Determinar o tipo da mensagem
    const tipoMensagem = visibilidade === 'Público' ? 'message' : 'private_message';

    // Construir o objeto de mensagem
    const mensagem = {
        from: nomeUsuario, // Nome do usuário
        to: destinatarioSelecionado, // Destinatário
        text: texto, // Texto da mensagem
        type: tipoMensagem // Tipo de mensagem
    };

    // Substituir 'SEU_UUID' pelo UUID correto da sala
    const URL_ENVIAR = `https://mock-api.driven.com.br/api/v6/uol/messages/${UUID}`;

    // Enviar a mensagem via POST
    axios.post(URL_ENVIAR, mensagem)
        .then(() => {
            messageInput.value = ''; // Limpa o campo de entrada de texto
            buscarMensagens(); // Atualiza as mensagens após o envio
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        });
}



// Função de filtro para verificar o status da mensagem
function filtro(mensagem) {
    if (destinatario === 'Todos') {
        return true; // Exibe todas as mensagens
    } else if (visibilidade === 'Público' && mensagem.type !== 'private_message') {
        return true; // Exibe apenas mensagens públicas
    } else if (visibilidade === 'Privado' && mensagem.to === destinatario && mensagem.type === 'private_message') {
        return true; // Exibe apenas mensagens privadas para o destinatário selecionado
    } else if (visibilidade === 'Status' && mensagem.type === 'status') {
        return true; // Exibe apenas mensagens de status
    }

    return false; // Exclui a mensagem se não atender ao filtro
}

function exibirMensagem(mensagem) {
    const messagesContainer = document.querySelector('.messages-container');

    const mensagemElement = document.createElement('div');
    mensagemElement.classList.add('message');
    
    // Aplique a visibilidade correta com base no tipo de mensagem (público ou privado)
    if (mensagem.visibilidade === 'private_message') {
        mensagemElement.classList.add('private-message');
    } else {
        mensagemElement.classList.add('normal-message');
    }

    // Verificar destinatário e visibilidade para a filtragem
    if (mensagem.visibilidade === 'Todos' || destinatarioSelecionado === mensagem.destinatario) {
        mensagemElement.innerHTML = `<strong>${mensagem.autor}</strong>: ${mensagem.texto}`;
        messagesContainer.appendChild(mensagemElement);
    }
}

function atualizarChat() {
    // Limpar as mensagens antes de exibir as mensagens filtradas
    const messagesContainer = document.querySelector('.messages-container');
    messagesContainer.innerHTML = '';
    // Aqui você pode trazer novamente as mensagens filtradas para o chat
    // Se já tiver um histórico de mensagens, pode usar um array de objetos para filtrar
}