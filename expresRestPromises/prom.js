/**
 * Created by hiturbe on 05/05/17.
 */
var fs= require("fs");

var events= require("events");
var emitter= new events.EventEmitter();


function readFilePromisified(filename){

    return new Promise(function(resolve,reject){

        fs.readFile(filename,"utf8",function(error,data){

            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        });


    });

}

function readFileWithEvents(filename){

    fs.readFile(filename,"utf8",function(error,data){
        if(error){
            emitter.emit("error",error);
        }
        else{
            emitter.emit("exito",data);
        }
    });

}

emitter.on("error",errorFile);
emitter.on("exito",exitoFile);

function errorFile(error){
    console.log("Error obtenido: ",error);
}
function exitoFile(data){
    console.log("Contenido leido exitosamente, evento");
}


readFileWithEvents("prome.js");


