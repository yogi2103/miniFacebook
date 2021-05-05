//for receiving the sockets

module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        console.log('new connection established!',socket.id);

        //wheneve the client disconnects and automatic disconnect is fired
        socket.on('disconnect',function(){
            console.log('socket disconnected!');
        });
    });
}