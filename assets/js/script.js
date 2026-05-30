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
  const menuClicked = navigation.contains(event.target);
  const hamburguerClicked = hamburguer.contains(event.target);

  if (!menuClicked && !hamburguerClicked && navigation.classList.contains('active')) {
    toggle();
  }
});

window.addEventListener('scroll', () => {
  if (navigation.classList.contains('active')) {
    toggle();
  }
}, {passive: true});

function toggle() {
  hamburguer.classList.toggle("active");
  navigation.classList.toggle("active");
}
