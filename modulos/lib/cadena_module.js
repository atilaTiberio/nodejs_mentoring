
var cadena;
var letra;


var Cadenas= function(cadena,letra){
    console.log("Cadena %s, Letra %s",cadena,letra);
    this.cadena=cadena;
    this.letra=letra;

}


Cadenas.prototype.cuentaLetra = function(){
    var tmp=this.cadena.toUpperCase();
    var tmpLetra=this.letra.toUpperCase();
    var total=0;




    for(i=0; i <tmp.length;i++){

        if(tmp[i]==tmpLetra)
            total++;
    }
    imprimeTotal(total);

    return total;

}

function imprimeTotal(total){

    console.log("Conteo de letra: ",total);
}

module.exports=Cadenas;


/*
Varios module.exports
    definir default
 */