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
        })
    }
}