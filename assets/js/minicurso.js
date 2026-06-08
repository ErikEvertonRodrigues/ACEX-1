document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const cursoChave = urlParams.get("curso") || "python";

    const cursoTituloPrincipal = document.getElementById("curso-titulo-principal");
    const playlistContainer = document.getElementById("playlist-dinamica");
    const videoPlayer = document.getElementById("video-player");
    const tituloAula = document.getElementById("titulo-aula");
    const conteudoAula = document.getElementById("conteudo-aula");
    const btnProximaAula = document.getElementById("btn-proxima-aula");

    let aulas = [];
    let aulaAtual = 0;

    function atualizarPlayer(aula, index) {

        aulaAtual = index;

        if (videoPlayer) {
            videoPlayer.src = aula.videoUrl;
        }

        if (tituloAula) {
            tituloAula.textContent = `${index + 1}. ${aula.titulo}`;
        }

        if (conteudoAula) {
            conteudoAula.innerHTML = aula.conteudo || "<p>Conteúdo não disponível.</p>";
        }

        document.querySelectorAll(".playlist-item").forEach(item => {
            item.classList.remove("active");
        });

        const itemAtual = document.querySelector(
            `.playlist-item[data-index="${index}"]`
        );

        if (itemAtual) {
            itemAtual.classList.add("active");
        }
    }

    fetch("../assets/js/data/minicurso.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Não foi possível carregar o arquivo JSON.");
            }

            return response.json();
        })
        .then(dados => {

            const cursoSelecionado = dados[cursoChave];

            if (!cursoSelecionado) {

                if (cursoTituloPrincipal) {
                    cursoTituloPrincipal.textContent = "Curso não encontrado";
                }

                return;
            }

            aulas = cursoSelecionado.aulas;

            if (cursoTituloPrincipal) {
                cursoTituloPrincipal.textContent =
                    cursoSelecionado.nomeCurso;
            }

            if (cursoDescricaoPrincipal) {
                cursoDescricaoPrincipal.textContent =
                    cursoSelecionado.descricaoCurso;
            }

            playlistContainer.innerHTML = "";

            aulas.forEach((aula, index) => {

                const li = document.createElement("li");

                li.classList.add("playlist-item");
                li.dataset.index = index;

                const tempoLimpo =
                    aula.tempo?.replace("Duracao: ", "") || "--:--";

                li.innerHTML = `
                    <span class="item-title">
                        ${aula.titulo || "Aula sem título"}
                    </span>

                    <span class="item-time">
                        ${tempoLimpo}
                    </span>
                `;

                li.addEventListener("click", () => {
                    atualizarPlayer(aula, index);
                });

                playlistContainer.appendChild(li);
            });

            if (aulas.length > 0) {
                atualizarPlayer(aulas[0], 0);
            }

            btnProximaAula?.addEventListener("click", () => {

                if (aulaAtual < aulas.length - 1) {

                    aulaAtual++;

                    atualizarPlayer(
                        aulas[aulaAtual],
                        aulaAtual
                    );
                }
            });
        })
        .catch(error => {
            console.error(
                "Erro ao processar a playlist dinâmica:",
                error
            );
        });

});