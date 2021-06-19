import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
    providedIn:'root'
})

export class WebSocketService{
    webSocket: WebSocket;
    chatMessages$: BehaviorSubject<any[]> = new BehaviorSubject([]);
    isLoadingMessages$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    constructor(private userService: UserService){ }

    public openWebSocket(userTo: string, userFrom: string){
        this.webSocket = new WebSocket('ws://localhost:8090/chat');

        this.webSocket.onopen = (event)=>{
            console.log('open: ', event);
            this.userService.getMessages(userTo,userFrom).subscribe((messages)=>{
                this.chatMessages$.next(messages.map((msg)=> {
                    return { mine: msg.sender === sessionStorage.getItem('userName'), ...msg }
                }));
            })
        }

        this.webSocket.onmessage = (event)=>{
            const msg = JSON.parse(event.data);
            msg.mine = msg.idFrom === +sessionStorage.getItem('userId');
            this.chatMessages$.next([...this.chatMessages$.value, msg]);
            this.isLoadingMessages$.next(false);
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