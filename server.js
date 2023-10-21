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
    password: '',
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
    // tabela paciente
    const pacienteIdentificado = req.body.pacienteIdentificado;
    const data = req.body.data;
    const sexo = req.body.sexo;
    const gestante = req.body.gestante;
    const nome_paciente = req.body.nome_paciente;
    const rg_cpf_paciente = req.body.rg_cpf_paciente;
    const idade_paciente = req.body.idade_paciente;
    const telefone_paciente = req.body.telefone_paciente;
    // tabela acompanhante
    const acompanhante = req.body.acompanhante;
    const nome_acompanhante = req.body.nome_acompanhante;
    const idade_acompanhante = req.body.idade_acompanhante;
// tabela anamnese emergencial
    const sinais_sintomas = req.body.sinais_sintomas;
    const aconteceu = req.body.aconteceu;
    const uso_medicacao = req.body.uso_medicacao;
    const quais_medicacao = req.body.quais_medicacao;
    const horas_medicacao = req.body.horas_medicacao;
    const alergico = req.body.alergico;
    const especi_alergico = req.body.especi_alergico;
    const aliment_liquid = req.body.aliment_liquid;
    const horario_aliment_liquid = req.body.horario_aliment_liquid_aliment_liquid;

 // tabela paciente
    const sqlPaciente = `INSERT INTO informacao_paciente (identificacao_paciente, data_ocorrencia, 
        sexo_paciente, gestante_paciente, nome_paciente, rg_cpf_paciente, idade_paciente, telefone_paciente) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
 // tabela acompanhante
    const sqlAcompanhante = `INSERT INTO informacao_acompanhante (identificacao_acompanhante, nome_acompanhante, idade_acompanhante) 
                             VALUES (?, ?, ?)`;
// tabela anamnese emergencial
     const sqlAnamneseEmergencial = `INSERT INTO anamnese_emergencia (sinais_sintomas_anamnese, aconteceu_outras_vezes_anamnese,
         faz_uso_medicacao_anamnese, horario_ultima_medicacao_anamnese, quais_medicacao_anamnese, alergico_anamnese,
         especificacao_alergico_anamnese, ingeriu_alimento_liquido_anamnese, horario_ingeriu_anamnese) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;                         

    conexao.query(sqlPaciente, [pacienteIdentificado, data, sexo, gestante, nome_paciente, 
        rg_cpf_paciente, idade_paciente, telefone_paciente], (errPaciente, resultPaciente) => {
        if (errPaciente) {
            console.log('Erro ao inserir dados do paciente: ' + errPaciente.message);
            // Trate o erro do paciente adequadamente
        } else {
            console.log('Dados do paciente inseridos com sucesso');
            // Inserir dados do acompanhante após o sucesso da inserção do paciente
            conexao.query(sqlAcompanhante, [acompanhante, nome_acompanhante, idade_acompanhante], (errAcompanhante, resultAcompanhante) => {
                if (errAcompanhante) {
                    console.log('Erro ao inserir dados do acompanhante: ' + errAcompanhante.message);
                    // Trate o erro do acompanhante adequadamente
                } else {
                    console.log('Dados do acompanhante inseridos com sucesso');
                    conexao.query(sqlAnamneseEmergencial, [sinais_sintomas, aconteceu, uso_medicacao, horas_medicacao, quais_medicacao,
                         alergico, especi_alergico, aliment_liquid, horario_aliment_liquid], (errAnamnese, resultAnamnese) => {
                        if (errAnamnese) {
                            console.log('Erro ao inserir dados da anamnese emergencial: ' + errAnamnese.message);
                            // Trate o erro da anamnese emergencial adequadamente
                        } else {
                            console.log('Dados da anamnese emergencial inseridos com sucesso');
                            // Redirecione ou envie uma resposta ao cliente, se necessário
                            res.redirect('/Pages/gerarrelatorio.html');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
app.use('/', router);

app.listen(8080, () => {
    console.log('O servidor está rodando na porta 8080');
}); 