let ebooks = [];
let quantidadeExibida = 8;

const filtrosSelecionados = new Set();

const filterForm = document.querySelector('.filters__form');
const inputBusca = document.querySelector('#busca');

const btnTodos = document.querySelector('#todos');
const btnLimpar = document.querySelector('#limpar');
const btnCarregarMais = document.querySelector('.carregar_mais');

const contadorEbooks = document.querySelector('#contador-ebooks');

async function carregarEbooks() {
    try {
        const resposta = await fetch('../assets/js/data/ebooks.json');
        ebooks = await resposta.json();

        gerarEbooks(ebooks.slice(0, quantidadeExibida));
        atualizarContador(ebooks.length);
        atualizarBotaoCarregarMais();

    } catch (erro) {
        console.log('Erro ao carregar o JSON:', erro);
    }
}

function atualizarContador(quantidade) {
    contadorEbooks.textContent = quantidade;
}

carregarEbooks();

function atualizarBotaoCarregarMais() {
    const buscaAtiva = inputBusca.value.trim() !== '';
    const filtrosAtivos = filtrosSelecionados.size > 0;

    if (buscaAtiva || filtrosAtivos) {
        btnCarregarMais.style.display = 'none';
        return;
    }

    btnCarregarMais.style.display =
        quantidadeExibida >= ebooks.length
            ? 'none'
            : 'block';
}

function aplicarFiltros() {

    const termoBuscado = inputBusca.value.toLowerCase().trim();

    const ebooksFiltrados = ebooks.filter(ebook => {

        const tituloOk = (ebook.titulo || '')
            .toLowerCase()
            .includes(termoBuscado);

        const categoriaOk =
            filtrosSelecionados.size === 0 ||
            filtrosSelecionados.has(
                (ebook.categoria || '').toLowerCase()
            );

        return tituloOk && categoriaOk;
    });

    gerarEbooks(ebooksFiltrados);
    atualizarContador(ebooksFiltrados.length);

    btnCarregarMais.style.display = 'none';
}

inputBusca.addEventListener('input', aplicarFiltros);

filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

function gerarCard(ebook) {

    const tagColor = ebook.categoria
        .toLowerCase()
        .replace(/\s+/g, '-');

    return `
        <div class="card bg-senary">
            <span class="tag ${tagColor}">
                ${ebook.categoria}
            </span>

            <img
                class="card-image"
                src="${ebook.imagem}"
                alt="${ebook.titulo}"
            >

            <div class="card-info">
                <h2 class="color-primary">${ebook.titulo.substring(0, 25)}</h2>

                <p class="color-primary">${ebook.autor}</p>

                <p class="color-primary">
                    <i class="fa-regular fa-file-lines"></i>
                    ${ebook.paginas} páginas
                </p>

                <a class="download" href="">
                    <i class="fa-solid fa-download"></i>
                    Baixar PDF
                </a>
            </div>
        </div>
    `;
}

function gerarEbooks(lista) {

    const mainCards = document.querySelector('.content');

    if (!mainCards) return;

    const htmlMainCards = lista
        .map(ebook => gerarCard(ebook))
        .join('');

    mainCards.innerHTML = htmlMainCards;
}

const botoesFiltro = document.querySelectorAll('.btn-filtros');

botoesFiltro.forEach(botao => {

    botao.addEventListener('click', () => {

        const categoria = botao.textContent
            .trim()
            .toLowerCase();

        if (categoria === 'todos' || categoria === 'limpar') {
            return;
        }

        if (filtrosSelecionados.has(categoria)) {

            filtrosSelecionados.delete(categoria);
            botao.classList.remove('ativo');

        } else {

            filtrosSelecionados.add(categoria);
            botao.classList.add('ativo');
        }

        aplicarFiltros();

    });

});

btnTodos.addEventListener('click', () => {

    filtrosSelecionados.clear();

    botoesFiltro.forEach(botao => {
        botao.classList.remove('ativo');
    });

    inputBusca.value = '';
    quantidadeExibida = 8;

    gerarEbooks(ebooks.slice(0, quantidadeExibida));
    atualizarContador(ebooks.length);
    atualizarBotaoCarregarMais();

});

btnLimpar.addEventListener('click', () => {

    filtrosSelecionados.clear();

    botoesFiltro.forEach(botao => {
        botao.classList.remove('ativo');
    });

    inputBusca.value = '';
    quantidadeExibida = 8;

    gerarEbooks(ebooks.slice(0, quantidadeExibida));
    atualizarContador(ebooks.length);
    atualizarBotaoCarregarMais();

});

btnCarregarMais.addEventListener('click', () => {

    quantidadeExibida += 8;

    gerarEbooks(
        ebooks.slice(0, quantidadeExibida)
    );
    atualizarContador(ebooks.length);
    atualizarBotaoCarregarMais();

});