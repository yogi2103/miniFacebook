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
        this.socket.on('connect',()=>{
            console.log('Connection established using Sockets...')
        })
    }
}