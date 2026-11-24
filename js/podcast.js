// Controles extras do player de podcast.
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio-podcast');
    const voltar = document.getElementById('voltar-15');
    const avancar = document.getElementById('avancar-15');
    const velocidade = document.getElementById('velocidade-audio');

    if (!audio) return;

    voltar?.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 15);
    });

    avancar?.addEventListener('click', () => {
        if (Number.isFinite(audio.duration)) {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
        }
    });

    velocidade?.addEventListener('change', () => {
        audio.playbackRate = Number(velocidade.value);
    });
});
