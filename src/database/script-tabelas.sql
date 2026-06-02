CREATE DATABASE ego;
USE ego;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(50),
    senha VARCHAR(50)
);

CREATE TABLE pergunta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enunciado VARCHAR(456)
);

CREATE TABLE resposta (
    fkUsuario INT,
    fkPergunta INT,
    alternativa_escolhida CHAR(1),
    PRIMARY KEY (fkUsuario, fkPergunta),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkPergunta) REFERENCES pergunta(id)
);


CREATE TABLE perfil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    descricao TEXT
);

CREATE TABLE resultado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT UNIQUE,
    fkPerfil INT, -- Chave estrangeira ligando ao perfil
    gerado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id),
    FOREIGN KEY (fkPerfil) REFERENCES perfil(id)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

DROP DATABASE ego;

INSERT INTO pergunta (enunciado) VALUES 
('Como você encara a rotina diária e as tarefas repetitivas da vida?'),
('Se você pudesse resumir o maior desafio de estar vivo, qual seria?'),
('Diante de um erro ou fracasso marcante do passado, qual é a sua postura?'),
('O que a palavra "Angústia" evoca no seu cotidiano?'),
('Como você enxerga as leis morais e os valores da sociedade?'),
('Se o universo e o divino silenciarem perante suas maiores dúvidas, o que você faz?'),
('Qual é a sua relação com o seu próprio corpo?'),
('Para você, o que significa viver de forma "autêntica"?'),
('Como você enxerga o desfecho final da jornada humana: a morte?'),
('Se você tivesse que escolher o lema do seu livro de cabeceira, qual seria?');

SELECT * FROM pergunta;

SELECT * FROM usuario;
SELECT * FROM resultado;

TRUNCATE TABLE pergunta;

DROP TABLE resposta;

SELECT alternativa_escolhida, COUNT(*) AS total
FROM resposta
WHERE fkUsuario = 1
GROUP BY alternativa_escolhida
ORDER BY total DESC;

INSERT INTO perfil (nome, descricao) VALUES
('Filosofia do Absurdo', 'A vida não possui sentido objetivo, mas mesmo assim continuamos vivendo e criando significado diante do absurdo.'),

('Liberdade Radical', 'O ser humano é totalmente livre e responsável por suas escolhas e consequências.'),

('Fé e Angústia', 'A existência envolve angústia, incerteza e um salto de fé diante do desconhecido.'),

('Niilismo', 'Não existem significados absolutos, valores universais ou propósito intrínseco na existência.'),

('Existencialismo Humanista', 'O ser humano constrói sua essência através das escolhas, relações e responsabilidade ética.'),

('Existencialismo Fenomenológico', 'A experiência subjetiva e a percepção individual moldam a compreensão da realidade.');

  SELECT 
            p.nome,
            COUNT(*) AS total
        FROM resultado r
        JOIN perfil p
            ON r.fkPerfil = p.id
        GROUP BY p.nome
        ORDER BY total DESC;

CREATE VIEW vwPerfil AS   
	SELECT 
            p.nome,
            COUNT(*) AS total
        FROM resultado r
        JOIN perfil p
            ON r.fkPerfil = p.id
        GROUP BY p.nome
        ORDER BY total DESC;
        
        SELECT * FROM vwPerfil;
        
SELECT * FROM usuario;

ALTER TABLE aviso MODIFY COLUMN descricao VARCHAR(500);