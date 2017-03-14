var http=require('http');

var counter = 1;

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    console.log("call number: " + counter);
    res.end("Nodejs response number " + counter + "\n");
    counter += 1;

}).listen(3000);
console.log("Server running at http://localhost:3000");
