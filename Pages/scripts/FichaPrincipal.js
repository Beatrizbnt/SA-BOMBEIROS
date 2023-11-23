// função para abrir e fechar menu
function openNav() {
    document.getElementById("myNav").style.height = "100%";
  
    var menuItems = document.querySelectorAll(".overlay-content a");
    menuItems.forEach(function(item) {
      item.addEventListener("click", function() {
        closeNav();
      });
    });
  
    // fechs o menu quando o ícone "X" é clicado
    var closeButton = document.querySelector(".closebtn");
    if (closeButton) {
      closeButton.addEventListener("click", function() {
        closeNav();
      });
    }
  }
  
  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }


// mascara rg e cpf
const campo = document.getElementById("campo");

if(campo != null){
campo.addEventListener("input", function (event) {
    let valor = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (valor.length <= 9) {
        event.target.value = formatarRG(valor);
    } else if (valor.length <= 11) {
        event.target.value = formatarCPF(valor);
    } else {
        event.target.value = valor.substr(0, 11);
    }
});
}
function formatarCPF(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
}

function formatarRG(valor) {
    return valor.replace(/(\d{1,3})(\d{0,3})(\d{0,3})/, "$1.$2.$3");
}


// mascara cpf
function mascaraCPF(event) {
  let tecla = event.key;
  let cpf = event.target.value.replace(/\D+/g, "");

  if (/^[0-9]$/i.test(tecla)) {
      cpf = cpf + tecla;
      let tamanho = cpf.length;

      if (tamanho >= 12) {
          return false;
      }
      
      if (tamanho > 9) {
          cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2}).*/, "$1.$2.$3-$4");
      } else if (tamanho > 6) {
          cpf = cpf.replace(/^(\d{3})(\d{3})(\d{1,3}).*/, "$1.$2.$3");
      } else if (tamanho > 3) {
          cpf = cpf.replace(/^(\d{3})(\d{1,3}).*/, "$1.$2");
      } else {
          cpf = cpf.replace(/^(\d*)/, "$1");
      }

      event.target.value = cpf;
  }

  if (!["Backspace", "Delete"].includes(tecla)) {
      return false;
  }
}


// mascara telefone

function mascaraTelefone(event) {
    let tecla = event.key;
    let telefone = event.target.value.replace(/\D+/g, "");

    if (/^[0-9]$/i.test(tecla)) {
        telefone = telefone + tecla;
        let tamanho = telefone.length;

        if (tamanho >= 12) {
            return false;
        }
        
        if (tamanho > 10) {
            telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (tamanho > 5) {
            telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho > 2) {
            telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            telefone = telefone.replace(/^(\d*)/, "($1");
        }

        event.target.value = telefone;
    }

    if (!["Backspace", "Delete"].includes(tecla)) {
        return false;
    }
}

// mascara nome

function validarNome(event) {
    const nome = event.target.value;
    const regex = /^[a-zA-Z\s]*$/; // Aceita apenas letras e espaços

    if (!regex.test(nome)) {
        event.target.value = nome.slice(0, -1); // Remove o último caractere (não é uma letra)
    }
}

// const nomeInput = document.getElementById('nome');

// nomeInput.addEventListener('input', validarNome);

const tipo_transporte = document.getElementsByName('tipo_transporte');
// for ( let tipo of tipo_transporte){
//    tipo.addEventListener("click", function(){
//    
//     outroTransporte.value = ""
//    })
// } 

var check_outro = document.getElementById('outro_tipo_transporte');
check_outro.addEventListener("click", function(){
    var outroTransporte = document.getElementById('outroTransporte');
    
    console.log(check_outro.checked)
    if(check_outro.checked){
        outroTransporte.style.display="block"
        
    }
    else{
        outroTransporte.style.display="none"
    }
});

    var outroOcorrencia = document.getElementById('outroOcorrencia');
    var outroProblemas = document.getElementById('outroProblemas');
   
    var radioOutro = document.querySelector('input[name="transporte"][value="outro"]');
    var radioOutro = document.querySelector('input[name="transporte"][value="outro"]');
    var radioOutro = document.querySelector('input[name="transporte"][value="outro"]');

    radioOutro.addEventListener('change', function () {
        if (radioOutro.checked) {
            outroInput.disabled = false;
        } else {
            outroInput.disabled = true;
            outroInput.value = ''; // Limpa o campo de texto quando desativado
        }
    });

// Função para mostrar/ocultar o campo de paciente
document.getElementById('pacienteSim').addEventListener('change', function () {
    var paciente = document.getElementById('paciente');
    paciente.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('pacienteNao').addEventListener('change', function () {
    var paciente = document.getElementById('paciente');
    paciente.style.display = this.checked ? 'none' : 'block';
});

// Função para mostrar/ocultar o campo de gestante com base na seleção de sexo
document.getElementById('sexofem').addEventListener('change', function () {
    var gestanteDiv = document.getElementById('gestante');
    gestanteDiv.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('sexomasc').addEventListener('change', function () {
    var gestanteDiv = document.getElementById('gestante');
    gestanteDiv.style.display = this.checked ? 'none' : 'block';
});


// Função para mostrar/ocultar o campo de acompanhante
document.getElementById('acompsim').addEventListener('change', function () {
    var acompanhante = document.getElementById('acompanhante');
    acompanhante.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('acompnao').addEventListener('change', function () {
    var acompanhante = document.getElementById('acompanhante');
    acompanhante.style.display = this.checked ? 'none' : 'block';
});

// Função para mostrar/ocultar o campo de medicação
document.getElementById('uso_medicacaosim').addEventListener('change', function () {
    var medicacao = document.getElementById('medicacao');
    medicacao.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('uso_medicacaonao').addEventListener('change', function () {
    var medicacao = document.getElementById('medicacao');
    medicacao.style.display = this.checked ? 'none' : 'block';
});

// Função para mostrar/ocultar o campo de alergico
document.getElementById('alergicosim').addEventListener('change', function () {
    var especi_alergico = document.getElementById('especi_alergico');
    especi_alergico.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('alergiconao').addEventListener('change', function () {
    var medicacao = document.getElementById('especi_alergico');
    especi_alergico.style.display = this.checked ? 'none' : 'block';
});

// Função para mostrar/ocultar o campo de ingeriu alimento ou liquido
document.getElementById('aliment_liquidsim').addEventListener('change', function () {
    var horas_aliment_liquid = document.getElementById('horas_aliment_liquid');
    horas_aliment_liquid.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('aliment_liquidnao').addEventListener('change', function () {
    var horas_aliment_liquid = document.getElementById('horas_aliment_liquid');
    horas_aliment_liquid.style.display = this.checked ? 'none' : 'block';
});

// Função para mostrar/ocultar o campo de anmanese gestacional
document.getElementById('gestantesim').addEventListener('change', function () {
    var gestacional = document.getElementById('gestacional');
    gestacional.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('gestantenao').addEventListener('change', function () {
    var gestacional = document.getElementById('gestacional');
    gestacional.style.display = this.checked ? 'none' : 'block';
});


// Função para mostrar/ocultar o campo de respiratório
document.getElementById('respiratorio').addEventListener('change', function () {
    var tipo_respiratorio = document.getElementById('tipo_respiratorio');
    tipo_respiratorio.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de diabetes
document.getElementById('diabetes').addEventListener('change', function () {
    var tipo_diabetes = document.getElementById('tipo_diabetes');
    tipo_diabetes.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de obstétrico
document.getElementById('obstetrico').addEventListener('change', function () {
    var tipo_obstetrico = document.getElementById('tipo_obstetrico');
    tipo_obstetrico.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de transporte
document.getElementById('transporte').addEventListener('change', function () {
    var tipo_transporte = document.getElementById('tipo_transporte');
    tipo_transporte.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de cianose
document.getElementById('cianose').addEventListener('change', function () {
    var tipo_cianose = document.getElementById('tipo_cianose');
    tipo_cianose.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de edema
document.getElementById('edema').addEventListener('change', function () {
    var tipo_edema = document.getElementById('tipo_edema');
    tipo_edema.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de hemorragia
document.getElementById('hemorragia').addEventListener('change', function () {
    var tipo_hemorragia = document.getElementById('tipo_hemorragia');
    tipo_hemorragia.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de parada
document.getElementById('parada').addEventListener('change', function () {
    var tipo_parada = document.getElementById('tipo_parada');
    tipo_parada.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de pupilas
document.getElementById('pupilas').addEventListener('change', function () {
    var tipo_pupilas = document.getElementById('tipo_pupilas');
    tipo_pupilas.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de condutor
document.getElementById('condutor').addEventListener('change', function () {
    var tipo_condutor = document.getElementById('tipo_condutor');
    tipo_condutor.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de condutor
document.getElementById('passageiro').addEventListener('change', function () {
    var tipo_passageiro = document.getElementById('tipo_passageiro');
    tipo_passageiro.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de avaliação
document.getElementById('avaliacao').addEventListener('change', function () {
    var tipo_avaliacao = document.getElementById('tipo_avaliacao');
    tipo_avaliacao.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de imobilizações
document.getElementById('imobilizacoes').addEventListener('change', function () {
    var tipo_imbilizacoes = document.getElementById('tipo_imobilizacoes');
    tipo_imobilizacoes.style.display = this.checked ? 'block' : 'none';
});


// Função para mostrar/ocultar o campo de maca
document.getElementById('maca').addEventListener('change', function () {
    var tipo_maca = document.getElementById('tipo_maca');
    tipo_maca.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de rolamento
document.getElementById('rolamento').addEventListener('change', function () {
    var tipo_rolamento = document.getElementById('tipo_rolamento');
    tipo_rolamento.style.display = this.checked ? 'block' : 'none';
});


// Função para mostrar/ocultar o campo de meios auxiliares
document.getElementById('meios_auxiliares').addEventListener('change', function () {
    var tipo_meios_auxiliares = document.getElementById('tipo_meios_auxiliares');
    tipo_meios_auxiliares.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de policiais
document.getElementById('policias').addEventListener('change', function () {
    var tipo_policias = document.getElementById('tipo_policias');
    tipo_policias.style.display = this.checked ? 'block' : 'none';
});

// Função para mostrar/ocultar o campo de samu
document.getElementById('samu').addEventListener('change', function () {
    var tipo_samu = document.getElementById('tipo_samu');
    tipo_samu.style.display = this.checked ? 'block' : 'none';
});

// Adiciona um evento de mudança ao botão de rádio "NÃO"
document.getElementById('objNao').addEventListener('change', function () {
var objetos = document.getElementById('objetos');
var textarea = objetos.querySelector('textarea'); // Obtém o elemento de textarea dentro do bloco de objetos

// Verifica se o usuário selecionou "NÃO"
if (this.checked) {
// Limpa o conteúdo do textarea
textarea.value = '';
objetos.style.display = 'none'; // Oculta o bloco de objetos recolhidos
} else {
objetos.style.display = 'block'; // Mostra o bloco de objetos recolhidos
}
});

// Adiciona um evento de mudança ao botão de rádio "SIM"
document.getElementById('objSim').addEventListener('change', function () {
var objetos = document.getElementById('objetos');
objetos.style.display = this.checked ? 'block' : 'none';
});


// função para mostrar/ocultar avaliação paciente glascow
document.getElementsByName('idade_paciente')[0].addEventListener('input', function () {
    var idade_paciente = parseInt(this.value);
    var glascow_menores5 = document.getElementById('glascow_menores5');
    var glascow_maiores5 = document.getElementById('glascow_maiores5');

    glascow_menores5.style.display = idade_paciente < 5 ? 'block' : 'none';
    glascow_maiores5.style.display = idade_paciente >= 5 ? 'block' : 'none';
});
// calcular a avaliação do paciente (glascow)
const botoesOcular = document.getElementsByName("abertura_ocular_maiores");
const botoesMotora = document.getElementsByName("resposta_motora_maiores");
const botoesVerbal = document.getElementsByName("resposta_verbal_maiores");
const botoesOcularMenor5 = document.getElementsByName("abertura_ocular_menores");
const botoesMotoraMenor5 = document.getElementsByName("resposta_motora_menores");
const botoesVerbalMenor5 = document.getElementsByName("resposta_verbal_menores");

for (const botao of botoesOcular) {
    botao.addEventListener("change", calcularSoma);
    console.log("Botão ocular: ", botao);  // Adicione esta linha
}
for (const botao of botoesMotora) {
    botao.addEventListener("change", calcularSoma);
}
for (const botao of botoesVerbal) {
    botao.addEventListener("change", calcularSoma);
}
for (const botao of botoesOcularMenor5) {
    botao.addEventListener("change", calcularSoma);
}
for (const botao of botoesMotoraMenor5) {
    botao.addEventListener("change", calcularSoma);
}
for (const botao of botoesVerbalMenor5) {
    botao.addEventListener("change", calcularSoma);
}

// Função para calcular a soma dos valores dos botões de opção selecionados
function calcularSoma() {
    console.log("Função calcularSoma foi chamada");  // Adicione esta linha
    // Calcula a soma dos valores selecionados nos grupos de botões de opção
    const somaOcular = calcularSomaValoresSelecionados(botoesOcular);
    const somaMotora = calcularSomaValoresSelecionados(botoesMotora);
    const somaVerbal = calcularSomaValoresSelecionados(botoesVerbal);
    const somaOcularMenor5 = calcularSomaValoresSelecionados(botoesOcularMenor5);
    const somaMotoraMenor5 = calcularSomaValoresSelecionados(botoesMotoraMenor5);
    const somaVerbalMenor5 = calcularSomaValoresSelecionados(botoesVerbalMenor5);

    // Exibe a soma dos valores
    const somaTotal = somaOcular + somaMotora + somaVerbal;
    document.getElementById("soma-valores").innerText = "TOTAL (GCS) (3-15): " + somaTotal;
    const somaTotalMenor5 = somaOcularMenor5 + somaMotoraMenor5 + somaVerbalMenor5;
    document.getElementById("soma-valores-menor5").innerText = "TOTAL (GCS) (3-15): " + somaTotalMenor5;
}

// Função auxiliar para calcular a soma dos valores selecionados nos botões de opção
function calcularSomaValoresSelecionados(botoes) {
    let soma = 0;
    for (const botao of botoes) {
        if (botao.checked) {
            soma += parseInt(botao.value);
        }
    }
    return soma;
}
