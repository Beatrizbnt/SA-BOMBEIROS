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
    // tabela paciente
    const pacienteIdentificado = req.body.pacienteIdentificado;
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
    const horario_aliment_liquid = req.body.horario_aliment_liquid;
    // tabela anamnese gestacional
    const periodo_gestacao = req.body.periodo_gestacao;
    const pre_natal = req.body.pre_natal;
    const nome_medico = req.body.nome_medico;
    const complicacoes = req.body.complicacoes;
    const primeiro_filho = req.body.primeiro_filho;
    const horas_contracoes = req.body.horas_contracoes;
    const tempo_contracoes = req.body.tempo_contracoes;
    const intervalo_contracoes = req.body.intervalo_contracoes;
    const quadril_pressao = req.body.quadril_pressao;
    const ruptura_bolsa = req.body.ruptura_bolsa;
    const inspecao_visual = req.body.inspecao_visual;
    const parto_realizado = req.body.parto_realizado;
    const sexo_bebe = req.body.sexo_bebe;
    const horas_nascimento = req.body.horas_nascimento;
    const nome_bebe = req.body.nome_bebe;
    // Tabela tipo de ocorrência pré hospitalar
    const tipo_ocorrencia = req.body.tipo_ocorrencia;
    const tipo_ocorrencia_outro = req.body.tipo_ocorrencia_outro;
    // Tabela problemas encontrados suspeitos
    const psiquiatrico = req.boby.psiquiatrico;
    const respiratorio_dpoc = req.body.psiquiatrico;
    const respiratorio_inalacao_fumaca = req.body.respiratorio_inalacao_fumaca;
    const diabetes_hiper = req.body.diabetes_hiper;
    const diabetes_hipo = req.body.diabetes_hipo;
    const obstetrico_parto = req.body.obstetrico_parto;
    const obstetrico_gestante = req.body.obstetrico_gestante;
    const obstetrico_hemorragia = req.body.obstetrico_hemorragia;
    const transporte_aereo = req.body.transporte_aereo;
    const transporte_clinico = req.body.transporte_clinico;
    const transporte_emergencial = req.body.transporte_emergencial;
    const transporte_pos_trauma = req.body.transporte_pos_trauma;
    const transporte_samu = req.body.transporte_samu;
    const transporte_sem_remocao = req.body.transporte_sem_remocao;
    const transporte_outro = req.body.transporte_outro;
    const problemas_suspeitos_outro = req.body.problemas_suspeitos_outro;
    

    // tabela paciente
    const sqlPaciente = `INSERT INTO informacao_paciente (identificacao_paciente, 
        sexo_paciente, gestante_paciente, nome_paciente, rg_cpf_paciente, idade_paciente, telefone_paciente) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    // tabela acompanhante
    const sqlAcompanhante = `INSERT INTO informacao_acompanhante (identificacao_acompanhante, nome_acompanhante, idade_acompanhante) 
                             VALUES (?, ?, ?)`;
    // tabela anamnese emergencial
    const sqlAnamneseEmergencial = `INSERT INTO anamnese_emergencia (sinais_sintomas_anamnese, aconteceu_outras_vezes_anamnese,
        faz_uso_medicacao_anamnese, horario_ultima_medicacao_anamnese, quais_medicacao_anamnese, alergico_anamnese,
        especificacao_alergico_anamnese, ingeriu_alimento_liquido_anamnese, horario_ingeriu_anamnese) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // tabela anamnese gestacional
    const sqlAnamneseGestacional = `INSERT INTO anamnese_gestacional (periodo_gestacao_anamnese, fez_pre_natal_anamnese,
        nome_medico_anamnese, possibilidade_complicacoes_anamnese, primeiro_filho_anamnese, horas_iniciaram_contracoes_anamnese,
        tempo_contracoes_anamnese, intervalo_contracoes_anamnese, pressao_quadril_evacuar_anamnese, houve_ruptura_bolsa_anamnese,
        feito_inspecao_visual_anamnese, parto_realizado_anamnese, sexo_bebe_anamnese, horario_nascimento_bebe_anamnese,
        nome_bebe_anamnese) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // tabela tipo de ocorrência
    const sqlTipoOcorrencia = `INSERT INTO ocorrencia_pre_hospitalar (tipo_ocorrencia_pre_hospitalar, outro_tipo_ocorrencia) VALUES (?,?)`;




    conexao.query(sqlPaciente, [pacienteIdentificado, sexo, gestante, nome_paciente,
        rg_cpf_paciente, idade_paciente, telefone_paciente], (errPaciente, resultPaciente) => {
            console.log(sexo)
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
                                    conexao.query(sqlAnamneseGestacional, [periodo_gestacao, pre_natal, nome_medico, complicacoes, primeiro_filho,
                                        horas_contracoes, tempo_contracoes, intervalo_contracoes, quadril_pressao, ruptura_bolsa,
                                        inspecao_visual, parto_realizado, sexo_bebe, horas_nascimento, nome_bebe], (errAnamneseGestacional, resultAnamneseGestacional) => {
                                            if (errAnamneseGestacional) {
                                                console.log('Erro ao inserir dados da anamnese gestacional: ' + errAnamneseGestacional.message);
                                                // Trate o erro da anamnese emergencial adequadamente
                                            } else {
                                                console.log('Dados da anamnese gestacional inseridos com sucesso');
                                                conexao.query(sqlTipoOcorrencia, [tipo_ocorrencia, tipo_ocorrencia_outro], (errTipoOcorrencia, resultTipoOcorrencia) => {
                                                    console.log(tipo_ocorrencia)
                                                    console.log(tipo_ocorrencia_outro)
                                                    if (errTipoOcorrencia) {
                                                    
                                                        console.log('Erro ao inserir dados do tipo de ocorrência: ' + errTipoOcorrencia.message);
                                                        // Trate o erro da anamnese emergencial adequadamente
                                                    } else {
                                                        console.log('Dados do tipo de ocorrência inseridos com sucesso');
                                                    }
                                                });

                                            }
                                        });
                                }
                            });
                    }
                });
            }
        });
});

module.exports = router;
app.use('/', router);

app.listen(8081, () => {
    console.log('O servidor está rodando na porta 8081');
}); 