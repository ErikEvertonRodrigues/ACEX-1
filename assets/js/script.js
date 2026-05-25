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
