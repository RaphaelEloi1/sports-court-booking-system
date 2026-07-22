const express = require("express");
const quadraController = require("../controllers/quadraController");

const router = express.Router();
router.post("/", quadraController.criarQuadra);
router.get("/", quadraController.listarQuadras);
router.put("/:id", quadraController.atualizarQuadra);
router.delete("/:id", quadraController.deletarQuadra);

module.exports = router;
