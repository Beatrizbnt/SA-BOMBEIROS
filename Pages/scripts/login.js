
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