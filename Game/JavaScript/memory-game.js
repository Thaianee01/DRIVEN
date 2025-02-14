// Imagem de fundo das cartas (fechada)
const Background = "../Imagens/back.png";

// Lista de imagens disponíveis para as cartas (abertas)
const Parrots = [
    "../Imagens/bobrossparrot.gif",
    "../Imagens/explodyparrot.gif",
    "../Imagens/fiestaparrot.gif",
    "../Imagens/metalparrot.gif",
    "../Imagens/revertitparrot.gif",
    "../Imagens/tripletsparrot.gif",
    "../Imagens/unicornparrot.gif"
];

let selectedCards = []; // Armazena as cartas selecionadas para o jogo
let flippedCards = []; // Armazena as cartas viradas temporariamente
let matchCount = 0; // Contador de pares encontrados
let lockBoard = false; // Impede que o jogador vire mais de duas cartas ao mesmo tempo
let moveCount = 0; // Contador de jogadas

// Função para iniciar o jogo
function startGame() {
    let numCards;

     // Loop para validar o número de cartas
     while (numCards % 2 !== 0 || numCards < 4 || numCards > 14) {
        numCards = parseInt(prompt("Número inválido. Escolha um número par entre 4 e 14"));
    }

    // Resetar variáveis para um novo jogo
    selectedCards = [];
    flippedCards = [];
    matchCount = 0;
    moveCount = 0;
    lockBoard = false;

    createGameBoard(numCards);
}

// Função para criar o tabuleiro do jogo
function createGameBoard(numCards) {
    const gameContainer = document.querySelector('.memory-game');
    gameContainer.innerHTML = ''; // Limpa o tabuleiro anterior

    // Seleciona as cartas aleatórias para o jogo
    selectedCards = selectRandomCards(numCards / 2);

    // Duplica as cartas para formar pares e embaralha
    const duplicatedCards = [...selectedCards, ...selectedCards];
    const shuffledCards = shuffle(duplicatedCards);

    // Cria as cartas no tabuleiro
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card; // Armazena o nome da carta no dataset

        const imgElement = document.createElement('img');
        imgElement.src = Background; 
        imgElement.alt = "Verso da carta";

        cardElement.appendChild(imgElement);
        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
}

// Função para selecionar cartas aleatórias
function selectRandomCards(numPairs) {
    const shuffledParrots = shuffle(Parrots);
    return shuffledParrots.slice(0, numPairs);
}

// Função para embaralhar as cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Função para virar a carta
// - Se o tabuleiro está bloqueado (lockBoard).
// - Se a carta clicada já foi virada (this === flippedCards[0]).
// - Se a carta já foi combinada (matched).

function flipCard() {
    // Verifica se a carta já está virada ou combinada
    if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return; 
    }

    // Vira a carta
    const imgElement = this.querySelector('img');
    imgElement.src = this.dataset.name; // Mostra a frente da carta
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 1) {
        moveCount++; // Conta como jogada apenas na primeira carta do par
    }

    if (flippedCards.length === 2) {
        checkForMatch(); // Verifica se as cartas são iguais
    }
}

// Função para verificar se as cartas viradas são iguais
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards(); // Desabilita as cartas corretas
    } else {
        unflipCards(); // Desvira as cartas incorretas
    }
}

// Função para desabilitar as cartas corretas
function disableCards() {
    flippedCards.forEach(card => card.classList.add('matched')); // Marca as cartas como combinadas
    matchCount++; // Incrementa o contador de pares encontrados
    resetBoard(); // Reseta o tabuleiro

    // Verifica se o jogo acabou
    if (matchCount === selectedCards.length) {
        setTimeout(() => {
            alert(`Você ganhou em ${moveCount} jogadas!`);

            // Pergunta se o jogador deseja jogar novamente
            const playAgain = confirm('Deseja jogar novamente?');
            if (playAgain) {
                startGame(); // Reinicia o jogo
            }
        }, 500);
    }
}

// Função para desvirar as cartas incorretas
function unflipCards() {
    lockBoard = true; // Bloqueia o tabuleiro

    setTimeout(() => {
        flippedCards.forEach(card => {
            const imgElement = card.querySelector('img');
            imgElement.src = Background; // Volta a mostrar o verso da carta
            card.classList.remove('flipped');
        });
        resetBoard();
    }, 800);
}

// Função para resetar o tabuleiro
function resetBoard() {
    flippedCards = [];
    lockBoard = false;
}

window.onload = startGame;