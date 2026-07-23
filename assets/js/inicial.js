const pistaCursos = document.querySelector('#carrossel-cursos');
const pistaEbooks = document.querySelector('#carrossel-ebooks');

const estadoCursos = { indice: 0 };
const estadoEbooks = { indice: 0 };

async function carregarCursos() {
    try {
        const resposta = await fetch('./assets/js/data/cursos.json'); 
        const cursos = await resposta.json();
        
        gerarCarrosselCursos(cursos);
        setInterval(() => moverCarrossel(pistaCursos, '.img-container', estadoCursos), 3000);
    } catch(erro) {
        console.log("Erro ao carregar o JSON de cursos:", erro);
    }
}

async function carregarEbooks() {
    try {
        const resposta = await fetch('./assets/js/data/ebooks.json'); 
        const ebooks = await resposta.json();
        
        gerarCarrosselEbooks(ebooks);
        
        setInterval(() => moverCarrossel(pistaEbooks, '.ebook-card', estadoEbooks), 3500); 
    } catch(erro) {
        console.log("Erro ao carregar o JSON de e-books:", erro);
    }
}

function gerarCardCurso(curso) {
    const tagColor = curso.categoria.toLowerCase().replace(/\s+/g, '-');
    return `
        <a class="img-container" href="./minicursos/curso_in.html?curso=${curso.link}">
            <img src="${curso.imagem}" alt="Capa do curso">
            <p class="title">${curso.titulo}</p>
            <span class="tag ${tagColor}">${curso.categoria}</span>
        </a>
    `;
}

function gerarCardEbook(ebook) {
    const tagColor = ebook.categoria.toLowerCase().replace(/\s+/g, '-');
    return `
        <a class="img-container ebook-card" href="./ebooks/ebooks.html">
            <img src="${ebook.imagem}" alt="Capa do E-book: ${ebook.titulo}">
            <span class="tag ${tagColor}">${ebook.categoria}</span>
        </a>
    `;
}

function gerarCarrosselCursos(listaCursos) {
    const htmlCarrossel = listaCursos
        .filter(curso => curso.destaque === true) 
        .map(curso => gerarCardCurso(curso))      
        .join('');                                
    
    pistaCursos.innerHTML = htmlCarrossel;
}

function gerarCarrosselEbooks(listaEbooks) {
    const htmlCarrossel = listaEbooks
        .filter(ebook => ebook.destaque === true) 
        .map(ebook => gerarCardEbook(ebook))      
        .join('');                                
    
    pistaEbooks.innerHTML = htmlCarrossel;
}

function moverCarrossel(pista, classeCard, estado) {
    if (!pista) return;
    
    const cards = pista.querySelectorAll(classeCard);
    if (cards.length === 0) return; 

    const espacoEntreCards = 10;
    const larguraCard = cards[0].offsetWidth + espacoEntreCards;
    
    const cardsVisiveis = Math.round(pista.offsetWidth / cards[0].offsetWidth);
    const indiceMaximo = cards.length - cardsVisiveis;

    estado.indice = Math.round(pista.scrollLeft / larguraCard);
    estado.indice++;

    if (estado.indice > indiceMaximo) {
        estado.indice = 0;
    }

    pista.scrollTo({
        left: estado.indice * larguraCard,
        behavior: 'smooth'
    });
}

carregarCursos();
carregarEbooks();