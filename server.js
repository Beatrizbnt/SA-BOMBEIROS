const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
app.use(express.json()); // Para analisar dados JSON no corpo da solicitação
app.use(express.urlencoded({ extended: true })); // Para analisar dados de formulário no corpo da solicitação

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'Pages', 'inicio.html'));
});

app.use("/assets", express.static("assets"));
app.use("/img", express.static("img"));
app.use("/Pages", express.static("Pages"));

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

    // Verificar se todos os campos estão preenchidos
    if (!nome || !telefone || !cpf || !senha) {
        return res.send('<script>alert("Por favor, preencha todos os campos."); window.location.href = "/Pages/cadastro.html";</script>');
    }

    const sql = `INSERT INTO cadastro(nome_cadastro, telefone_cadastro, cpf_cadastro, senha_cadastro) 
                 VALUES ('${nome}', '${telefone}', '${cpf}', '${senha}')`;

    conexao.query(sql, (err, result) => {
        if (err) {
            return res.send('<script>alert("Erro ao cadastrar usuário: ' + err.message + '"); window.location.href = "/Pages/cadastro.html";</script>');
        } else {
            console.log('Usuário cadastrado com sucesso');
            res.redirect('/Pages/principal.html');
        }
    });
});

router.post('/Pages/login', (req, res) => {
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    // Verificar se todos os campos estão preenchidos
    if (!cpf || !senha) {
        return res.send('<script>alert("Por favor, preencha todos os campos."); window.location.href = "/Pages/login.html";</script>');
    }

    const sql = `SELECT cpf_cadastro, senha_cadastro FROM cadastro WHERE cpf_cadastro = ? AND senha_cadastro = ?`;

    conexao.query(sql, [cpf, senha], (err, results) => {
        if (err) {
            return res.send('<script>alert("Erro ao realizar o login: ' + err.message + '"); window.location.href = "/Pages/login.html";</script>');
        } else {
            if (results.length > 0) {
                // Login bem-sucedido,
                console.log("Login realizado com sucesso!");
                res.redirect('/Pages/principal.html');
            } else {
                // CPF ou senha inválidos, redirecione para a página de login
                return res.send('<script>alert("CPF ou senha inválidos."); window.location.href = "/Pages/login.html";</script>');
            }
        }
    });
});

app.use('/', router);

app.listen(8084, () => {
    console.log('O servidor está rodando na porta 8084');
}); 