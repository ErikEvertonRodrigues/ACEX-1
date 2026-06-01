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



document.querySelector("#form").addEventListener("submit", async (e) => {
  e.preventDefault();

    const email = document.querySelector("#email").value;

    const telefone = document.querySelector("#telefone").value;

    const formData = new URLSearchParams();

    formData.append("email", email);
    formData.append("telefone", telefone);

    try {
      const resposta = await fetch("https://script.google.com/macros/s/AKfycbz_YCI1dEmE8eRqK2JdH16JH5fH9VlAKNfYS9VX217S1IIqrYFvcB5ddu_8oApiFqF1hA/exec",
        {
          method: "POST",
          body: formData
        }
      );

      const resultado = await resposta.json();

      alert(resultado.mensagem);

      if (resultado.sucesso) {
        document.querySelector("#form").reset();
      }

    } catch (erro) {
      alert("Erro ao enviar os dados.");
      console.error(erro);
    }

});