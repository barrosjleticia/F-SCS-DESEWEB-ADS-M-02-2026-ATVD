/* Mapa de pontos de coleta de bitucas (Leaflet + OpenStreetMap).
   Para adicionar um ponto novo, inclua um objeto em PONTOS_COLETA.
   Localizações aproximadas: confirme com o local antes de ir. */
const PONTOS_COLETA = [
    {
        nome: "Paço Municipal de Santo André",
        cidade: "Santo André",
        endereco: "Praça IV Centenário, Centro",
        detalhe: "Lixeiras para bitucas instaladas no entorno do Paço, em projeto da Prefeitura com a Poiato Recicla.",
        fonte: "Diário do Grande ABC",
        lat: -23.6639, lng: -46.5327
    },
    {
        nome: "MASP",
        cidade: "São Paulo",
        endereco: "Av. Paulista, 1578",
        detalhe: "Coletor de bitucas do programa Paulista Sustentável.",
        fonte: "Paulista Sustentável",
        lat: -23.5614, lng: -46.6559
    },
    {
        nome: "Conjunto Nacional",
        cidade: "São Paulo",
        endereco: "Av. Paulista, 2073",
        detalhe: "Coletor de bitucas do programa Paulista Sustentável.",
        fonte: "Paulista Sustentável",
        lat: -23.5586, lng: -46.6607
    },
    {
        nome: "Sesc Paulista",
        cidade: "São Paulo",
        endereco: "Av. Paulista, 119",
        detalhe: "Coletor de bitucas do programa Paulista Sustentável.",
        fonte: "Paulista Sustentável",
        lat: -23.5703, lng: -46.6467
    },
    {
        nome: "Japan House",
        cidade: "São Paulo",
        endereco: "Av. Paulista, 52",
        detalhe: "Coletor de bitucas do programa Paulista Sustentável.",
        fonte: "Paulista Sustentável",
        lat: -23.5712, lng: -46.6457
    }
];

(function () {
    const lista = document.getElementById("pontos-lista");
    const mapaEl = document.getElementById("mapa-pontos");
    if (!lista || !mapaEl) return;

    const urlRota = (p) =>
        "https://www.openstreetmap.org/?mlat=" + p.lat + "&mlon=" + p.lng + "#map=17/" + p.lat + "/" + p.lng;

    // A lista funciona mesmo que o mapa não carregue.
    const itens = PONTOS_COLETA.map((p, i) => {
        const li = document.createElement("li");
        li.className = "ponto";
        li.innerHTML =
            '<button type="button" class="ponto_botao" data-i="' + i + '">' +
            '<span class="ponto_num" aria-hidden="true">' + (i + 1) + "</span>" +
            '<span class="ponto_texto"><strong></strong><small class="ponto_end"></small><small class="ponto_det"></small></span>' +
            "</button>" +
            '<a class="ponto_link" target="_blank" rel="noopener">Ver no OpenStreetMap<span class="sr-only"> (abre em nova aba)</span></a>';
        li.querySelector("strong").textContent = p.nome;
        li.querySelector(".ponto_end").textContent = p.endereco + " · " + p.cidade;
        li.querySelector(".ponto_det").textContent = p.detalhe + " Fonte: " + p.fonte + ".";
        li.querySelector("a").href = urlRota(p);
        lista.appendChild(li);
        return li;
    });

    if (typeof L === "undefined") {
        mapaEl.innerHTML = '<p class="mapa_erro">Não foi possível carregar o mapa agora. Use a lista ao lado para abrir cada ponto no OpenStreetMap.</p>';
        document.getElementById("mapa-todos")?.remove();
        return;
    }

    const mapa = L.map(mapaEl, { scrollWheelZoom: false }).setView([-23.61, -46.60], 11);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    const marcadores = PONTOS_COLETA.map((p, i) => {
        const icone = L.divIcon({
            className: "pino",
            html: "<span>" + (i + 1) + "</span>",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });
        const m = L.marker([p.lat, p.lng], { icon: icone, title: p.nome, keyboard: true }).addTo(mapa);
        const pop = document.createElement("div");
        const t = document.createElement("strong"); t.textContent = p.nome;
        const e = document.createElement("div"); e.textContent = p.endereco + " · " + p.cidade;
        pop.append(t, e);
        m.bindPopup(pop);
        m.on("click", () => marcar(i, false));
        return m;
    });

    function marcar(i, mover) {
        itens.forEach((li, k) => li.classList.toggle("ponto_ativo", k === i));
        itens[i].querySelector(".ponto_botao").setAttribute("aria-current", "true");
        itens.forEach((li, k) => { if (k !== i) li.querySelector(".ponto_botao").removeAttribute("aria-current"); });
        if (mover) {
            mapa.setView(marcadores[i].getLatLng(), 16);
            marcadores[i].openPopup();
        }
    }

    lista.addEventListener("click", (ev) => {
        const b = ev.target.closest(".ponto_botao");
        if (b) marcar(Number(b.dataset.i), true);
    });

    mapa.fitBounds(L.latLngBounds(PONTOS_COLETA.map((p) => [p.lat, p.lng])).pad(0.15));
    document.getElementById("mapa-todos")?.addEventListener("click", () => {
        mapa.fitBounds(L.latLngBounds(PONTOS_COLETA.map((p) => [p.lat, p.lng])).pad(0.15));
    });
})();
