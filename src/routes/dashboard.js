var express = require("express");
var router = express.Router();

var quizController = require("../controllers/dashboardController");

router.get("/perfis", function(req, res) {
    dashboardController.listarPerfis(req, res);
});

 module.exports = router;