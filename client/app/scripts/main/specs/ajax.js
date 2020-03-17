function crearGrupo(parejas) {
    var contadorParejas = 0;
    var grupoParejas = [];
    var totalP1 = contadorTotalP1(parejas);
    var totalParejas = contadorTotalP2(parejas, totalP1);
    var empleados = [];
    var parejasRepresentadas = [];
    totalParejas.forEach(function(emp) {
        if (emp.index > 0) {
            for (i = 0; i < parejas.length; i++) {
                if (!inArray(i, parejasRepresentadas)) {
                    if (parejas[i].p1 == emp.index || parejas[i].p2 == emp.index) {
                        parejasRepresentadas.push(i);
                        if (!inArray(emp.index, empleados) && emp.index > 0) {
                            empleados.push(emp.index);
                        }
                    }
                }
            }
        }
    });
    return empleados;
}

function contadorTotalP1(parejas) {
    var grupoContadorParejas = [];
    for (i = 0; i < parejas.length; i++) {
        if (!isNaN(parseInt(parejas[i].p1)) && parseInt(parejas[i].p1) > 0) {
            iTemp = i;
            if (isNaN(parseInt(grupoContadorParejas[parejas[i].p1]))) {
                grupoContadorParejas[parejas[i].p1] = 0;
                iTemp = 0;
            } else {
                iTemp = i + 1;
            }
            for (j = iTemp; j < parejas.length; j++) {
                if (!isNaN(parseInt(parejas[i].p1)) && !isNaN(parseInt(parejas[j].p1))) {
                    if (parseInt(parejas[i].p1) == parseInt(parejas[j].p1)) {
                        grupoContadorParejas[parejas[i].p1] = 1 + parseInt(grupoContadorParejas[parejas[i].p1]);
                    }
                }
            }
        }
    }
    return grupoContadorParejas;
}

function contadorTotalP2(parejas, grupoContadorParejas) {
    for (i = 0; i < parejas.length; i++) {
        if (!isNaN(parseInt(parejas[i].p2))) {
            iTemp = i;
            if (isNaN(parseInt(grupoContadorParejas[parejas[i].p2])) && parseInt(parejas[i].p1) > 0) {
                grupoContadorParejas[parejas[i].p2] = 0;
                iTemp = 0;
            } else {
                iTemp = i + 1;
            }
            for (j = iTemp; j < parejas.length; j++) {
                if (!isNaN(parseInt(parejas[i].p2)) && !isNaN(parseInt(parejas[j].p2))) {
                    if (parseInt(parejas[i].p2) == parseInt(parejas[j].p2)) {
                        grupoContadorParejas[parejas[i].p2] = 1 + parseInt(grupoContadorParejas[parejas[i].p2]);
                    }
                }
            }
        }
    }
    //ORDENAR DE MAYOR A MENOR
    grupoContadorParejas = ordenarParejas(grupoContadorParejas);
    return grupoContadorParejas;
}

function ordenarParejas(grupoContadorParejas) {
    var grupoContadorParejas = grupoContadorParejas.map(function(el, i) {
        return {
            index: i,
            value: el
        };
    })
    grupoContadorParejas.sort(function(a, b) {
        return b.value - a.value;
    })
    return grupoContadorParejas;

}

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}
module.exports.crearGrupo = crearGrupo;