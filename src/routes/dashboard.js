var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// Rota para o Gráfico Radar
router.get("/perfis", function(req, res) {
    dashboardController.listarPerfis(req, res);
});

// Rota para o Gráfico Donut (Individual do Usuário)
router.get("/respostas/:idUsuario", function(req, res) {
    dashboardController.obterDadosPerfilUsuario(req, res);
});

module.exports = router;