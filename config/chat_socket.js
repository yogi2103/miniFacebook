module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        console.log('new connection established!',socket.id);

        //wheneve the client disconnects and automatic disconnect is fired
        socket.on('disconnect',function(){
            console.log('socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('joining request received!',data);

            //it will join the chatroom defined in fronend chat_engine.js if exists otherwise create it 
            socket.join(data.chatroom);

            //to make aware all other users in chatroom that someone new has joined the chatroom
            io.in(data.chatroom).emit('user_joined',data);
        });

         //Change:: detect send_message and broadcast to everyone in the room
         socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });
    });
}