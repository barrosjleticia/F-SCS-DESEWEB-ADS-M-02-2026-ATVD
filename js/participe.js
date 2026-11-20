// Formulário de contato: salva o rascunho no localStorage e abre o aplicativo
// de e-mail com a mensagem pronta após a animação da bituca.
const EMAIL_DESTINO = "bitucazero@gmail.com";
const DURACAO_ANIMACAO = 1800;
const CHAVE_RASCUNHO = "bituca-zero-contato-rascunho";
const CAMPOS_SALVOS = ["nome", "email", "assunto", "mensagem"];

function lerRascunho() {
    try {
        const bruto = localStorage.getItem(CHAVE_RASCUNHO);
        return bruto ? JSON.parse(bruto) : null;
    } catch (erro) {
        console.warn("Não foi possível ler o rascunho salvo.", erro);
        return null;
    }
}

function salvarRascunho(dados) {
    try {
        localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
    } catch (erro) {
        console.warn("Não foi possível salvar o rascunho.", erro);
    }
}

function apagarRascunho() {
    try {
        localStorage.removeItem(CHAVE_RASCUNHO);
    } catch (erro) {
        console.warn("Não foi possível apagar o rascunho.", erro);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-contato");
    const retorno = document.querySelector("#retorno-formulario");
    if (!form || !retorno) return;

    const cena = document.querySelector("#cena-bituca");
    const peca = document.querySelector("#cena-peca");
    const lixeira = document.querySelector("#cena-lixeira");
    const botao = form.querySelector('button[type="submit"]');
    const botaoLimpar = document.querySelector("#limpar-dados");
    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enviando = false;

    function salvarCampos() {
        const dados = {};
        let temConteudo = false;

        CAMPOS_SALVOS.forEach((nome) => {
            const campo = form.elements[nome];
            if (!campo) return;
            dados[nome] = campo.value;
            if (campo.value.trim() !== "") temConteudo = true;
        });

        if (temConteudo) salvarRascunho(dados);
        else apagarRascunho();
    }

    function restaurarCampos() {
        const dados = lerRascunho();
        if (!dados || typeof dados !== "object") return;

        CAMPOS_SALVOS.forEach((nome) => {
            const campo = form.elements[nome];
            const valor = dados[nome];
            if (campo && typeof valor === "string") campo.value = valor;
        });
    }

    function medirTrajeto() {
        if (!cena || !peca || !lixeira) return;
        const p = peca.getBoundingClientRect();
        const l = lixeira.getBoundingClientRect();
        const dx = l.left + l.width / 2 - (p.left + p.width / 2);
        const dy = l.top + l.height * 0.22 - (p.top + p.height / 2);
        cena.style.setProperty("--dx", `${Math.round(dx)}px`);
        cena.style.setProperty("--dy", `${Math.round(dy)}px`);
    }

    function reacender() {
        if (!cena || !cena.classList.contains("cena-enviando")) return;
        cena.classList.remove("cena-enviando");
        cena.classList.add("cena-volta");
        setTimeout(() => cena.classList.remove("cena-volta"), 700);
    }

    function abrirEmail(link) {
        window.location.href = link;
        retorno.textContent = "";
        const aviso = document.createElement("span");
        aviso.textContent = "Abrindo o seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, ";
        const a = document.createElement("a");
        a.href = link;
        a.textContent = "clique aqui";
        aviso.append(a, ".");
        retorno.append(aviso);

        apagarRascunho();
        if (botao) botao.disabled = false;
        enviando = false;
    }

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (enviando || !form.reportValidity()) return;

        const nome = form.elements["nome"].value.trim();
        const email = form.elements["email"].value.trim();
        const assunto = form.elements["assunto"].value;
        const mensagem = form.elements["mensagem"].value.trim();

        const linhas = [
            `Nome: ${nome}`,
            `E-mail para resposta: ${email}`,
            `Assunto: ${assunto}`,
            "",
            "Mensagem:",
            mensagem
        ];

        const titulo = `[Bituca Zero] ${assunto}`;
        const corpo = linhas.join("\\r\\n");
        const link = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(corpo)}`;

        enviando = true;
        if (botao) botao.disabled = true;

        if (!cena) {
            abrirEmail(link);
            return;
        }

        medirTrajeto();
        cena.classList.remove("cena-volta", "cena-enviando");
        void cena.offsetWidth;
        cena.classList.add("cena-enviando");
        retorno.textContent = "Jogando a bituca no lixo...";

        const espera = reduzMovimento.matches ? 300 : DURACAO_ANIMACAO;
        setTimeout(() => abrirEmail(link), espera);
    });

    form.addEventListener("input", () => {
        reacender();
        salvarCampos();
    });
    form.addEventListener("change", salvarCampos);

    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", () => {
            apagarRascunho();
            form.reset();
            reacender();
            retorno.textContent = "Os dados salvos neste navegador foram apagados.";
        });
    }

    restaurarCampos();
});
