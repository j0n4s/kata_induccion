function crearGrupo(parejas){
    var contadorParejas = 0;
    var grupoParejas = [];
    contador(parejas);
    for(i=0;i<parejas.length;i++){
        console.log(parejas[i].p1)
    }
}
function contador(parejas){
    var grupoContadorParejas = [];
    for(i=0;i<parejas.length;i++){
        if(isNaN(parseInt(grupoContadorParejas[parejas[i].p1]))){
            grupoContadorParejas[parejas[i].p1]=0;
        }
        grupoContadorParejas[parejas[i].p1] = 1 + parseInt(grupoContadorParejas[parejas[i].p1]);
        console.log(String(grupoContadorParejas[parejas[i].p1]));
    }
}
module.exports.crearGrupo = crearGrupo;