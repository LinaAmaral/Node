var estado = [true,true,true,true,true];

function validarCampo(campo, valor, i) {
    if (valor.length <= 4) {
        campo.style.borderColor = "red";
        estado[i] = false;
    } else {
        campo.style.borderColor = "lightgreen";
        estado[i] = true;
    }
    acionaBotao()
}
function validarNumero(campo, valor, i) {
    if (valor.length == 3) {
        campo.style.borderColor = "lightgreen";
        estado[i] = true;
    } else {
        campo.style.borderColor = "red";
        estado[i] = false;
    }
    acionaBotao()
}
function acionaBotao() {

    if (estado.some(elem => elem == false)) {
        $('#btn_alterar').prop('disabled', true);
    } else {
        $('#btn_alterar').prop('disabled', false);    
    }
}

