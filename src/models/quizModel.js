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

function gerarResultado(idUsuario) {

    var instrucaoSql = `
        SELECT alternativa_escolhida, COUNT(*) AS total
        FROM resposta
        WHERE fkUsuario = ${idUsuario}
        GROUP BY alternativa_escolhida
        ORDER BY total DESC
        LIMIT 1;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function salvarResultado(idUsuario, fkPerfil) {

    var instrucaoSql = `
        INSERT INTO resultado (fkUsuario, fkPerfil)
        VALUES (${idUsuario}, ${fkPerfil})
        ON DUPLICATE KEY UPDATE
        fkPerfil = VALUES(fkPerfil);
    `;

    return database.executar(instrucaoSql);
}

function buscarResultado(idUsuario) {

    var instrucaoSql = `
        SELECT 
            p.nome,
            p.descricao
        FROM resultado r
        JOIN perfil p
            ON r.fkPerfil = p.id
        WHERE r.fkUsuario = ${idUsuario};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}




module.exports = {
    postarPergunta,
    cadastrarResposta,
    listarRespostasDoUsuario,
    listarPerguntas,
    gerarResultado,
    salvarResultado,
    buscarResultado
};