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

// const tipo_transporte = document.getElementsByName('tipo_transporte');
// for ( let tipo of tipo_transporte){
//    tipo.addEventListener("click", function(){
//    
//     outroTransporte.value = ""
//    })
// } 

// var check_outro = document.getElementById('outro_tipo_transporte');
// check_outro.addEventListener("click", function(){
//     var outroTransporte = document.getElementById('outroTransporte');
    
//     console.log(check_outro.checked)
//     if(check_outro.checked){
//         outroTransporte.style.display="block"
        
//     }
//     else{
//         outroTransporte.style.display="none"
//     }
// });

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

// limpar seções de sinais vitais
function limparSelecoesSinaisVitais() {
    var secaoSinaisVitais = document.getElementById('sinais_vitais');

    
    var radios = secaoSinaisVitais.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });

    var textInputs = secaoSinaisVitais.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(textInput) {
      textInput.value = '';
    });
  }

  // limpar seções de problemas
function limparSelecoesProblemasSuspeitos() {
    var secaoProblemasSuspeitos = document.getElementById('ProblemasSuspeitos');

    var radios = secaoProblemasSuspeitos.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });

    var checkboxes = secaoProblemasSuspeitos.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

    var textInputs = secaoProblemasSuspeitos.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(textInput) {
      textInput.value = '';
    });
  }

  // limpar seções de Ocorrencia pré-hospitalar
  function limparSelecoesTipoOcorrencia() {
    var secaoTipoOcorrencia = document.getElementById('TipoOcorrencia');

    var radios = secaoTipoOcorrencia.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });

    var checkboxes = secaoTipoOcorrencia.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

    var textInputs = secaoTipoOcorrencia.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(textInput) {
      textInput.value = '';
    });
  }

  // limpar seções de paciente e acompanhante
  function limparSelecoesPaciAcomp() {
    var secaoPaciAcomp = document.getElementById('PaciAcomp');

    var radios = secaoPaciAcomp.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });

    var checkboxes = secaoPaciAcomp.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

    var textInputs = secaoPaciAcomp.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(textInput) {
      textInput.value = '';
    });
  }

  // limpar seção anamnese emergencial
  function limparSelecoesAnamneseEmergencia() {
    var secaoAnamneseEmergencia = document.getElementById('anmanese-medica');

    var radios = secaoAnamneseEmergencia.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });

    var checkboxes = secaoAnamneseEmergencia.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

    var textInputs = secaoAnamneseEmergencia.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(textInput) {
      textInput.value = '';
    });

    var timeInputs = secaoAnamneseEmergencia.querySelectorAll('input[type="time"]');
    timeInputs.forEach(function(timeInput) {
      timeInput.value = '';
    });
  }

  // limpar seção anamnese gestacional
  function limparSelecoesAnamneseGestacional() {
    var secaoAnamneseGestacional = document.getElementById('gestacional');

    var radios = secaoAnamneseGestacional.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });

    var checkboxes = secaoAnamneseGestacional.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

    var textInputs = secaoAnamneseGestacional.querySelectorAll('input[type="text"]');
    textInputs.forEach(function(textInput) {
      textInput.value = '';
    });

    var timeInputs = secaoAnamneseGestacional.querySelectorAll('input[type="time"]');
    timeInputs.forEach(function(timeInput) {
      timeInput.value = '';
    });
  }

  // limpar seção glasglow maiores
  function limparSelecoesGlasgowMaiores() {
    var secaoGlasgowMaiores = document.getElementById('glasgow_maiores5');

    var radios = secaoGlasgowMaiores.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });
  }

  // limpar seção glasglow menores
  function limparSelecoesGlasgowMenores() {
    var secaoGlasgowMenores = document.getElementById('glasgow_menores5');

    var radios = secaoGlasgowMenores.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });
  }

  // limpar seção sinais e sintomas
  function limparSelecoesSinaisSintomas() {
    var secaoSinaisSintomas = document.getElementById('sinais-sintomas');

    var checkboxes = secaoSinaisSintomas.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

    var radios = secaoSinaisSintomas.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });
  }

  // limpar seção vítima era
  function limparSelecoesVitima() {
    var secaoVitimaEra = document.getElementById('vitima');

    var radios = secaoVitimaEra.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });
  }

  // limpar seção desição transporte
  function limparSelecoesDecisaoTransporte() {
    var secaoDecisaoTransporte = document.getElementById('transporte');

    var radios = secaoDecisaoTransporte.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
      radio.checked = false;
    });

    var options = secaoDecisaoTransporte.querySelectorAll('option');
    options.forEach(function(option) {
      option.selected = false;
    });
  }
