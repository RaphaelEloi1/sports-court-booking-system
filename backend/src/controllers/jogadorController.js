const prisma = require("../database");
const { validarJogador } = require("../validations/jogadorValidation");

async function criarJogador(request, response) {
  try {
    const validacao = validarJogador(request.body);

    if (!validacao.valido) {
      return response.status(400).json({
        mensagem: "Dados do jogador inválidos",
        erros: validacao.erros,
      });
    }

    const jogador = await prisma.jogador.create({
      data: validacao.dados,
    });

    return response.status(201).json(jogador);
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return response.status(409).json({
        mensagem: "Já existe um jogador com este e-mail",
      });
    }

    return response.status(500).json({
      mensagem: "Erro ao cadastrar jogador",
    });
  }
}
async function listarJogadores(request, response) {
  try {
    const jogadores = await prisma.jogador.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return response.status(200).json(jogadores);
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: "Erro ao listar jogadores",
    });
  }
}
async function buscarJogadorPorId(request, response) {
  try {
    const { id } = request.params;
    const jogadorId = Number(id);

    if (!Number.isInteger(jogadorId) || jogadorId <= 0) {
      return response.status(400).json({
        mensagem: "O ID do jogador é inválido",
      });
    }

    const jogador = await prisma.jogador.findUnique({
      where: {
        id: jogadorId,
      },
    });

    if (!jogador) {
      return response.status(404).json({
        mensagem: "Jogador não encontrado",
      });
    }

    return response.status(200).json(jogador);
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: "Erro ao buscar jogador",
    });
  }
}

async function atualizarJogador(request, response) {
  try {
    const { id } = request.params;
    const jogadorId = Number(id);

    if (!Number.isInteger(jogadorId) || jogadorId <= 0) {
      return response.status(400).json({
        mensagem: "O ID do jogador é inválido",
      });
    }

    const validacao = validarJogador(request.body);

    if (!validacao.valido) {
      return response.status(400).json({
        mensagem: "Dados do jogador inválidos",
        erros: validacao.erros,
      });
    }

    const jogadorExiste = await prisma.jogador.findUnique({
      where: {
        id: jogadorId,
      },
    });

    if (!jogadorExiste) {
      return response.status(404).json({
        mensagem: "Jogador não encontrado",
      });
    }

    const jogadorAtualizado = await prisma.jogador.update({
      where: {
        id: jogadorId,
      },
      data: validacao.dados,
    });

    return response.status(200).json(jogadorAtualizado);
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return response.status(409).json({
        mensagem: "Já existe outro jogador com este e-mail",
      });
    }

    return response.status(500).json({
      mensagem: "Erro ao atualizar jogador",
    });
  }
}

async function excluirJogador(request, response) {
  try {
    const { id } = request.params;
    const jogadorId = Number(id);

    if (!Number.isInteger(jogadorId) || jogadorId <= 0) {
      return response.status(400).json({
        mensagem: "O ID do jogador é inválido",
      });
    }

    const jogadorExiste = await prisma.jogador.findUnique({
      where: {
        id: jogadorId,
      },
    });

    if (!jogadorExiste) {
      return response.status(404).json({
        mensagem: "Jogador não encontrado",
      });
    }

    await prisma.jogador.delete({
      where: {
        id: jogadorId,
      },
    });

    return response.status(200).json({
      mensagem: "Jogador excluído com sucesso",
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: "Erro ao excluir jogador",
    });
  }
}
module.exports = {
  criarJogador,
  listarJogadores,
  buscarJogadorPorId,
  atualizarJogador,
  excluirJogador,
};
