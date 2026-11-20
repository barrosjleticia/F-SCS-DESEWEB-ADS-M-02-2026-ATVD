/* Menu hambúrguer (celular/tablet) */
(function () {
    const botao = document.querySelector(".menu_toggle");
    const menu = document.getElementById("menu-principal");
    if (!botao || !menu) return;

    function definir(aberto) {
        menu.classList.toggle("menu_aberto", aberto);
        botao.classList.toggle("menu_toggle_ativo", aberto);
        botao.setAttribute("aria-expanded", String(aberto));
        botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    }

    botao.addEventListener("click", () => definir(!menu.classList.contains("menu_aberto")));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("menu_aberto")) {
            definir(false);
            botao.focus();
        }
    });

    menu.addEventListener("click", (e) => {
        if (e.target instanceof Element && e.target.closest("a")) definir(false);
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
        if (e.matches) definir(false);
    });
})();
