var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

// POSTAR PERGUNTAS
router.post("/perguntas", function(req, res) {
    quizController.postarPergunta(req, res);
});

// LISTAR PERGUNTAS
router.get("/perguntas", function(req, res) {
    quizController.listarPerguntas(req, res);
});

// CADASTRAR RESPOSTA
router.post("/resposta", function(req, res) {
    quizController.cadastrarResposta(req, res);
});


// LISTAR RESPOSTAS DO USUÁRIO
router.get("/respostas/:idUsuario", function(req, res) {
    quizController.listarRespostas(req, res);
});


// GERAR RESULTADO
router.post("/resultado/:idUsuario", function(req, res) {
    quizController.gerarResultado(req, res);
});


// BUSCAR RESULTADO DO USUÁRIO
router.get("/resultado/:idUsuario", function(req, res) {
    quizController.buscarResultado(req, res);
});


// LISTAR PERFIS
router.get("/perfis", function(req, res) {
    quizController.listarPerfis(req, res);
});


module.exports = router;