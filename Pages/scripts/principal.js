function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.height = "0%";
  }

  window.onscroll = function () { myFunction() };

  function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
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