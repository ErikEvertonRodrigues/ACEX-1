const hamburguer = document.querySelector(".hamburguer-container");
const navigation = document.querySelector(".navigation-mob");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  navigation.classList.toggle("active");
});

const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  if (link.href == window.location.href) {
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
