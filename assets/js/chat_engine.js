class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        this.socket=io.connect('http://localhost:5000',{ transports: ['websocket', 'polling', 'flashsocket'] });
        
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){

        let self=this;

        this.socket.on('connect',()=>{
            console.log('Connection established using Sockets...');

            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom: 'MiniFacebook'
            });
            
            self.socket.on('user_joined',function(data){
                console.log('A user joined!',data);
            })
        });
        //change:: send a message on clicking the send button
        $('#send-message').click(function(){
            let msg= $('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'MiniFacebook'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);   

            let newMessage=$('<li>');
            let messageType='other-message';
            if(data.user_email==self.userEmail){
                messageType='self-message';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        });
    }
}