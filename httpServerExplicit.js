/**
 * Created by hiturbe on 01/03/17.
 */
var http=require("http");
var server=http.createServer();

var callback=function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("La ultima\n");
};

server.on('request',callback);

server.listen(3000);

console.log("Server running at http://localhost:3000");
