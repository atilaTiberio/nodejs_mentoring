/**
 * Created by hiturbe on 20/03/17.
 *  * If the module is returning more than one
 * function or variable, the module can specify these by setting the properties of an object called:
 *          exports

 If the module is returning a single function or variable, the property
 module.exports can instead be set
 */
exports.privada=20;


exports.getPrivada=function(){
    return this.privada;
}

exports.setPrivada=function (privada) {
    this.privada=privada;
}

exports.cuentaLetra = function(cadena, letra){
    var tmp=cadena.toUpperCase();
    var tmpLetra=letra.toUpperCase();
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

