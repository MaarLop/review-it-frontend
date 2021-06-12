import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class WebSocketService{
    webSocket: WebSocket;
    chatMessages: any[] = [];

    constructor(){ }

    public openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8090/chat');

        this.webSocket.onopen = (event)=>{
            console.log('open: ', event)
        }

        this.webSocket.onmessage = (event)=>{
            const msg = JSON.parse(event.data);
            this.chatMessages.push(msg)
        }

        this.webSocket.onclose = (event)=>{
            console.log('close ', event)
        }
    }

    public sendMessage(chatMsg){
        this.webSocket.send(JSON.stringify(chatMsg));
    }

    public closeWebSocket(){
        this.webSocket.close();
    }
}