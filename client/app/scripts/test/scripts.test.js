const crearGrupo = require('../main/specs/ajax.js').crearGrupo;

test('La funciòn crearGrupo debe estar definida',() => {
    expect(crearGrupo).toBeDefined();
})

test('Debe ser 1009;2011 1017;2011 => 2011',() => {
    var parejas = [{
        id: 1,
        label: 'Pareja 1',
        p1: 1009,
        p2: 2011
    }, {
        id: 2,
        label: 'Pareja 2',
        p1: 1017,
        p2: 2011
    }];
    var empleados =  crearGrupo(parejas);
    respuesta = String(empleados.join(";"));
    expect(respuesta).toBe('2011');
})

test('Debe ser 1009;2000 1009;2001 1002:2002 1003:2002 => 2002;1009',() => {
    var parejas = [{
        id: 1,
        label: 'Pareja 1',
        p1: 1009,
        p2: 2000
    }, {
        id: 2,
        label: 'Pareja 2',
        p1: 1009,
        p2: 2001
    }, {
        id: 3,
        label: 'Pareja 3',
        p1: 1002,
        p2: 2002
    }, {
        id: 4,
        label: 'Pareja 4',
        p1: 1003,
        p2: 2002
    }];
    var empleados =  crearGrupo(parejas);
    respuesta = String(empleados.join(";"));
    expect(respuesta).toBe('2002;1009');
})