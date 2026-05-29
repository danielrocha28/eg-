var database = require("../database/config");

function listarPerfis() {

    var instrucaoSql = `
        SELECT 
            p.nome,
            COUNT(*) AS total
        FROM resultado r
        JOIN perfil p
            ON r.fkPerfil = p.id
        GROUP BY p.nome
        ORDER BY total DESC;
    `;

    return database.executar(instrucaoSql);
}

function obterDadosPerfilUsuario(idUsuario) {
    var instrucaoSql = `
    SELECT 
        alternativa_escolhida, 
        COUNT(*) AS total
    FROM 
        resposta
    WHERE 
        fkUsuario = ${idUsuario}
    GROUP BY 
        alternativa_escolhida
    ORDER BY 
        total DESC;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarPerfis,
    obterDadosPerfilUsuario
}