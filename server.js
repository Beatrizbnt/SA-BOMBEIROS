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
        
    }

    const sql = `INSERT INTO usuario(nome_usuario, telefone_usuario, cpf_usuario, senha_usuario) 
                 VALUES ('${nome}', '${telefone}', '${cpf}', '${senha}')`;

    conexao.query(sql, (err, result) => {
        if (err) {
            
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
       
    }

    const sql = `SELECT cpf_cadastro, senha_cadastro FROM cadastro WHERE cpf_cadastro = ? AND senha_cadastro = ?`;

    conexao.query(sql, [cpf, senha], (err, results) => {
        if (err) {
            
        } else {
            if (results.length > 0) {
                // Login bem-sucedido,
                console.log("Login realizado com sucesso!");
                res.redirect('/Pages/principal.html');
            } else {
                // CPF ou senha inválidos, redirecione para a página de login
                
            }
        }
    });
});


router.post('/Pages/teste', (req, res) => {
    const pacienteIdentificado = req.body.pacienteIdentificado;
    const nome_paciente = req.body.nome_paciente;

   


    const sql = `INSERT INTO informacao_paciente(identificacao_paciente, nome_paciente) 
                 VALUES ('${pacienteIdentificado}','${nome_paciente}')`;

    conexao.query(sql, (err, result) => {
        if (err) {
            console.log('Erro no envio dos dados: ' + err.message);
        }else{
            console.log('Dados enviados com sucesso');
            res.redirect('/Pages/principal.html');
        }
    });

    if (!nome_paciente) {
        console.log('O nome do paciente não foi fornecido ou é inválido.');
        // Lógica adicional, se necessário
    } else {
        const sql = `INSERT INTO informacao_paciente(nome_paciente) VALUES (?)`;
    
        conexao.query(sql, [nome_paciente], (err, result) => {
            if (err) {
                console.log('Erro no envio dos dados: ' + err.message);
            } else {
                
            }
        });

  
    }


    conexao.query(sql, [pacienteIdentificado], (err, result) => {
        if (err) {
            console.log('Erro ao inserir no banco de dados: ' + err.message);
            // Trate o erro adequadamente
        } else {
            console.log('Dados inseridos com sucesso');
            // Redirecione ou envie uma resposta ao cliente, se necessário
        }
    });
});


app.use('/', router);

app.listen(8083, () => {
    console.log('O servidor está rodando na porta 8083');
}); 