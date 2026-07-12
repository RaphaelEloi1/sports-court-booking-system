const prisma = require("../database");

async function criarJogador(request, response) {
  try {
    const { nome, email, telefone } = request.body;

    if (!nome || !email || !telefone) {
      return response.status(400).json({
        mensagem: "Nome, e-mail e telefone são obrigatórios",
      });
    }

    const jogador = await prisma.jogador.create({
      data: {
        nome,
        email,
        telefone,
      },
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
module.exports = {
  criarJogador,
  listarJogadores,
};