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

router.post('cadastro', (req, res) => {
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

// ... Your existing code for serving static files and database connection ...

// Route for handling login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const sql = `SELECT email, senha FROM usuario WHERE email = ? AND senha = ?`;

    conexao.query(sql, [email, senha], (err, results) => {
        if (err) {
            res.send('Erro ao realizar o login: ' + err.message);
        } else {
            if (results.length > 0) {
                // Successful login, redirect to a different page (e.g., Google)
                res.redirect('https://www.google.com');
            } else {
                // Invalid email or password, redirect to login page
                res.redirect('/login.html');
                // Alternatively, you can send an error message to the client
                // res.send('E-mail ou senha inválidos');
            }
        }
    });
});


app.use('/', router);

app.listen(8082, () => {
    console.log('O servidor está rodando na porta 8082');
  });