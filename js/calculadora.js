// Calculadora educativa: uma unidade informada equivale a uma bituca estimada.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-calculadora");
    const campo = document.querySelector("#quantidade");
    const resultado = document.querySelector("#resultado-calculadora");
    if (!form || !campo || !resultado) return;

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!campo.reportValidity()) return;
        const diario = Number(campo.value);
        if (!Number.isFinite(diario) || diario < 0 || diario > 1000) {
            resultado.textContent = "Informe um número entre 0 e 1.000.";
            return;
        }
        const anual = diario * 365;
        resultado.innerHTML = `<p>Estimativa diária</p><strong>${diario.toLocaleString("pt-BR")} bituca(s)</strong><p>Estimativa em um ano</p><strong>${anual.toLocaleString("pt-BR")} bituca(s)</strong><p class="ajuda-campo">Cálculo: ${diario} × 365 dias. Resultado educativo, não uma medição ambiental.</p>`;
    });
});
