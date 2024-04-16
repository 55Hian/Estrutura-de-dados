function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    if (newValue.length == 18 || newValue.length == 14) {
        newValue = newValue.replace(/[^\d]+/g, '');
    }
    if (newValue.length != 14 && newValue.length != 11) {
        g_form.addErrorMessage('Formato de CNPJ inválido.');
        g_form.clearValue('cnpj_do_cliente_rh');
        return false;
    }
    if (/0{14}/.test(newValue) || /0{11}/.test(newValue)) {
        g_form.addErrorMessage('Formato de CNPJ inválido.');
        g_form.clearValue('cnpj_do_cliente_rh');
        return false;
    }
    if (newValue.length == 14) {
        for (var i = 0, n = 0; i < 12; n += newValue[i] * b[++i]);
        if (newValue[12] != (((n %= 11) < 2) ? 0 : 11 - n)) {
            g_form.addErrorMessage('Formato de CNPJ inválido.');
            g_form.clearValue('cnpj_do_cliente_rh');
            return false;
        }
        for (var i = 0, n = 0; i <= 12; n += newValue[i] * b[i++]);
        if (newValue[13] != (((n %= 11) < 2) ? 0 : 11 - n)) {
            g_form.addErrorMessage('Formato de CNPJ inválido.');
            g_form.clearValue('cnpj_do_cliente_rh');
            return false;
        }
        g_form.setValue('cnpj_do_cliente_rh', newValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"));
    }
}



function removeSpecialCharacters(str) {
var result = str.replace(/[^a-z0-9]/gi, "");
return result;
}

var value = "111.333.444-55";

var cpfReplaced = removeSpecialCharacters(value.toString().trim());
var cpfLength = cpfReplaced.length;

function checkValidCPF(paramCheck, paramLength) {

try {
var cpf = this.getParameter("sysparm_check") || paramCheck;
var cpfLength = this.getParameter("sysparm_length") || paramLength;

/* Valida CNPJs não preenchidos */
if(cpf == "" || cpf == null) {
gs.print("CPF vazio ou não preenchido.");
}
else {
cpf = cpf.toString();

/* Verifica quantidade de caracteres padrão de um CPF */
if (cpfLength != 11) {
gs.print("CPF com tamanho(quantidade de caracteres) divergente.");
}

/* Elimina inválidos recorrentes */
if (cpf == "00000000000" || cpf == "11111111111"
|| cpf == "22222222222" || cpf == "33333333333"
|| cpf == "44444444444" || cpf == "55555555555"
|| cpf == "66666666666" || cpf == "77777777777"
|| cpf == "88888888888" || cpf == "99999999999") {
gs.print("CPF inválido.");
}

var soma;
var resto;
soma = 0;

for (i=1; i<=9; i++) {
soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
resto = (soma * 10) % 11;
}

if ((resto == 10) || (resto == 11)) {
resto = 0;
if (resto != parseInt(cpf.substring(9, 10)))
gs.print("CPF inválido.");

}
soma = 0;
for (i = 1; i <= 10; i++) {
soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
resto = (soma * 10) % 11;
}

if ((resto == 10) || (resto == 11))
resto = 0;

if (resto != parseInt(cpf.substring(10, 11)))
gs.print("CPF inválido.");

gs.print("CPF válido.");
}
}
catch (e) {
gs.print("Internal Server Error.");
}
}

checkValidCPF(cpfReplaced, cpfLength);