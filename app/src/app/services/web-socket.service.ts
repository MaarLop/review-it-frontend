import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class WebSocketService{
    webSocket: WebSocket;
    chatMessages$: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(){ }

    public openWebSocket(){
        this.webSocket = new WebSocket('ws://localhost:8090/chat');

        this.webSocket.onopen = (event)=>{
            console.log('open: ', event)
        }

        this.webSocket.onmessage = (event)=>{
            const msg = JSON.parse(event.data);
            msg.mine = msg.sender === sessionStorage.getItem('userName')
            this.chatMessages$.next([...this.chatMessages$.value, msg])
        }

        this.webSocket.onclose = (event)=>{
            this.chatMessages$.next([]);
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