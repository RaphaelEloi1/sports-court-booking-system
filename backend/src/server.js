const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jogadorRoutes = require("./routes/jogadorRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const prisma = require("./database");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/jogadores", jogadorRoutes);
app.use("/reservas", reservaRoutes);


app.get("/", (request, response) => {
  return response.json({
    mensagem: "API do Sistema de Agendamento de Quadras",
  });
});

const port = process.env.PORT || 3000;

app.get("/teste-banco", async (request, response) => {
  try {
    const jogadores = await prisma.jogador.findMany();

    return response.json({
      mensagem: "Conexão realizada com sucesso",
      jogadores,
    });

  } catch (error) {
    console.error(error);

    return response.status(500).json({
      mensagem: "Erro ao conectar com o banco",
    });
  }
});
app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});