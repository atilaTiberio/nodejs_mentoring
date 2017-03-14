/**
 * Created by hiturbe on 14/02/17.
 */

var fs= require('fs');

var procesaDatos=function(loqueQuiera,datitos){
	console.log("error: %s. Datos %s ",loqueQuiera,datitos);
};

fs.readFile('readFile.js','utf8',procesaDatos);

console.log("------------");

fs.readFile('httpServer.js','utf8',procesaDatos);
console.log("Fin: ");
