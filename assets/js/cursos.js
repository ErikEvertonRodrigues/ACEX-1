import { applyTheme } from "./script.js";

let cursos = [];
let categoriasSelecionadas = [];

const inputBusca = document.querySelector('#busca');
const contadorCursos = document.querySelector('#contador-cursos');
const btnCarregarMais = document.querySelector('.carregar_mais');

const btnTodos = document.querySelector('#todos');
const btnDesign = document.querySelector('#design');
const btnBanco = document.querySelector('#banco');
const btnTecnologia = document.querySelector('#tecnologia');
const btnLimpar = document.querySelector('#limpar');

const botoesFiltro = document.querySelectorAll('.btn-filtros');

async function carregarCursos() {
    try {
        const resposta = await fetch('../assets/js/data/cursos.json');
        cursos = await resposta.json();

        gerarCursos(cursos.slice(0, 8));
        atualizarContador(cursos.length);

    } catch (erro) {
        console.log("Erro ao carregar o JSON:", erro);
    }
}

carregarCursos();

function atualizarContador(qtd) {
    contadorCursos.textContent = qtd;
}

function aplicarFiltros() {

    const termoBuscado = inputBusca.value.toLowerCase().trim();

    const cursosFiltrados = cursos.filter(curso => {

        const titulo = (curso.titulo || "").toLowerCase();
        const categoria = (curso.categoria || "").toLowerCase();

        const tituloOk = titulo.includes(termoBuscado);

        const categoriaOk =
            categoriasSelecionadas.length === 0 ||
            categoriasSelecionadas.some(cat =>
                categoria.includes(cat)
            );

        return tituloOk && categoriaOk;
    });

    gerarCursos(cursosFiltrados);
    atualizarContador(cursosFiltrados.length);

    btnCarregarMais.style.display = 'none';
}

function alternarFiltro(botao, categoria) {

    if (categoriasSelecionadas.includes(categoria)) {

        categoriasSelecionadas =
            categoriasSelecionadas.filter(cat => cat !== categoria);

        botao.classList.remove('ativo');

    } else {

        categoriasSelecionadas.push(categoria);

        botao.classList.add('ativo');
    }

    aplicarFiltros();
}

inputBusca.addEventListener('input', aplicarFiltros);

btnDesign.addEventListener('click', () => {
    alternarFiltro(btnDesign, 'design');
});

btnBanco.addEventListener('click', () => {
    alternarFiltro(btnBanco, 'banco');
});

btnTecnologia.addEventListener('click', () => {
    alternarFiltro(btnTecnologia, 'tecnologia');
});

btnTodos.addEventListener('click', () => {

    categoriasSelecionadas = [];

    botoesFiltro.forEach(btn => {
        if (btn.id !== 'todos' && btn.id !== 'limpar') {
            btn.classList.remove('ativo');
        }
    });

    gerarCursos(cursos);
    atualizarContador(cursos.length);

    btnCarregarMais.style.display = 'none';
});

btnLimpar.addEventListener('click', () => {

    categoriasSelecionadas = [];
    inputBusca.value = '';

    botoesFiltro.forEach(btn =>
        btn.classList.remove('ativo')
    );

    gerarCursos(cursos.slice(0, 8));
    atualizarContador(cursos.length);

    btnCarregarMais.style.display = 'block';
});

function gerarCard(curso) {

    const tagColor = curso.categoria
        .toLowerCase()
        .replace(/\s+/g, '-');

    return `
        <a href="curso_in.html?curso=${curso.link}" class="course-card">
            <article class="card_curso bg-senary">
                <div class="dados" style="background-image: url('${curso.imagem}')">
                    <span class="tag ${tagColor}">
                        ${curso.categoria}
                    </span>
                </div>

                <div class="card__body">
                    <h3 class="color-primary">${curso.titulo}</h3>
                    <p class="color-primary">${curso.descricao}</p>
                    <span class="color-primary">${curso.horas} horas</span>
                </div>
            </article>
        </a>
    `;
}

function gerarCursos(listaCursos) {

    const mainCards = document.querySelector('#cards_cursos');

    mainCards.innerHTML = listaCursos
        .map(curso => gerarCard(curso))
        .join('');

    applyTheme(localStorage.getItem("theme"));
}

btnCarregarMais.addEventListener('click', () => {

    gerarCursos(cursos);

    atualizarContador(cursos.length);

    btnCarregarMais.style.display = 'none';
});