function validarQuadra(dados, atualizacao = false) {
  const erros = [];
  const { nome, modalidade, localizacao } = dados;

  const isTextoInvalido = (valor) =>
    typeof valor !== "string" || valor.trim().length === 0;

  if (!atualizacao) {
    if (nome === undefined || nome === null) {
      erros.push("O nome da quadra é obrigatório.");
    }

    if (modalidade === undefined || modalidade === null) {
      erros.push("A modalidade da quadra é obrigatória.");
    }

    if (localizacao === undefined || localizacao === null) {
      erros.push("A localização da quadra é obrigatória.");
    }
  }

  if (
    atualizacao &&
    nome == null &&
    modalidade == null &&
    localizacao == null
  ) {
    erros.push("Informe pelo menos um campo para atualizar.");
  }

  if (nome != null) {
    if (isTextoInvalido(nome)) {
      erros.push("O nome da quadra deve ser um texto válido.");
    } else if (nome.trim().length < 3) {
      erros.push("O nome da quadra deve ter pelo menos 3 caracteres.");
    }
  }

  if (modalidade != null && isTextoInvalido(modalidade)) {
    erros.push("A modalidade deve ser um texto válido.");
  }

  if (localizacao != null && isTextoInvalido(localizacao)) {
    erros.push("A localização deve ser um texto válido.");
  }

  return erros;
}

module.exports = {
  validarQuadra,
};
