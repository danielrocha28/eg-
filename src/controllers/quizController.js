var quizModel = require("../models/quizModel");


async function postarPergunta(req, res) {
    try {
        const enunciado = req.body.enunciado;
        
        if (!enunciado || enunciado.trim() === "") {
            return res.status(400).json({
                mensagem: "Campo obrigatório: enunciado"
            });
        }

        const resultado = await quizModel.postarPergunta(enunciado);
        
        res.status(201).json({
            mensagem: "Pergunta cadastrada com sucesso!",
            id: resultado.insertId
        });
        
    } catch (erro) {
        console.error("Erro ao cadastrar a pergunta:", erro);
        
        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
}

// POST /resposta
function cadastrarResposta(req, res) {
    var alternativaEscolhida = req.body.alternativaEscolhida;
    var idUsuario = req.body.fkUsuario;
    var idPergunta = req.body.fkPergunta;

    if (!alternativaEscolhida || !idUsuario || !idPergunta) {
        return res.status(400).json({
            mensagem: "Campos obrigatórios: alternativaEscolhida, idUsuario, idPergunta"
        });
    }

    quizModel.cadastrarResposta(alternativaEscolhida, idUsuario, idPergunta)
        .then(function (resultado) {
            res.status(201).json({
                mensagem: "Resposta cadastrada com sucesso!"
            });
        })
        .catch(function (erro) {
            console.error("Erro ao cadastrar resposta:", erro);

            res.status(500).json({
                mensagem: "Erro interno no servidor"
            });
        });
}

function listarPerguntas(req, res) {

    quizModel.listarPerguntas()
        .then(function(resultado) {

            res.status(200).json(resultado);

        }).catch(function(erro) {

            console.error("Erro ao listar perguntas:", erro);

            res.status(500).json({
                mensagem: "Erro interno no servidor"
            });
        });
}

function gerarResultado(req, res) {

    var idUsuario = req.params.idUsuario;

    quizModel.gerarResultado(idUsuario)
        .then(function(resultado) {

            var letra = resultado[0].alternativa_escolhida;

            var mapaPerfis = {
                A: 1,
                B: 2,
                C: 3,
                D: 4,
                E: 5,
                F: 6
            };

            var fkPerfil = mapaPerfis[letra];

            return quizModel.salvarResultado(idUsuario, fkPerfil);

        })
        .then(function() {
            res.status(200).send("Resultado salvo!");
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarResultado(req, res) {

    var idUsuario = req.params.idUsuario;

    quizModel.buscarResultado(idUsuario)
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}



// // POST /quiz
// function cadastrarQuiz(req, res) {
//     var titulo = req.body.titulo;
//     var descricao = req.body.descricao; 
//     var idUsuario = req.body.idUsuario;

//     // Validação básica
//     if (!titulo || !descricao || !idUsuario) {
//         return res.status(400).json({
//             mensagem: "Campos obrigatórios: titulo, descricao, idUsuario"
//         });
//     }

//     quizModel.cadastrarQuiz(titulo, descricao, idUsuario)
//         .then(function(resultado) {
//             res.status(201).json({
//                 mensagem: "Quiz cadastrado com sucesso!",
//                 id: resultado.insertId
//             });
//         })
//         .catch(function(erro) {
//             console.error("Erro ao cadastrar quiz:", erro);
//             res.status(500).json({ mensagem: "Erro interno no servidor" });
//         });
// }

// // GET /quiz/:idUsuario
// function listarQuizzes(req, res) {
//     var idUsuario = req.params.idUsuario;

//     quizModel.listarQuizzesPorUsuario(idUsuario)
//         .then(function(quizzes) {
//             if (quizzes.length === 0) {
//                 return res.status(404).json({ mensagem: "Nenhum quiz encontrado" });
//             }
//             res.status(200).json(quizzes);
//         })
//         .catch(function(erro) {
//             console.error("Erro ao listar quizzes:", erro);
//             res.status(500).json({ mensagem: "Erro interno no servidor" });
//         });
// }

// // GET /quiz/:idQuiz/perguntas
// function listarPerguntas(req, res) {
//     var idQuiz = req.params.idQuiz;

//     quizModel.listarPerguntasPorQuiz(idQuiz)
//         .then(function(perguntas) {
//             if (perguntas.length === 0) {
//                 return res.status(404).json({ mensagem: "Nenhuma pergunta encontrada" });
//             }
//             res.status(200).json(perguntas);
//         })
//         .catch(function(erro) {
//             console.error("Erro ao listar perguntas:", erro);
//             res.status(500).json({ mensagem: "Erro interno no servidor" });
//         });
// }


// // GET /resultado/:idUsuario/:idQuiz
// function resultadoDoQuiz(req, res) {
//     var idUsuario = req.params.idUsuario;
//     var idQuiz = req.params.idQuiz;

//     quizModel.buscarResultado(idUsuario, idQuiz)
//         .then(function(resultado) {
//             if (resultado.length === 0) {
//                 return res.status(404).json({ mensagem: "Resultado não encontrado" });
//             }
//             res.status(200).json(resultado[0]);
//         })
//         .catch(function(erro) {
//             console.error("Erro ao buscar resultado:", erro);
//             res.status(500).json({ mensagem: "Erro interno no servidor" });
//         });
// }

module.exports = {
    postarPergunta,
    cadastrarResposta,
    // listarQuizzes,
     listarPerguntas,
     gerarResultado,
     buscarResultado
    // resultadoDoQuiz
};