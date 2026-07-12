const express = require("express");
const { criarJogador, listarJogadores } = require("../controllers/jogadorController");


const router = express.Router();

router.post("/", criarJogador);
router.get("/", listarJogadores);

module.exports = router;