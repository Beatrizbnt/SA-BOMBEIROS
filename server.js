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
    const psiquiatrico = req.body.psiquiatrico; // Fix the typo here
    const tipo_respiratorio = req.body.tipo_respiratorio;
    const tipo_diabetes = req.body.tipo_diabetes;
    const tipo_obstetrico = req.body.tipo_obstetrico;
    const tipo_transporte = req.body.tipo_transporte;
    const outro_tipo_transporte = req.body.outro_tipo_transporte;
    const problemas_suspeitos_outro = req.body.problemas_suspeitos_outro;
    //tabela Avaliação do Paciente (Glasgow) MAIORES DE 5 ANOS
    const abertura_ocular_maiores = req.body.abertura_ocular_maiores;
    const resposta_verbal_maiores = req.body.resposta_verbal_maiores;
    const resposta_motora_maiores = req.body.resposta_motora_maiores;
    const soma_avaliacao_glasgow_maiores = req.body.soma_avaliacao_glasgow_maiores;
    //tabela Avaliação do Paciente (Glasgow) MENORES DE 5 ANOS
    const abertura_ocular_menores = req.body.abertura_ocular_menores;
    const resposta_verbal_menores = req.body.resposta_verbal_menores;
    const resposta_motora_menores = req.body.resposta_motora_menores;
    const soma_avaliacao_glasgow_menores = req.body.soma_avaliacao_glasgow_menores;
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

    // tabela tipo de ocorrência pré-hospitalar
    const sqlTipoOcorrencia = `INSERT INTO ocorrencia_pre_hospitalar (tipo_ocorrencia_pre_hospitalar, outro_tipo_ocorrencia) 
                             VALUES (?, ?)`;

    // tabela tipo de problemas encontrados suspeitos
    const sqlProblemasSuspeitos = `INSERT INTO problemas_suspeitos (psiquiatrico_problemas_suspeitos, tipo_respiratorio_problemas_suspeitos,
        tipo_diabetes_problemas_suspeitos, tipo_obstetrico_problemas_suspeitos, tipo_transporte_problemas_suspeitos, transporte_outro_problemas_suspeitos, 
        outro_problemas_suspeitos) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // tabela Avaliação Glasgow Maiores
    const sqlAvaliacaoGlasgowMaiores = `INSERT INTO avaliacao_glasgow_maiores_5 (abertura_ocular_maiores, resposta_verbal_maiores,
        resposta_motora_maiores, soma_avaliacao_glasgow_maiores) VALUES (?, ?, ?, ?)`;

    // tabela Avaliação Glasgow Menores 
    const sqlAvaliacaoGlasgowMenores = `INSERT INTO avaliacao_glasgow_menores_5 (abertura_ocular_menores, resposta_verbal_menores,
        resposta_motora_menores, soma_avaliacao_glasgow_menores) VALUES (?, ?, ?, ?)`;

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
                        //  erro do acompanhante adequadamente
                    } else {
                        console.log('Dados do acompanhante inseridos com sucesso');
                        conexao.query(sqlAnamneseEmergencial, [sinais_sintomas, aconteceu, uso_medicacao, horas_medicacao, quais_medicacao,
                            alergico, especi_alergico, aliment_liquid, horario_aliment_liquid], (errAnamnese, resultAnamnese) => {
                                if (errAnamnese) {
                                    console.log('Erro ao inserir dados da anamnese emergencial: ' + errAnamnese.message);
                                    //  erro da anamnese emergencial adequadamente
                                } else {
                                    console.log('Dados da anamnese emergencial inseridos com sucesso');
                                    conexao.query(sqlAnamneseGestacional, [periodo_gestacao, pre_natal, nome_medico, complicacoes, primeiro_filho,
                                        horas_contracoes, tempo_contracoes, intervalo_contracoes, quadril_pressao, ruptura_bolsa,
                                        inspecao_visual, parto_realizado, sexo_bebe, horas_nascimento, nome_bebe], (errAnamneseGestacional, resultAnamneseGestacional) => {
                                            if (errAnamneseGestacional) {
                                                console.log('Erro ao inserir dados da anamnese gestacional: ' + errAnamneseGestacional.message);
                                                // erro da anamnese gestacional adequadamente
                                            } else {
                                                console.log('Dados da anamnese gestacional inseridos com sucesso');
                                                conexao.query(sqlTipoOcorrencia, [tipo_ocorrencia, tipo_ocorrencia_outro], (errTipoOcorrencia, resultTipoOcorrencia) => {
                                                    if (errTipoOcorrencia) {

                                                        console.log('Erro ao inserir dados do tipo de ocorrência: ' + errTipoOcorrencia.message);
                                                        // erro do tipo de ocorrência pré-hospitalar
                                                    } else {
                                                        console.log('Dados do tipo de ocorrência inseridos com sucesso');
                                                        conexao.query(sqlProblemasSuspeitos, [psiquiatrico, tipo_respiratorio, tipo_diabetes, tipo_obstetrico,
                                                            tipo_transporte, outro_tipo_transporte, problemas_suspeitos_outro], (errProblemasSuspeitos, resultProblemasSuspeitos) => {
                                                                if (errProblemasSuspeitos) {

                                                                    console.log('Erro ao inserir dados de problemas encontrados suspeitos: ' + errProblemasSuspeitos.message);
                                                                    // erro de problemas encontrados suspeitos
                                                                } else {
                                                                    console.log('Dados de problemas encontrados suspeitos inseridos com sucesso');
                                                                    conexao.query(sqlAvaliacaoGlasgowMaiores, [abertura_ocular_maiores, resposta_verbal_maiores,resposta_motora_maiores,
                                                                        soma_avaliacao_glasgow_maiores], (errAvaliacaoGlasgowMaiores, resultAvaliacaoGlasgowMaiores) => {
                                                                            if (errAvaliacaoGlasgowMaiores) {
            
                                                                                console.log('Erro ao inserir dados de Avaliação do Paciente glasgow Maiores que 5 anos: ' + errProblemasSuspeitos.message);
                                                                                // erro de Avaliação do Paciente glasgow Maiores que 5 anos
                                                                            } else {
                                                                                console.log('Dados de Avaliação do Paciente glasgow Maiores que 5 anos: inseridos com sucesso');
            
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