function iniciarChat() {
    const loginScreen = document.getElementById("login");
    const chatScreen = document.getElementById("chat");

    loginScreen.style.display = "none";  // Esconde a tela de login
    chatScreen.style.display = "flex";   // Mostra o chat
}

function toggleSidebar() {
    const asideElement = document.getElementById("sidebar");
    asideElement.classList.toggle("hidden");
}