const hamburguer = document.querySelector(".hamburguer-container");
const navigation = document.querySelector(".navigation");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  navigation.classList.toggle("active");
});
