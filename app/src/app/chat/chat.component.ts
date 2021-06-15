import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
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
  sender = sessionStorage.getItem('userName');
  receiber = '';
  chatTitle = '';
  public isEmojiPickerVisible: boolean = false;
  send = faPaperPlane
  constructor(protected userService: UserService, public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.userService.getFollowings(sessionStorage.getItem('userName')).subscribe((followings: Pageable)=>{
        const followingsUser = followings.content.map((f)=> f.to)
        this.userList.push(...followingsUser)
    });

    this.webSocketService.chatMessages$.subscribe((msgs)=>{
      console.log(msgs);
      const size = msgs.length;
      if(size > 0 && !msgs[size-1].mine){
        var audio = new Audio();
        audio.src = "../../../assets/audio/audio_file.wav";
        audio.load();
        audio.play();
      }

    });
  }

  sendMessage(): void {
    if(this.receiber){
      const msg = {message : this.message, sender: this.sender, to: this.receiber, mine: true}
      this.webSocketService.sendMessage(msg);
      this.message = '';
    }
    else{
      alert('seleccione un destinatario');
    }
  }

  sendMessageTo(user){
    this.receiber= user.userName;
    this.chatTitle = `${user.name} ${user.lastName}`
    this.webSocketService.openWebSocket()
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  toggled: boolean = false;
  handleSelection(event) {
    this.message += event.char;
  }

}
