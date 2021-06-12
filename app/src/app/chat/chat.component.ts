import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Pageable } from '../core/models/pageable.model';
import { User } from '../core/models/user.model';
import { UserService } from '../services/user.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{
  message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: any[] = [];
  sender = sessionStorage.getItem('userName');
  receiber = '';
  chatTitle = '';
//   socket: any;

  send = faPaperPlane
  constructor(protected userService: UserService, public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.userService.getFollowings(sessionStorage.getItem('userName')).subscribe((followings: Pageable)=>{
        const followingsUser = followings.content.map((f)=> f.to)
        this.userList.push(...followingsUser)
    });
    this.webSocketService.openWebSocket();
  }

  sendMessage(): void {
    if(this.receiber){
      const msg = {message : this.message, userName: this.sender, to: this.receiber, mine: true}
      this.webSocketService.sendMessage(msg);
      // this.messageList.push(msg);
      // this.messageList.push({message: 'como estas', userName: this.receiber, mine: false});
      this.message = '';
    }
    else{
      alert('seleccione un destinatario');
    }
  }

  sendMessageTo(user){
    this.receiber= user.userName;
    this.chatTitle = `${user.name} ${user.lastName}`
    this.messageList = [];// get mensajes enviados
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

}
