var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");
router.get("/perfis", function(req, res) {
    dashboardController.listarPerfis(req, res);
});
router.get("/respostas/:idUsuario", function(req, res) {
    dashboardController.obterDadosPerfilUsuario(req, res);
});

module.exports = router;