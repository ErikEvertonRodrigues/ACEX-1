document.addEventListener("DOMContentLoaded", () => {
    // 1. Pega o parâmetro 'curso' da URL (Ex: curso_in.html?curso=bancodedados)
    // Se não tiver nenhum parâmetro na URL, ele usa 'python' como padrão
    const urlParams = new URLSearchParams(window.location.search);
    const cursoChave = urlParams.get("curso") || "python";

    // Elementos do HTML que vamos atualizar
    const cursoTituloPrincipal = document.getElementById("curso-titulo-principal");
    const cursoDescricaoPrincipal = document.getElementById("curso-descricao-principal");
    const playlistContainer = document.getElementById("playlist-dinamica");
    const videoPlayer = document.getElementById("video-player");
    const descTitulo = document.querySelector(".video-desc h2");
    const descTexto = document.querySelector(".video-desc p");

    // Função para atualizar os dados do player principal
    function atualizarPlayer(aula) {
        if (videoPlayer) videoPlayer.src = aula.videoUrl;
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
        .then(dados => {
            // 2. Busca o curso específico usando a chave da URL (ex: dados["python"] ou dados["bancodedados"])
            const cursoSelecionado = dados[cursoChave];

            // Se o usuário inventar um curso que não existe na URL, avisa na tela
            if (!cursoSelecionado) {
                if (cursoTituloPrincipal) cursoTituloPrincipal.textContent = "Curso não encontrado";
                if (cursoDescricaoPrincipal) cursoDescricaoPrincipal.textContent = "Verifique o link acessado.";
                playlistContainer.innerHTML = "";
                return;
            }

            // 3. Atualiza o cabeçalho da página com as informações gerais do curso atual
            if (cursoTituloPrincipal) cursoTituloPrincipal.textContent = cursoSelecionado.nomeCurso;
            if (cursoDescricaoPrincipal) cursoDescricaoPrincipal.textContent = cursoSelecionado.descricaoCurso;

            // Limpa a playlist antiga antes de preencher
            playlistContainer.innerHTML = "";

            // 4. Passa apenas pelas aulas do curso que foi selecionado
            cursoSelecionado.aulas.forEach((aula, index) => {
                const li = document.createElement("li");
                li.classList.add("playlist-item");
                
                // Ativa a primeira aula por padrão
                if (index === 0) {
                    li.classList.add("active");
                    atualizarPlayer(aula);
                }

                const tempoLimpo = aula.tempo.replace("Duracao: ", "");

                li.innerHTML = `
                    <span class="item-title">${aula.titulo || "Aula Sem Título"}</span>
                    <span class="item-time">${tempoLimpo || "--:--"}</span>
                `;

                // Evento de clique para trocar de vídeo dentro do curso atual
                li.addEventListener("click", () => {
                    document.querySelector(".playlist-item.active")?.classList.remove("active");
                    li.classList.add("active");
                    atualizarPlayer(aula);
                });

                playlistContainer.appendChild(li);
            });
        })
        .catch(error => console.error("Erro ao processar a playlist dinâmica:", error));
});