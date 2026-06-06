let ebooks = [];

async function carregarEbooks(){
    try {
        const resposta = await fetch('../assets/js/data/ebooks.json');
        ebooks = await resposta.json();
        gerarEbooks(ebooks.slice(0, 6));
    }catch(erro) {
        console.log("Erro ao carregar o JSON:", erro);
    }
}

carregarEbooks();

const filterForm = document.querySelector('.filters__form');
const inputBusca = document.querySelector('#busca');
// const inputArea = document.querySelector('#area');

function aplicarFiltros() {
    
    const termoBuscado = inputBusca.value.toLowerCase().trim();
    //const areaEscolhida = inputArea.value.toLowerCase(); 

    const ebooksFiltrados = ebooks.filter(ebook => {

        //const categoriaEbook = (ebook.categoria || "").toLowerCase();
        const tituloEbook = (ebook.titulo || "").toLowerCase();

        // console.log(`categoria: ${categoriaEbook}`);
        // console.log(`area: ${areaEscolhida}`);

        const tituloOk = tituloEbook.includes(termoBuscado);
        //const areaOk = areaEscolhida === "" || categoriaEbook.includes(areaEscolhida);

        console.log(tituloOk);

        return tituloOk;
    });

    gerarEbooks(ebooksFiltrados);

    btnCarregarMais.style.display = 'none';
}

inputBusca.addEventListener('input', aplicarFiltros); 
// inputArea.addEventListener('change', aplicarFiltros); 

filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

function gerarCard(ebook){
    return `
        <div class="card">
            <span>${ebook.categoria}</span>
            <img class="card-image" src=${ebook.imagem} alt="">
            <div class="card-info">
                <h2>${ebook.titulo.substring(0, 25)}</h2>
                <p>${ebook.autor}</p>
                <p><i class="fa-regular fa-file-lines"></i> ${ebook.paginas} páginas</p>
                <a class="download" href=""><i class="fa-solid fa-download"></i> Baixar PDF</a>
            </div>
        </div>
    `
}

function gerarEbooks(listEbooks){
    const mainCards = document.querySelector('.content');
    const dtqCards = document.querySelector('#cards_ebooks_destaques');

    const htmlMainCards = listEbooks.map(ebook => gerarCard(ebook)).join('');
    mainCards.innerHTML = htmlMainCards;

    const htmlDtqCards = listEbooks.filter(ebook => ebook.destaque === true).map(ebook => gerarCard(ebook)).join('');
    dtqCards.innerHTML = htmlDtqCards;
}

const btnCarregarMais = document.querySelector('.carregar_mais');

btnCarregarMais.addEventListener('click', () => {
    gerarEbooks(ebooks);
    btnCarregarMais.style.display = 'none';
});
