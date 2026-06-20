const hamburguer = document.querySelector(".hamburguer-container");
const navigation = document.querySelector(".navigation-mob");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  navigation.classList.toggle("active");
});

const links = document.querySelectorAll('.nav-link');

function normalize(path) {
  path = path.replace(/index\.html$/, '');
  path = path.replace(/\.html$/, '');

  if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
  }

  return path;
}

const currentPage = normalize(window.location.pathname);

links.forEach(link => {
  const path = normalize(link.pathname);

  console.log(`${currentPage} --- ${path}`);

  if (path === currentPage) {
    link.classList.add('active');
  }
});

document.addEventListener('click', (event) => {
  const hamburguerClicked = hamburguer.contains(event.target);
  const navigationClicked = navigation.contains(event.target);

  if (!hamburguerClicked && !navigationClicked && navigation.classList.contains("active")) {
    toggle();
  }
});

window.addEventListener('scroll', () => {
  if (hamburguer.classList.contains('active') && navigation.classList.contains('active')) {
    toggle();
  }
});

function toggle() {
  hamburguer.classList.toggle("active");
  navigation.classList.toggle("active");
}
