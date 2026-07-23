const prisma = require("../database");
const { validarQuadra } = require("../validations/quadraValidation");

async function criarQuadra(request, response) {
  try {
    const dados = request.body;

    const erros = validarQuadra(dados);

    if (erros.length > 0) {
      return response.status(400).json({ erros });
    }

    const novaQuadra = await prisma.quadra.create({
      data: {
        nome: dados.nome,
        modalidade: dados.modalidade,
        localizacao: dados.localizacao,
      },
    });

    return response.status(201).json(novaQuadra);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ erro: "Erro interno ao criar quadra." });
  }
}

async function listarQuadras(request, response) {
  try {
    const quadras = await prisma.quadra.findMany();

    return response.status(200).json(quadras);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ erro: "Erro ao buscar quadras." });
  }
}

async function atualizarQuadra(request, response) {
  try {
    const { id } = request.params;
    const dados = request.body;

    const erros = validarQuadra(dados, true);

    if (erros.length > 0) {
      return response.status(400).json({ erros });
    }

    const quadraAtualizada = await prisma.quadra.update({
      where: { id: Number(id) },
      data: dados,
    });

    return response.status(200).json(quadraAtualizada);
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return response.status(404).json({ erro: "Quadra não encontrada." });
    }
    return response
      .status(500)
      .json({ erro: "Erro interno ao atualizar quadra." });
  }
}

async function deletarQuadra(request, response) {
  try {
    const { id } = request.params;

    await prisma.quadra.delete({
      where: { id: Number(id) },
    });

    return response.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return response.status(404).json({ erro: "Quadra não encontrada." });
    }
    return response
      .status(500)
      .json({ erro: "Erro interno ao deletar quadra." });
  }
}

module.exports = {
  criarQuadra,
  listarQuadras,
  atualizarQuadra,
  deletarQuadra,
};
