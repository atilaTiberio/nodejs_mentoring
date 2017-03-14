/**
 * Created by hiturbe on 14/02/17.
 */
var http=require('http');
var retorno={'v':1,'v':2};

var atiendeRequest=function(req,res){
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end("cadena");

};

http.createServer(atiendeRequest).listen(3030);


console.log("Server running at http://localhost:3030");
