var estado = [false,false,false,false,false];

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
        $('#btn_enviar').prop('disabled', true);
    } else {
        $('#btn_enviar').prop('disabled', false);
        
    }
}

