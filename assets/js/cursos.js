let cursos = [];

async function carregarCursos(){
    try {
        const resposta = await fetch('../assets/js/data/cursos.json');
        cursos = await resposta.json();
        gerarCursos(cursos.slice(0, 8));
    }catch(erro) {
        console.log("Erro ao carregar o JSON:", erro);
    }
}

carregarCursos();

const filterForm = document.querySelector('.filters__form');
const inputBusca = document.querySelector('#busca');
const inputArea = document.querySelector('#area');

function aplicarFiltros() {
    
    const termoBuscado = inputBusca.value.toLowerCase().trim();
    const areaEscolhida = inputArea.value.toLowerCase(); 

    const cursosFiltrados = cursos.filter(curso => {

        const categoriaCurso = (curso.categoria || "").toLowerCase();
        const tituloCurso = (curso.titulo || "").toLowerCase();

        const tituloOk = tituloCurso.includes(termoBuscado);
        const areaOk = areaEscolhida === "" || categoriaCurso.includes(areaEscolhida);

        console.log(tituloOk && areaOk);

        return tituloOk && areaOk;
    });

    gerarCursos(cursosFiltrados);

    btnCarregarMais.style.display = 'none';
}

inputBusca.addEventListener('input', aplicarFiltros); 
inputArea.addEventListener('change', aplicarFiltros); 

filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

function gerarCard(curso){
    const tagColor = curso.categoria.toLowerCase().replace(/\s+/g, '-');

    return `
        <a href="curso_in.html" class="course-card">
            <article class="card_curso">
                <div class="dados">
                    <span class="tag ${tagColor}">${curso.categoria}</span>
                </div>
                <div class="card__body">
                    <h3>${curso.titulo}</h3>
                    <p>${curso.descricao}</p>
                    <span>${curso.horas} horas</span>
                </div>
            </article>
        </a>
    `
}

function gerarCursos(listCursos){
    const mainCards = document.querySelector('#cards_cursos');
    const dtqCards = document.querySelector('#cards_cursos_destaques');

    const htmlMainCards = listCursos.map(curso => gerarCard(curso)).join('');
    mainCards.innerHTML = htmlMainCards;

    const htmlDtqCards = cursos.filter(curso => curso.destaque === true).map(curso => gerarCard(curso)).join('');
    dtqCards.innerHTML = htmlDtqCards;
}

const btnCarregarMais = document.querySelector('.carregar_mais');

btnCarregarMais.addEventListener('click', () => {
    gerarCursos(cursos);
    btnCarregarMais.style.display = 'none';
})
