const footerBtn = document.querySelector(".footerBtn");
const overlay = document.querySelector(".overlay");
const janelaConfirmacao = document.querySelector(".janela-confirmacao");
const total = document.getElementById("total");

let categoria = {
    prato: null,
    bebida: null,
    sobremesa: null
}

function selecionarItem(element) {
    const item = {
        isProteina: element.classList.contains("proteina-1") || 
                    element.classList.contains("proteina-2") || 
                    element.classList.contains("proteina-3"),

        isBebida: element.classList.contains("coquinha") || 
                  element.classList.contains("fanta") || 
                  element.classList.contains("suco"),
                  
        isSobremesa: element.classList.contains("pudim") || 
                     element.classList.contains("mousse") || 
                     element.classList.contains("brownie")
    }

    if (item.isProteina) {
        const pratoSelecionado = document.querySelector(".proteina-1.selecionado, .proteina-2.selecionado, .proteina-3.selecionado");
        if (pratoSelecionado) {
            pratoSelecionado.classList.remove("selecionado");
        }
        categoria.prato = element;
        console.log("Categoria prato atualizada:", categoria.prato);
    }

    if (item.isBebida) {
        const bebidaSelecionada = document.querySelector(".coquinha.selecionado, .fanta.selecionado, .suco.selecionado");
        if (bebidaSelecionada) {
            bebidaSelecionada.classList.remove("selecionado");
        }
        categoria.bebida = element;
        console.log("Categoria bebida atualizada:", categoria.bebida);
    }

    if (item.isSobremesa) {
        const sobremesaSelecionada = document.querySelector(".pudim.selecionado, .mousse.selecionado, .brownie.selecionado");
        if (sobremesaSelecionada) {
            sobremesaSelecionada.classList.remove("selecionado");
        }
        categoria.sobremesa = element;
        console.log("Categoria sobremesa atualizada:", categoria.sobremesa);
    }

    // Estilo do CSS adicionado na opção selecionada
    element.classList.add("selecionado");

    // Atualizar o status do pedido
    FinalizarPedido();
}

function FinalizarPedido() {
    if (categoria.prato !== null && categoria.bebida !== null && categoria.sobremesa !== null) {
        console.log("Todos os itens foram selecionados");
        footerBtn.disabled = false;
        footerBtn.innerText = "Fechar pedido";
        footerBtn.style.width = "80%";
        footerBtn.style.backgroundColor = "#32B72F";
        footerBtn.style.border = none;
    }
    
    else {
        footerBtn.disabled = true;
        footerBtn.innerText = "Selecione os 3 itens para fechar o pedido";
    }
}

footerBtn.onclick = function() {
    console.log("Botão foi clicado!");
    fecharPedido();
};

function fecharPedido() {
    overlay.classList.add("overlay-visivel");

    const pratoNome = categoria.prato.querySelector("h4").innerText;
    const pratoPreco = parseFloat(categoria.prato.querySelector("h5").innerText.replace("R$", "").replace(",", "."));

    const bebidaNome = categoria.bebida.querySelector("h4").innerText;
    const bebidaPreco = parseFloat(categoria.bebida.querySelector("h5").innerText.replace("R$", "").replace(",", "."));

    const sobremesaNome = categoria.sobremesa.querySelector("h4").innerText;
    const sobremesaPreco = parseFloat(categoria.sobremesa.querySelector("h5").innerText.replace("R$", "").replace(",", "."));

    const precoTotal = pratoPreco + bebidaPreco + sobremesaPreco;

    const messagem = `Olá, gostaria de fazer o pedido:\n
    -Prato: ${pratoNome}\n
    -Bebida: ${bebidaNome}\n
    -Sobremesa: ${sobremesaNome}\n
    Total: R$ ${precoTotal.toFixed(2)}`;

    const codificar = encodeURIComponent(messagem);
    const WhatsApp = `https://wa.me/?text=${codificar}`;
    
    janelaConfirmacao.innerHTML = `
        <h6><strong>Confirme o seu pedido</strong></h6>
        <h2> ${pratoNome}: ${pratoPreco.toFixed(2)}</h2>
        <h2>${bebidaNome}: ${bebidaPreco.toFixed(2)}</h2>
        <h2>${sobremesaNome}: ${sobremesaPreco.toFixed(2)}</h2>

        <h6 id="total"><strong>Total:</strong> R$ ${precoTotal.toFixed(2)}</h6> 
        <a id="confirmarBtn" href="${WhatsApp}" class="confirmarBtn">Tudo certo, pode pedir!</a>
        <button class="cancelarBtn">Cancelar</button>
    `;

    const confirmarBtn = document.getElementById("confirmarBtn");
    confirmarBtn.href = WhatsApp;

    const cancelarBtn = document.querySelector(".cancelarBtn");
    cancelarBtn.onclick = function() {
        console.log("Botão cancelar foi clicado!");
        overlay.classList.remove("overlay-visivel");
        janelaConfirmacao.innerHTML = "";
        cancelarBtn.style.border = "none";
    };
}