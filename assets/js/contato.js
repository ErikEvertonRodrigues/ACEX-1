document.querySelector("#form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const botao = form.querySelector('button[type="submit"]');
  const email = document.querySelector("#email").value.trim();
  const telefone = document.querySelector("#telefone").value.trim();

  if (!email || !telefone) {
    alert("Preencha email e telefone.");
    return;
  }

  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("telefone", telefone);

  // Evita duplo envio e dá feedback visual
  botao.disabled = true;
  const textoOriginal = botao.textContent;
  botao.textContent = "Enviando...";

  try {
    const resposta = await fetch(
      "https://script.google.com/macros/s/AKfycbybEdePOnhbX7Cd_raOJ69Eo-J6m3WGm9Ejc1kKGwmJbiYR_7TslzI1bMTrL_D8fVxlxA/exec",
      {
        method: "POST",
        body: formData
      }
    );

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const resultado = await resposta.json();

    alert(resultado.mensagem);

    if (resultado.sucesso) {
      form.reset();
    }

  } catch (erro) {
    alert("Erro ao enviar os dados. Tente novamente.");
    console.error(erro);

  } finally {
    botao.disabled = false;
    botao.textContent = textoOriginal;
  }
});