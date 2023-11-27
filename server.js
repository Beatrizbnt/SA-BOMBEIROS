const express = require('express');// Importa o framework Express
const app = express();// Inicializa o aplicativo Express
const path = require('path');// Importa o módulo path para lidar com caminhos de arquivo
const router = express.Router();// Cria um roteador Express

app.use(express.json()); // Para analisar dados JSON no corpo da solicitação
app.use(express.urlencoded({ extended: true })); // Para analisar dados de formulário no corpo da solicitação

// Rota para a página inicial
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'Pages', 'inicio.html'));
});

app.use("/assets", express.static("assets"));
app.use("/img", express.static("img"));
app.use("/Pages", express.static("Pages"));
// conexão com o banco
const mysql = require('mysql2');
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sa_bombeiros'
});
// Estabelece a conexão com o banco de dados
conexao.connect((err) => {
    if (err) {
        console.error('Erro de conexão com o banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL como ID ' + conexao.threadId);
});

// Realizar o cadastro dos atendentes no banco
router.post('/Pages/cadastro', (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    // Verificar se todos os campos estão preenchidos
    if (!nome || !telefone || !cpf || !senha) {
        return res.status(400).send('Todos os campos são obrigatórios.');
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
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const sql = `SELECT cpf_cadastro, senha_cadastro FROM cadastro WHERE cpf_cadastro = ? AND senha_cadastro = ?`;

    conexao.query(sql, [cpf, senha], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao cadastrar usuário.');
        } else {
            if (results.length > 0) {
                // Login bem-sucedido,
                console.log("Login realizado com sucesso!");
                res.redirect('/Pages/principal.html');
            } else {
                // CPF ou senha inválidos, redireciona para a página de login

            }
        }
    });
});
// Enviar as informações da ficha para o banco
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
    //tabela sinais vitais
    const pressao_arterial_mm = req.body.pressao_arterial_mm;
    const pressao_arterial_hg = req.body.pressao_arterial_hg;
    const pulso = req.body.pulso;
    const respiracao = req.body.respiracao;
    const saturacao = req.body.saturacao;
    const temperatura = req.body.temperatura;
    const perfusao = req.body.perfusao;
    const sinais_vitais_situacao = req.body.sinais_vitais_situacao;
    //tabela local de traumas
    // const local = req.body.local;
    // const lado = req.body.lado;
    // const face = req.body.face;
    // const tipo_trauma = req.body.tipo_trauma;
    // const tipo_queimadura = req.body.tipo_queimadura;
    // const local_queimadura = req.body.local_queimadura;
    //tabela sinais e sintomas
    const abdomen_sensivel_rigido = req.body.abdomen_sensivel_rigido;
    const afundamento_cranio = req.body.afundamento_cranio;
    const agitacao = req.body.agitacao;
    const amnesia = req.body.amnesia;
    const angia_peito = req.body.angia_peito;
    const bradipneia = req.body.bradipneia;
    const bronco_aspirando = req.body.bronco_aspirando;
    const cefaleia = req.body.cefaleia;
    const cianose_labios = req.body.cianose_labios;
    const cianose_extremidade = req.body.cianose_extremidade;
    const convulsao = req.body.convulsao;
    const decorticacao = req.body.decorticacao;
    const deformidade = req.body.deformidade;
    const descerebracao = req.body.descerebracao;
    const desmaio = req.body.desmaio;
    const desvio_traqueia = req.body.desvio_traqueia;
    const dispneia = req.body.dispneia;
    const dor_local = req.body.dor_local;
    const edema_generalizado = req.body.edema_generalizado;
    const edema_localizado = req.body.edema_localizado;
    const enfisema_subcutaneo = req.body.enfisema_subcutaneo;
    const face_palida = req.body.face_palida;
    const hemorragia_interna = req.body.hemorragia_interna;
    const hemorragia_externa = req.body.hemorragia_externa;
    const hipertensao = req.body.hipertensao;
    const hipotensao = req.body.hipotensao;
    const nauseas_vomitos = req.body.nauseas_vomitos;
    const nasoragia = req.body.nasoragia;
    const obito = req.body.obito;
    const otorreia = req.body.otorreia;
    const otorragia = req.body.otorragia;
    const ovace = req.body.ovace;
    const parada_cardiaca = req.body.parada_cardiaca;
    const parada_respiratoria = req.body.parada_respiratoria;
    const priaprismo = req.body.priaprismo;
    const prurido_pele = req.body.prurido_pele;
    const pupilas_anisocoria = req.body.pupilas_anisocoria;
    const pupilas_miose = req.body.pupilas_miose;
    const pupilas_isocoria = req.body.pupilas_isocoria;
    const pupilas_midrise = req.body.pupilas_midrise;
    const pupilas_reagente = req.body.pupilas_reagente;
    const pupilas_nao_reagente = req.body.pupilas_nao_reagente;
    const sede = req.body.sede;
    const sinal_battle = req.body.sinal_battle;
    const sinal_guaxinim = req.body.sinal_guaxinim;
    const sudorese = req.body.sudorese;
    const tontura = req.body.tontura;
    const outro_sinais_sintomas = req.body.outro_sinais_sintomas;
    //tabela vítima era
    const vitima_era = req.body.vitima_era;
    //tabela decisão transporte
    const decisao_transporte = req.body.decisao_transporte;
    //tabela forma de condução
    const forma_conducao = req.body.forma_conducao;
    //tabela histórico de ocorrência
    const aspiracao = req.body.aspiracao;
    const avaliacao_inicial = req.body.avaliacao_inicial;
    const avaliacao_dirigida = req.body.avaliacao_digirida;
    const avaliacao_continuada = req.body.avaliacao_continuada;
    const chave_rautek = req.body.chave_rautek;
    const canula_guedel = req.body.canula_guedel;
    const desobstrucao_va = req.body.desobstrucao_va;
    const emprego_dea = req.body.emprego_dea;
    const limpeza_ferimento = req.body.limpeza_ferimento;
    const curativos = req.body.curativos;
    const compressivo = req.body.compressivo;
    const encravamento = req.body.encravamento;
    const ocular = req.body.ocular;
    const queimadura = req.body.queimadura;
    const simples = req.body.simples;
    const tres_pontas = req.body.aspiracao;
    const imobilizacoes_membro_inf_dir = req.body.imobilizacoes_membro_inf_dir;
    const imobilizacoes_membro_inf_esq = req.body.imobilizacoes_membro_inf_esq;
    const imobilizacoes_membro_sup_dir = req.body.imobilizacoes_membro_sup_dir;
    const imobilizacoes_membro_sup_esq = req.body.imobilizacoes_membro_sup_esq;
    const imobilizacoes_quadril = req.body.imobilizacoes_quadril;
    const imobilizacoes_cervical = req.body.imobilizacoes_cervical;
    const maca_sobre_rodas = req.body.maca_sobre_rodas;
    const maca_rigida = req.body.maca_rigida;
    const ponte = req.body.ponte;
    const retirado_capacete = req.body.retirado_capacete;
    const reanimacao_cardiorespiratoria = req.body.maca_rigida;
    const rolamento_90 = req.body.rolamento_90;
    const rolamento_180 = req.body.rolamento_180;
    const tomada_decisao = req.body.tomada_decisao;
    const tratado_choque = req.body.tratado_choque;
    const uso_canula = req.body.uso_canula;
    const uso_colar = req.body.uso_colar;
    const uso_colar_tam = req.body.uso_colar_tam;
    const uso_ttf = req.body.uso_ttf;
    const uso_ked = req.body.uso_ked;
    const ventilacao_suporte = req.body.ventilacao_suporte;
    const oxigenioterapia_lpm = req.body.oxigenioterapia_lpm;
    const reanimador_lpm = req.body.reanimador_lpm;
    const meios_auxiliares_celesc = req.body.meios_auxiliares_celesc;
    const meios_auxiliares_defesa_civil = req.body.meios_auxiliares_defesa_civil;
    const meios_auxiliares_igp_pc = req.body.meios_auxiliares_igp_pc;
    const meios_auxiliares_policia_civil = req.body.meios_auxiliares_policia_civil;
    const meios_auxiliares_policia_militar = req.body.meios_auxiliares_policia_militar;
    const meios_auxiliares_policia_prf = req.body.meios_auxiliares_policia_prf;
    const meios_auxiliares_policia_pre = req.body.meios_auxiliares_policia_pre;
    const meios_auxiliares_samu_usa = req.body.meios_auxiliares_samu_usa;
    const meios_auxiliares_samu_usb = req.body.meios_auxiliares_samu_usb;
    const meios_auxiliares_cit = req.body.meios_auxiliares_cit;
    const outro_meios_auxiliares = req.body.outro_meios_auxiliares;
    const outros_procedimentos = req.body.outros_procedimentos;
    // tabela materiais utilizados
    const ataduras = req.body.ataduras;
    const ataduras_tam = req.body.ataduras_tam;
    const ataduras_qtd = req.body.ataduras_qtd;
    const cateter_oculos = req.body.cateter_oculos;
    const cateter_oculos_qtd = req.body.cateter_oculos_qtd;
    const compressa_comum = req.body.compressa_comum;
    const compressa_comum_qtd = req.body.compressa_comum_qtd;
    const kits = req.body.kits;
    const kits_tam = req.body.kits_tam;
    const kits_qtd = req.body.kits_qtd;
    const luva_desc = req.body.luva_desc;
    const luva_desc_qtd = req.body.luva_desc_qtd;
    const mascara_desc = req.body.mascara_desc;
    const mascara_desc_qtd = req.body.mascara_desc_qtd;
    const manta_aluminizada = req.body.manta_aluminizada;
    const manta_aluminizada_qtd = req.body.manta_aluminizada_qtd;
    const pas_dea = req.body.pas_dea;
    const pas_dea_qtd = req.body.pas_dea_qtd;
    const sonda_aspiracao = req.body.sonda_aspiracao;
    const sonda_aspiracao_qtd = req.body.sonda_aspiracao_qtd;
    const soro_fisiologico = req.body.sonda_fisiologico;
    const soro_fisiologico_qtd = req.body.sonda_fisiologico_qtd;
    const talas_pap = req.body.talas_pap;
    const talas_pap_tam = req.body.talas_pap_tam;
    const talas_pap_qtd = req.body.talas_pap_qtd;
    const outro_material_utilizado_descartavel = req.body.outro_material_utilizado_descartavel;
    const outro_material_utilizado_descartavel_tam = req.body.outro_material_utilizado_descartavel_tam;
    const outro_material_utilizado_descartavel_qtd = req.body.outro_material_utilizado_descartavel_qtd;
    const base_estabilizador = req.body.base_estabilizador;
    const base_estabilizador_qtd = req.body.base_estabilizador_qtd;
    const colar = req.body.colar;
    const colar_tam = req.body.colar_tam;
    const colar_qtd = req.body.colar_qtd;
    const coxins_estabiliza = req.body.coxins_estabiliza;
    const coxins_estabiliza_qtd = req.body.coxins_estabiliza_qtd;
    const ked = req.body.ked;
    const ked_tam = req.body.ked_tam;
    const ked_qtd = req.body.ked_qtd;
    const maca_rigida_utilizados = req.body.maca_rigida_utilizados;
    const maca_rigida_utilizados_qtd = req.body.maca_rigida_utilizados_qtd;
    const t_t_f = req.body.t_t_f;
    const t_t_f_tam = req.body.t_t_f_tam;
    const t_t_f_qtd = req.body.t_t_f_qtd;
    const tirante_aranha = req.body.tirante_aranha;
    const tirante_aranha_qtd = req.body.tirante_aranha_qtd;
    const tirante_cabeca = req.body.tirante_cabeca;
    const tirante_cabeca_qtd = req.body.tirante_cabeca_qtd;
    const canula = req.body.canula;
    const canula_qtd = req.body.canula_qtd;
    const outro_material_utilizado_deixados = req.body.outro_material_utilizado_deixados;
    const outro_material_utilizado_deixados_tam = req.body.outro_material_utilizado_deixados_tam;
    const outro_material_utilizado_deixados_qtd = req.body.outro_material_utilizado_deixados_qtd;
    //tabela avaliação cinemática
    const disturbio_comportamento = req.body.disturbio_conportamento;
    const encontrado_capacete = req.body.encontrado_capacete;
    const encontrado_cinto = req.body.encontrado_cinto;
    const parabrisas_avariado = req.body.parabrisas_avariado;
    const caminhando_cena = req.body.caminhando_cena;
    const painel_avariado = req.body.painel_avariado;
    const volante_torcido = req.body.volante_torcido;
    //tabela observações importantes
    const objetos_recolhidos = req.body.objetos_recolhidos;
    const objetos = req.body.objetos;
    const observacoes_importantes = req.body.observacoes_importantes;
    //tabela equipe de atendimento
    const motorista = req.body.motorista;
    const socorrista1 = req.body.socorrista1;
    const socorrista2 = req.body.socorrista2;
    const socorrista3 = req.body.socorrista3;
    const demandante = req.body.demandante;
    const equipe = req.body.equipe;
    //tabela informação transporte
    const local_ocorrencia = req.body.local_ocorrencia;
    const num_usb = req.body.num_usb;
    const num_ocorrencia = req.body.num_ocorrencia;
    const cod_ir = req.body.cod_ir;
    const cod_ps = req.body.cod_ps;
    const desp = req.body.desp;
    const h_ch = req.body.h_ch;
    const km_final = req.body.km_final;
    const cod_sia_sus = req.body.cod_sia_sus;
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

    // tabela sinais vitais
    const sqlSinaisVitais = `INSERT INTO sinais_vitais_paciente (pressao_arterial_mm_sinais, pressao_arterial_hg_sinais, pulso_sinais,
        respiracao_sinais, saturacao_sinais, temperatura_sinais, perfusao_sinais, situacao_sinais) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // tabela local de trauma
    // const sqlLocalTrauma = `INSERT INTO local_traumas (local_traumas, lado_traumas, face_traumas, tipo_traumas, 
    //     queimadura_traumas, grau_queimaduras_trauma) VALUES (?, ?, ?, ?, ?, ?)`;

    // tabela sinais e sintomas
    const sqlSinaisSintomas = `INSERT INTO sinais_sintomas (abdomen_sensivel_rigido, afundamento_cranio, agitacao, amnesia, angia_peito, bradipneia, bronco_aspirando,
         cefaleia, cianose_labios, cianose_extremidade, convulsao, decorticacao, deformidade, descerebracao, desmaio, desvio_traqueia, dispneia, dor_local,
          edema_generalizado, edema_localizado, enfisema_subcutaneo, face_palida, hemorragia_interna, hemorragia_externa, hipertensao, hipotensao, nauseas_vomitos,
           nasoragia, obito, otorreia, otorragia, ovace, parada_cardiaca, parada_respiratoria, priaprismo, prurido_pele, pupilas_anisocoria, pupilas_miose,
            pupilas_isocoria, pupilas_midrise, pupilas_reagente, pupilas_nao_reagente, sede, sinal_battle, sinal_guaxinim, sudorese, tontura, outro_sinais_sintomas) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // tabela vítima era
    const sqlVitimaEra = `INSERT INTO vitima_era (vitima_era) VALUES (?)`;

    // tabela decisão transporte
    const sqlDecisaoTransporte = `INSERT INTO decisao_transporte (decisao_transporte) VALUES (?)`;

    // tabela forma de condução
    const sqlFormaConducao = `INSERT INTO forma_conducao (forma_conducao) VALUES (?)`;

    // tabela procedimentos efetuados
    const sqlProcedimentosEfetuados = `INSERT INTO procedimentos_efetuados (aspiracao, avaliacao_inicial, avaliacao_dirigida, avaliacao_continuada, chave_rautek, canula_guedel, desobstrucao_va,
        emprego_dea, limpeza_ferimento, curativo, compressivo, encravamento, ocular, queimadura, simples, tres_pontas, imobilizacoes_membro_inf_dir, imobilizacoes_membro_inf_esq, imobilizacoes_membro_sup_dir,
        imobilizacoes_membro_sup_esq, imobilizacoes_quadril, imobilizacoes_cervical, maca_sobre_rodas, maca_rigida, ponte, retirado_capacete, reanimacao_cardiorespiratoria, rolamento_90, rolamento_180,
        tomada_decisao, tratado_choque, uso_canula, uso_colar, uso_colar_tam, uso_ttf, uso_ked, ventilacao_suporte, oxigenioterapia_lpm, reanimador_lpm,
        meios_auxiliares_celesc, meios_auxiliares_defesa_civil, meios_auxiliares_igp_pc, meios_auxiliares_policia_civil, meios_auxiliares_policia_militar, meios_auxiliares_policia_prf,
        meios_auxiliares_policia_pre, meios_auxiliares_samu_usa, meios_auxiliares_samu_usb, meios_auxiliares_cit, outro_meios_auxiliares, outros_procedimentos)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // tabela materiais utilizados
    const sqlMateriaisUtilizados = `INSERT INTO materiais_utilizados (ataduras, ataduras_tam, ataduras_qtd, cateter_oculos, cateter_oculos_qtd,
         compressa_comum, compressa_comum_qtd, kits, kits_tam, kits_qtd, luva_desc, luva_desc_qtd, mascara_desc, mascara_desc_qtd, manta_aluminizada,
          manta_aluminizada_qtd, pas_dea, pas_dea_qtd, sonda_aspiracao, sonda_aspiracao_qtd, soro_fisiologico, soro_fisiologico_qtd, talas_pap,
           talas_pap_tam, talas_pap_qtd, outro_material_utilizado_descartavel, outro_material_utilizado_descartavel_tam, outro_material_utilizado_descartavel_qtd,
            base_estabilizador, base_estabilizador_qtd, colar, colar_tam, colar_qtd, coxins_estabiliza, coxins_estabiliza_qtd, ked, ked_tam, ked_qtd,
             maca_rigida_utilizados, maca_rigida_utilizados_qtd, t_t_f, t_t_f_tam, t_t_f_qtd, tirante_aranha, tirante_aranha_qtd, tirante_cabeca,
              tirante_cabeca_qtd, canula, canula_qtd, outro_material_utilizado_deixados, outro_material_utilizado_deixados_tam, outro_material_utilizado_deixados_qtd)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // tabela avaliação cinemática
    const sqlAvaliacaoCinematica = `INSERT INTO avaliacao_cinematica (disturbio_comportamento, encontrado_capacete, encontrado_cinto,
        parabrisas_avariado, caminhando_cena, painel_avariado, volante_torcido) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // tabela obsercações importantes
    const sqlObservacoesImportantes = `INSERT INTO observacoes_importantes (objetos_recolhidos, objetos,
        observacoes_importantes) VALUES (?, ?, ?)`;

    // tabela equipe de atendimento
    const sqlEquipeAtendimento = `INSERT INTO equipe_atendimento (motorista, socorrista1, socorrista2, socorrista3, demandante, equipe)
     VALUES (?, ?, ?, ?, ?, ?)`;

    // tabela informação transporte
    const sqlInformacaoTransporte = `INSERT INTO informacao_transporte ( local_ocorrencia, num_usb, num_ocorrencia, cod_ir, cod_ps,
    desp, h_ch, km_final, cod_sia_sus, outro_meio_auxiliar
       outro_historico_ocorrencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
                                                                    conexao.query(sqlAvaliacaoGlasgowMaiores, [abertura_ocular_maiores, resposta_verbal_maiores, resposta_motora_maiores,
                                                                        soma_avaliacao_glasgow_maiores], (errAvaliacaoGlasgowMaiores, resultAvaliacaoGlasgowMaiores) => {
                                                                            if (errAvaliacaoGlasgowMaiores) {

                                                                                console.log('Erro ao inserir dados de Avaliação do Paciente glasgow Maiores que 5 anos: ' + errAvaliacaoGlasgowMaiores.message);
                                                                                // erro de Avaliação do Paciente glasgow Maiores que 5 anos
                                                                            } else {
                                                                                console.log('Dados de Avaliação do Paciente glasgow Maiores que 5 anos: inseridos com sucesso');
                                                                                conexao.query(sqlAvaliacaoGlasgowMenores, [abertura_ocular_menores, resposta_verbal_menores, resposta_motora_menores,
                                                                                    soma_avaliacao_glasgow_menores], (errAvaliacaoGlasgowMenores, resultAvaliacaoGlasgowMenores) => {
                                                                                        if (errAvaliacaoGlasgowMenores) {

                                                                                            console.log('Erro ao inserir dados de Avaliação do Paciente glasgow Menores que 5 anos: ' + errAvaliacaoGlasgowMenores.message);
                                                                                            // erro de Avaliação do Paciente glasgow Menores que 5 anos
                                                                                        } else {
                                                                                            console.log('Dados de Avaliação do Paciente glasgow Menores que 5 anos: inseridos com sucesso');
                                                                                            conexao.query(sqlSinaisVitais, [pressao_arterial_mm, pressao_arterial_hg, pulso, respiracao, saturacao,
                                                                                                temperatura, perfusao, sinais_vitais_situacao], (errSinaisVitais, resultSinaisVitais) => {
                                                                                                    if (errSinaisVitais) {

                                                                                                        console.log('Erro ao inserir dados de sinais vitais: ' + errSinaisVitais.message);
                                                                                                        // erro de sinais vitais
                                                                                                    } else {
                                                                                                        console.log('Dados de sinais vitais: inseridos com sucesso');
                                                                                                        // conexao.query(sqlLocalTrauma, [local, lado, face, tipo_trauma, tipo_queimadura, local_queimadura], (errlLocalTrauma, resultLocalTrauma) => {
                                                                                                        //     if (errLocalTrauma) {

                                                                                                        //         console.log('Erro ao inserir dados de Local de traumas: ' + errLocalTrauma.message);
                                                                                                                // erro de Local de traumas
                                                                                                            // } else {
                                                                                                            //     console.log('Dados de Local de traumas: inseridos com sucesso');
                                                                                                                conexao.query(sqlSinaisSintomas, [abdomen_sensivel_rigido, afundamento_cranio, agitacao, amnesia, angia_peito, bradipneia, bronco_aspirando,
                                                                                                                    cefaleia, cianose_labios, cianose_extremidade, convulsao, decorticacao, deformidade, descerebracao, desmaio, desvio_traqueia, dispneia, dor_local,
                                                                                                                    edema_generalizado, edema_localizado, enfisema_subcutaneo, face_palida, hemorragia_interna, hemorragia_externa, hipertensao, hipotensao, nauseas_vomitos,
                                                                                                                    nasoragia, obito, otorreia, otorragia, ovace, parada_cardiaca, parada_respiratoria, priaprismo, prurido_pele, pupilas_anisocoria, pupilas_miose,
                                                                                                                    pupilas_isocoria, pupilas_midrise, pupilas_reagente, pupilas_nao_reagente, sede, sinal_battle, sinal_guaxinim, sudorese, tontura, outro_sinais_sintomas]
                                                                                                                    , (errSinaisSintomas, resultSinaisSintomas) => {
                                                                                                                        if (errSinaisSintomas) {

                                                                                                                            console.log('Erro ao inserir dados de sinais e sintomas: ' + errSinasSintomas.message);
                                                                                                                            // erro de sinais e sintomas
                                                                                                                        } else {
                                                                                                                            console.log('Dados de Sinais e Sintomas: inseridos com sucesso');
                                                                                                                            conexao.query(sqlVitimaEra, [vitima_era], (errVitimaEra, resultVitimaEra) => {
                                                                                                                                if (errVitimaEra) {

                                                                                                                                    console.log('Erro ao inserir dados de Vítima era: ' + errVitimaEra.message);
                                                                                                                                    // erro de vitíma era
                                                                                                                                } else {
                                                                                                                                    console.log('Dados de vítima era: inseridos com sucesso');
                                                                                                                                    conexao.query(sqlDecisaoTransporte, [decisao_transporte], (errDecisaoTransporte, resultDecisaoTransporte) => {
                                                                                                                                        if (errDecisaoTransporte) {

                                                                                                                                            console.log('Erro ao inserir dados de Decisão transporte: ' + errDecisaoTransporte.message);
                                                                                                                                            // erro de desisão transporte
                                                                                                                                        } else {
                                                                                                                                            console.log('Dados de decisão transporte: inseridos com sucesso');
                                                                                                                                            conexao.query(sqlFormaConducao, [forma_conducao], (errFormaConducao, resultFormaConducao) => {
                                                                                                                                                if (errFormaConducao) {

                                                                                                                                                    console.log('Erro ao inserir dados de forma de condução: ' + errFormaConducao.message);
                                                                                                                                                    // erro de forma de condução
                                                                                                                                                } else {
                                                                                                                                                    console.log('Dados de forma de condução: inseridos com sucesso');
                                                                                                                                                    conexao.query(sqlProcedimentosEfetuados, [aspiracao, avaliacao_inicial, avaliacao_dirigida, avaliacao_continuada, chave_rautek,
                                                                                                                                                        canula_guedel, desobstrucao_va, emprego_dea, limpeza_ferimento, curativos, compressivo, encravamento, ocular, queimadura,
                                                                                                                                                        simples, tres_pontas, imobilizacoes_membro_inf_dir, imobilizacoes_membro_inf_esq, imobilizacoes_membro_sup_dir,
                                                                                                                                                        imobilizacoes_membro_sup_esq, imobilizacoes_quadril, imobilizacoes_cervical, maca_sobre_rodas, maca_rigida, ponte,
                                                                                                                                                        retirado_capacete, reanimacao_cardiorespiratoria, rolamento_90, rolamento_180, tomada_decisao, tratado_choque,
                                                                                                                                                        uso_canula, uso_colar, uso_colar_tam, uso_ttf, uso_ked, ventilacao_suporte, oxigenioterapia_lpm, reanimador_lpm,
                                                                                                                                                        meios_auxiliares_celesc, meios_auxiliares_defesa_civil, meios_auxiliares_igp_pc, meios_auxiliares_policia_civil,
                                                                                                                                                        meios_auxiliares_policia_militar, meios_auxiliares_policia_prf, meios_auxiliares_policia_pre, meios_auxiliares_samu_usa,
                                                                                                                                                        meios_auxiliares_samu_usb, meios_auxiliares_cit, outro_meios_auxiliares, outros_procedimentos], (errProcedimentosEfetuados, resultProcedimentosEfetuados) => {
                                                                                                                                                            if (errProcedimentosEfetuados) {

                                                                                                                                                                console.log('Erro ao inserir dados de procedimentos efetuados: ' + errProcedimentosEfetuados.message);
                                                                                                                                                                // erro de procedimentos Efetuados
                                                                                                                                                            } else {
                                                                                                                                                                console.log('Dados de procedimentos efetuados: inseridos com sucesso');
                                                                                                                                                                conexao.query(sqlMateriaisUtilizados, [ataduras, ataduras_tam, ataduras_qtd, cateter_oculos, cateter_oculos_qtd,
                                                                                                                                                                    compressa_comum, compressa_comum_qtd, kits, kits_tam, kits_qtd, luva_desc, luva_desc_qtd, mascara_desc, mascara_desc_qtd,
                                                                                                                                                                    manta_aluminizada, manta_aluminizada_qtd, pas_dea, pas_dea_qtd, sonda_aspiracao, sonda_aspiracao_qtd, soro_fisiologico,
                                                                                                                                                                    soro_fisiologico_qtd, talas_pap, talas_pap_tam, talas_pap_qtd, outro_material_utilizado_descartavel, outro_material_utilizado_descartavel_tam,
                                                                                                                                                                    outro_material_utilizado_descartavel_qtd, base_estabilizador, base_estabilizador_qtd, colar, colar_tam, colar_qtd, coxins_estabiliza,
                                                                                                                                                                    coxins_estabiliza_qtd, ked, ked_tam, ked_qtd,
                                                                                                                                                                    maca_rigida_utilizados, maca_rigida_utilizados_qtd, t_t_f, t_t_f_tam, t_t_f_qtd, tirante_aranha, tirante_aranha_qtd, tirante_cabeca,
                                                                                                                                                                    tirante_cabeca_qtd, canula, canula_qtd, outro_material_utilizado_deixados, outro_material_utilizado_deixados_tam, outro_material_utilizado_deixados_qtd], (errMateriaisUtilizados, resultMateriaisUtilizados) => {
                                                                                                                                                                        if (errMateriaisUtilizados) {

                                                                                                                                                                            console.log('Erro ao inserir dados de materiais utilizados: ' + errMateriaisUtilizados.message);
                                                                                                                                                                            // erro de materiais utilizados
                                                                                                                                                                        } else {
                                                                                                                                                                            console.log('Dados de materiais utilizados: inseridos com sucesso');
                                                                                                                                                                            conexao.query(sqlAvaliacaoCinematica, [disturbio_comportamento, encontrado_capacete, encontrado_cinto,
                                                                                                                                                                                parabrisas_avariado, caminhando_cena, painel_avariado, volante_torcido], (errAvaliacaoCinematica, resultAvaliacaoCinematica) => {
                                                                                                                                                                                    if (errAvaliacaoCinematica) {

                                                                                                                                                                                        console.log('Erro ao inserir dados de avaliação cinemática: ' + errAvaliacaoCinematica.message);
                                                                                                                                                                                        // erro de avaliação cinemática
                                                                                                                                                                                    } else {
                                                                                                                                                                                        console.log('Dados de avaliação cinemática: inseridos com sucesso');
                                                                                                                                                                                        conexao.query(sqlObservacoesImportantes, [objetos_recolhidos, objetos, observacoes_importantes], (errObservacoesImportantes, resultObservacoesImportantes) => {
                                                                                                                                                                                            if (errObservacoesImportantes) {

                                                                                                                                                                                                console.log('Erro ao inserir dados de observações importantes: ' + errObservacoesImportantes.message);
                                                                                                                                                                                                // erro de observações importantes
                                                                                                                                                                                            } else {
                                                                                                                                                                                                console.log('Dados de observações importantes: inseridos com sucesso');
                                                                                                                                                                                                conexao.query(sqlEquipeAtendimento, [motorista, socorrista1, socorrista2, socorrista3, demandante,
                                                                                                                                                                                                    equipe], (errEquipeAtendimento, resultEquipeAtendimento) => {
                                                                                                                                                                                                        if (errEquipeAtendimento) {

                                                                                                                                                                                                            console.log('Erro ao inserir dados de equipe de atendimento: ' + errEquipeAtendimento.message);
                                                                                                                                                                                                            // erro de equipe de atendimento
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                            console.log('Dados de equipe de atendimento: inseridos com sucesso');
                                                                                                                                                                                                            conexao.query(sqlInformacaoTransporte, [local_ocorrencia, num_usb, num_ocorrencia, cod_ir, cod_ps, desp, h_ch,
                                                                                                                                                                                                                km_final, cod_sia_sus, outro_meio_auxiliar, outro_historico_ocorrencia], (errInformacaoTransporte, resultInformacaoTransporte) => {
                                                                                                                                                                                                                    if (errInformacaoTransporte) {

                                                                                                                                                                                                                        console.log('Erro ao inserir dados de informação transporte: ' + errInformacaoTransporte.message);
                                                                                                                                                                                                                        // erro de informação transporte
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                        console.log('Dados de informação transporte: inseridos com sucesso');

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
                                                                                                                                        }
                                                                                                                                    });
                                                                                                                                }
                                                                                                                            });
                                                                                                                        }
                                                                                                                    });
                                                                                                        //     }
                                                                                                        // });
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
                    }
                })
            }
        })
})

module.exports = router;
app.use('/', router);

// Verificar a porta do servidor
app.listen(8081, () => {
    console.log('O servidor está rodando na porta 8081');
});