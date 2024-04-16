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