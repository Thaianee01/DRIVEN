function selecionarItem(element) {
    const isProteina = element.classList.contains("proteina-1") 
                       element.classList.contains("proteina-2") 
                       element.classList.contains("proteina-3");
    
    const isBebida = element.classList.contains("coquinha") || 
                     element.classList.contains("fanta") || 
                     element.classList.contains("suco");

    const isSobremesa = element.classList.contains("pudim") || 
                        element.classList.contains("mouse") || 
                        element.classList.contains("brownie");

    if (isProteina) { 
        document.querySelectorAll(".prato div").forEach(item); {
            item.classList.remove("selecionado");
            element.classList.add("selecionado");
    }
    }

    element.classList.add("selecionado");
    }