/**
 * Created by hiturbe on 20/03/17.


*/


var http=require("http");
var queryS= require("querystring");

//var cadenas=require("./lib/cadenas.js");

var Cadenas= require('./lib/cadena_module.js');


/*
Extrae parametros artesanalmente
 */
var params=function(req){
    var q=req.url.split('?'),result={};
    //console.log(req.url);
    if(q.length>=2) {
        q[1].split('&').forEach(function(item){
                paramValor=item.split('=');
                result[paramValor[0]]=paramValor[1];
        });

        }
    else{
        result["cadena"]="";
        result["letra"]="";
    }



    return result;
}


http.createServer(function(req,res){
console.log("Request : ",req.url);
    res.writeHead(200,{'Content-Type':'text/plain'});
    if(req.url!='/favicon.ico'){

            if(req.url=='/'){
                res.end("url de invocacion: /cuentame?cadena=algunacadena&letra=a");
            }
            else {

                //extrae parametros con modulo querystring
                var parametros = queryS.parse(req.url.split('?')[1]);

                var p = new Cadenas(parametros.cadena, parametros.letra);


                res.end("Total de letras: " + parametros.letra + "  en [" + parametros.cadena + "] : " +
                    p.cuentaLetra());
            }



    }


}).listen(3000);

console.log("Server running... 3000");
