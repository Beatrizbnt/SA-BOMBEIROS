const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
app.use(express.json()); // Para analisar dados JSON no corpo da solicitação
app.use(express.urlencoded({ extended: true })); // Para analisar dados de formulário no corpo da solicitação

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/Pages/cadastro.html'));
});

app.use("/assets", express.static("assets")); // Configuração do middleware para servir arquivos estáticos da pasta "assets"
app.use("/img", express.static("img")); // Configuração do middleware para servir arquivos estáticos da pasta "img"
app.use("/Pages", express.static("Pages")); // Configuração do middleware para servir arquivos estáticos da pasta "pages"


const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sa_bombeiros'
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro de conexão com o banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL como ID ' + conexao.threadId);
});

router.post('/Pages/cadastro', (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    const sql = `INSERT INTO cadastro(nome_cadastro, telefone_cadastro, cpf_cadastro, senha_cadastro) 
                 VALUES ('${nome}', '${telefone}', '${cpf}', '${senha}')`;

    conexao.query(sql, (err, result) => {
        if (err) {
            res.send('Erro ao cadastrar usuário: ' + err.message);
        } else {
            res.send('Usuário cadastrado com sucesso');
        }
    });
});

app.use('/', router);

app.listen(8086, () => {
    console.log('O servidor está rodando na porta 8081');
  });