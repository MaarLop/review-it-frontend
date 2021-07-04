import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { User } from '../core/models/user.model';
import { Pageable } from '../core/models/pageable.model';
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
  senderId = sessionStorage.getItem('userId');
  sender = sessionStorage.getItem('userName');
  receiber = null;
  chatTitle = '';
  receiberAvatar = 'https://www.adl-logistica.org/wp-content/uploads/2019/07/imagen-perfil-sin-foto.png';
  public isEmojiPickerVisible: boolean = false;
  send = faPaperPlane
  constructor(protected userService: UserService, public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.userService.getFollowings(sessionStorage.getItem('userName')).subscribe((followings: Pageable)=>{
        const followingsUser = followings.content.map((f)=> f.to)
        this.userList.push(...followingsUser)
    });

    combineLatest([
      this.webSocketService.chatMessages$,
      this.webSocketService.isLoadingMessages$
    ]).subscribe(([msgs, isLoading])=>{
      const size = msgs.length;
      if(size > 0 && !msgs[size-1].mine && !isLoading){
        var audio = new Audio();
        audio.src = "../../../assets/audio/audio_file.wav";
        audio.load();
        audio.play();
      }

    });
  }

  sendMessage(): void {
    if(this.receiber && this.message){
      const msg = {message : this.message, idFrom: +this.senderId, idTo: +this.receiber.id, sender: this.sender}
      if(this.message){
        this.webSocketService.sendMessage(msg);
      }
      this.message = '';
    }
    else{
      const alertMessage = this.receiber ? 'Ingrese un mensaje' : 'Seleccione un destinatario';
      alert(alertMessage);
    }
  }

  sendMessageTo(user){
    this.receiber= user;
    this.chatTitle = `${user.name} ${user.lastName}`
    this.receiberAvatar= user.avatar;
    this.webSocketService.openWebSocket(user.userName, this.sender)
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  toggled: boolean = false;
  handleSelection(event) {
    this.message += event.char;
  }

}
