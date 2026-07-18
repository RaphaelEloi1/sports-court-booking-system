function validarJogador(dados = {}) {
  const erros = [];

  const nome =
    typeof dados.nome === "string"
      ? dados.nome.trim()
      : "";

  const email =
    typeof dados.email === "string"
      ? dados.email.trim().toLowerCase()
      : "";

  const telefone =
    typeof dados.telefone === "string"
      ? dados.telefone.trim()
      : "";

  if (nome.length < 3 || nome.split(/\s+/).length < 2) {
    erros.push("Informe o nome completo do jogador");
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formatoEmail.test(email)) {
    erros.push("Informe um e-mail válido");
  }

  const numerosTelefone = telefone.replace(/\D/g, "");

  if (numerosTelefone.length < 10 || numerosTelefone.length > 11) {
    erros.push("O telefone deve possuir 10 ou 11 números");
  }

  return {
    valido: erros.length === 0,
    erros,
    dados: {
      nome,
      email,
      telefone,
    },
  };
}

module.exports = {
  validarJogador,
};