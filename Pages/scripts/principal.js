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

// Verificar o estado do menu no localStorage ao carregar a página
window.onload = function() {
  var menuState = localStorage.getItem("menuState");
  // Se o menu estava aberto, mantenha-o aberto
  if (menuState === "open") {
      openNav();
  } else {
      closeNav();
  }

  // Adicione um evento de rolagem para fechar o menu
  window.onscroll = function() {
      closeNav();
  };
};

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