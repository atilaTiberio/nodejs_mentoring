var eventos=require('events').EventEmitter;
var e= new eventos();

e.on("events",function(a){
   console.log(a);

});

val=0;
e.emit("events",++val);
e.emit("events",++val);
e.emit("events",++val);
e.emit("events",++val);
