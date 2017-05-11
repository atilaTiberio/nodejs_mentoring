/**
 * Created by hiturbe on 06/03/17.
 */
 
function divEscapedContentElement(message){

    return $('<div></div>').text(message);
}

function constructMessage(textMessage,sender){
  
  var newElement=$('<div></div>').text(textMessage);
  var newString = newElement.html().replace(replaceRegExp,function(val){
    console.log(val)
    return "<img class='emoticon' src='"+emoticons[val]+"' />"
  })
  if(!sender){
    newString = '<div>'+newString+'</div>'
  }
  return newString
}

function divSystemContentElement(message){
    return $('<div></div>').html('<i>'+message+'</i>');
}

function processUserInput(chatApp,socket){
    var message=$('#send-message').val();
    var systemMessage;

    if(message.charAt(0)=='/'){
        systemMessage=chatApp.processCommand(message);
        if(systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }else{
        chatApp.sendMessage($('#room').text(),message);
        $('#messages').append(constructMessage(message,true));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');

}

var socket=io.connect();

$(document).ready(function(){
    window.emoticons={}
    emoticons[':)']='/images/smile.png'
    emoticons[':D']='/images/smile-2.png'
    emoticons[":'D"]='/images/smile-cry.png'
    emoticons[":')"]='/images/smile-cry.png'
    
    var newRegExpArr=[]
    for( var val in emoticons){
      val = val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      newRegExpArr.push("("+val+")")      
    }
    window.replaceRegExp=new RegExp(newRegExpArr.join('|'), 'g')
    var chatApp=new Chat(socket);
    socket.on('nameResult',function(result){
        var message;
        if(result.success){
            message='You are known as '+result.name+'.';
        }else{
            message=result.message;
        }
        $('#messages').append(divSystemContentElement(message));

    });

    socket.on('joinResult',function(result){
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room changed.'));

    });

    socket.on('message',function(message){        
        
        
        $('#messages').append(constructMessage(message.text,false));
    });

    socket.on('rooms',function(rooms){
        $('#room-list').empty();
        for( var room in rooms){
            room=room.substring(1,room.length);
            if(room!='') {
                $('#room-list').append(divEscapedContentElement(room));
            }
        }
        $('#room-list div').click(function(){
            chatApp.processCommand('/join'+$(this).text());
            $('#send-message').focus();
        });
    });

    setInterval(function(){
        socket.emit('rooms');
    },1000);

    $('#send-message').focus();
    $('#send-form').submit(function(){
        processUserInput(chatApp,socket);
        return false;
    });

});
