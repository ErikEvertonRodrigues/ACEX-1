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