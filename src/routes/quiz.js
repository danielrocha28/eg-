var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/perguntas", function(req, res) {
    quizController.postarPergunta(req, res);
});

router.get("/perguntas", function(req, res) {
    quizController.listarPerguntas(req, res);
});


router.post("/resposta", function(req, res) {
    quizController.cadastrarResposta(req, res);
});

router.get("/respostas/:idUsuario", function(req, res) {
    quizController.listarRespostas(req, res);
});


router.post("/resultado/:idUsuario", function(req, res) {
    quizController.gerarResultado(req, res);
});

router.get("/resultado/:idUsuario", function(req, res) {
    quizController.buscarResultado(req, res);
});

router.get("/perfis", function(req, res) {
    quizController.listarPerfis(req, res);
});


module.exports = router;