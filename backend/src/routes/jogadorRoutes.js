const express = require("express");
const { criarJogador,
        listarJogadores,
        buscarJogadorPorId,
        atualizarJogador,
        excluirJogador,
     } = require("../controllers/jogadorController");


const router = express.Router();

router.post("/", criarJogador);
router.get("/", listarJogadores);
router.get("/:id", buscarJogadorPorId);
router.put("/:id", atualizarJogador);
router.delete("/:id", excluirJogador);

module.exports = router;