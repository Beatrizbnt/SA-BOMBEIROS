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

// mascara nome

function validarNome(event) {
    const nome = event.target.value;
    const regex = /^[a-zA-Z\s]*$/; // Aceita apenas letras e espaços

    if (!regex.test(nome)) {
        event.target.value = nome.slice(0, -1); // Remove o último caractere (não é uma letra)
    }
}

const nomeInput = document.getElementById('nome');

nomeInput.addEventListener('input', validarNome);

