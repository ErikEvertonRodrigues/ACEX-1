

document.addEventListener("DOMContentLoaded", () => {
    const playlistContainer = document.getElementById("playlist-dinamica");
    const videoPlayer = document.getElementById("video-player"); // Seleciona o iframe
    const descTitulo = document.querySelector(".video-desc h2");
    const descTexto = document.querySelector(".video-desc p");

    // Função interna para mudar os textos e o VÍDEO na tela
    function atualizarPlayer(aula) {
        if (videoPlayer) videoPlayer.src = aula.videoUrl; // Troca o vídeo do YouTube
        if (descTitulo) descTitulo.textContent = aula.titulo;
        if (descTexto) descTexto.textContent = aula.descricao;
    }

    // Faz a requisição para ler o arquivo JSON
    fetch("../assets/js/data/minicurso.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Não foi possível carregar o arquivo JSON.");
            }
            return response.json();
        })
        .then(aulas => {
            playlistContainer.innerHTML = "";

            aulas.forEach((aula, index) => {
                const li = document.createElement("li");
                li.classList.add("playlist-item");
                
                if (index === 0) {
                    li.classList.add("active");
                    atualizarPlayer(aula); // Carrega o primeiro vídeo da lista
                }

                const tempoLimpo = aula.tempo.replace("Duracao: ", "");

                li.innerHTML = `
                    <span class="item-title">${aula.titulo}</span>
                    <span class="item-time">${tempoLimpo}</span>
                `;

                li.addEventListener("click", () => {
                    document.querySelector(".playlist-item.active")?.classList.remove("active");
                    li.classList.add("active");

                    atualizarPlayer(aula); // Troca o vídeo e textos ao clicar
                });

                playlistContainer.appendChild(li);
            });
        })
        .catch(error => console.error("Erro ao processar a playlist dinâmica:", error));
});