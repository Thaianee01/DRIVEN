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
                     element.classList.contains("mouse") || 
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
        const sobremesaSelecionada = document.querySelector(".pudim.selecionado, .mouse.selecionado, .brownie.selecionado");
        if (sobremesaSelecionada) {
            sobremesaSelecionada.classList.remove("selecionado");
        }
        categoria.sobremesa = element;
        console.log("Categoria sobremesa atualizada:", categoria.sobremesa);
    }

    // Estilo do CSS adicionado na opção selecionada
    element.classList.add("selecionado");

    // Atualiza o status do pedido
    FinalizarPedido();
}

function FinalizarPedido() {
    // Se todos os itens foram selecionados, habilita o botão de finalizar
    if (categoria.prato !== null && categoria.bebida !== null && categoria.sobremesa !== null) {
        console.log("Todos os itens foram selecionados");
        footerBtn.disabled = false;
        footerBtn.innerText = "Fechar pedido";
        footerBtn.style.backgroundColor = "green";
        footerBtn.style.width = "80%";
    } 
    
    else {
        footerBtn.disabled = true;
        footerBtn.innerText = "Selecione os 3 itens para fechar o pedido";
    }
}

const confirmarPedido = document.getElementById("confirmarPedido");
const infoPedidos = document.getElementById("infoPedidos");
const totalCompra = document.getElementById("totalCompra");
const overlay = document.querySelector(".overlay");