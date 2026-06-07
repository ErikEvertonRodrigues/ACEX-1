const pistaCarrossel = document.querySelector('.carrossel');
let indiceAtual = 0; 

async function carregarCursos() {
    try {
        const resposta = await fetch('./assets/js/data/cursos.json'); 
        const cursos = await resposta.json();
        
        gerarCarrossel(cursos);
        
        // 2. SÓ DEPOIS inicia o movimento automático
        iniciarCarrosselAutomatico(); 
    } catch(erro) {
        console.log("Erro ao carregar o JSON de cursos:", erro);
    }
}

function gerarCardCurso(curso) {
    return `
        <div class="img-container">
            <img src="${curso.imagem}" alt="Capa do curso">
            <p class="title">${curso.titulo}</p>
            <span class="tag">${curso.categoria}</span>
        </div>
    `;
}

function gerarCarrossel(listaCursos) {
    const htmlCarrossel = listaCursos
        .filter(curso => curso.destaque === true) 
        .map(curso => gerarCardCurso(curso))      
        .join('');                                
    
    pistaCarrossel.innerHTML = htmlCarrossel;
}

function calcularCardsVisiveis() {
    const areaVisivel = pistaCarrossel.parentElement.offsetWidth;
    const card = document.querySelector('.img-container');

    if (!card) return 1;

    return Math.round(areaVisivel / card.offsetWidth);
}

function moverCarrossel() {
    const cards = document.querySelectorAll('.img-container');
    if (cards.length === 0) return; 

    const espacoEntreCards = 10;
    const larguraCard = cards[0].offsetWidth + espacoEntreCards;

    const cardsVisiveis = calcularCardsVisiveis();
    const indiceMaximo = cards.length - cardsVisiveis;

    indiceAtual++;

    if (indiceAtual > indiceMaximo) {
        indiceAtual = 0;
    }

    pistaCarrossel.style.transform = `translateX(-${indiceAtual * larguraCard}px)`;
    pistaCarrossel.style.transition = "transform 0.5s ease-in-out"; 
}

function iniciarCarrosselAutomatico() {
    setInterval(moverCarrossel, 3000);
}


carregarCursos();