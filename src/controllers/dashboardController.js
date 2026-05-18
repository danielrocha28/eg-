var dashboardModel = require("../models/dashboardModel");

function listarPerfis(req, res) {

    dashboardModel.listarPerfis()
        .then(function(resultado) {

            res.json(resultado);

        }).catch(function(erro) {

            console.log(erro);

            res.status(500).json(erro);

        });
}

module.exports = {
    listarPerfis
}