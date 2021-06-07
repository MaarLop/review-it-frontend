import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Pageable } from '../core/models/pageable.model';
import { User } from '../core/models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: any[] = [];
//   socket: any;

  send = faPaperPlane
  constructor(protected userService: UserService) { }

    ngOnInit(): void {
        this.userService.getFollowings(sessionStorage.getItem('userName')).subscribe((followings: Pageable)=>{
            const followingsUser = followings.content.map((f)=> f.to)
            this.userList.push(...followingsUser)
        });
    }

  sendMessage(): void {
    const sender = sessionStorage.getItem('userName')
    this.messageList.push({message: this.message, userName: sender, mine: true});
    this.messageList.push({message: 'como estas', userName: 'user', mine: false});
    this.message = '';
  }

}
