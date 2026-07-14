
const express = require("express");
const reservaController = require("../controllers/reservaController");
const router = express.Router();

router.post("/", reservaController.criarReserva);
router.get("/", reservaController.listarReservas);


module.exports = router;
