
const express = require("express");
const reservaController = require("../controllers/reservaController");
const router = express.Router();

router.post("/", reservaController.criarReserva);

module.exports = router;
