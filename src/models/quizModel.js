var database = require("../database/config");


function postarPergunta(enunciado) {
    var instrucaoSql = `
    INSERT INTO pergunta(enunciado) 
      VALUES 
        ('${enunciado}')
    `;
     console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarResposta(alternativa_escolhida, fkUsuario, fkPergunta) {
     var instrucaoSql = `
    INSERT INTO resposta(fkUsuario, fkPergunta, alternativa_escolhida) 
      VALUES 
        ('${fkUsuario}', '${fkPergunta}', '${alternativa_escolhida}')
    `;
     console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarRespostasDoUsuario(fkUsuario) {
    var instrucaoSql = `
      SELECT fkUsuario as idUsuario,
             fkPergunta as pergunta_vigente,
             alternativa_escolhida
        FROM resposta
        WHERE fkUsuario = ${fkUsuario}
          `;
    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPerguntas() {

    var instrucaoSql = `
        SELECT
            id,
            enunciado
        FROM pergunta;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}




module.exports = {
    postarPergunta,
   cadastrarResposta,
    listarRespostasDoUsuario,
    listarPerguntas
};