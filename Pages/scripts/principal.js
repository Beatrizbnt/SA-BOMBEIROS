function openNav() {
  document.getElementById("myNav").style.height = "100%";
  
  // Adicione um evento de clique a todos os itens do menu para fechar o menu quando um item é selecionado
  var menuItems = document.querySelectorAll(".overlay-content a");
  menuItems.forEach(function(item) {
      item.addEventListener("click", function() {
          closeNav();
      });
  });
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}



  function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
  }
  function execmascara() {
    v_obj.value = v_fun(v_obj.value)
  }
  function mtel(v) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }
  function id(el) {
    return document.getElementById(el);
  }
  window.onload = function () {
    id('telefone-p').onkeyup = function () {
      mascara(this, mtel);
    }
    id('telefone-a').onkeyup = function () {
      mascara(this, mtel);
    }
  }


// Adiciona um evento de mudança aos inputs de sexo
const femininoInput = document.getElementById('feminino');
const gestanteDiv = document.getElementById('gestanteDiv');

femininoInput.addEventListener('change', function() {
  // Se o sexo feminino for selecionado, mostra o input de gestante
  if (femininoInput.checked) {
    gestanteDiv.style.display = 'block';
  } else {
    // Se o sexo masculino for selecionado, esconde o input de gestante
    gestanteDiv.style.display = 'none';
  }
});