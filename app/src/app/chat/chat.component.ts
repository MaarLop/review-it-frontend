import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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
        this.userService.getFollowings(1).subscribe((followings: any[])=>{
            const followingsUser = followings.map((f)=> f.to)
            this.userList.push(...followingsUser)
        });
    }

  sendMessage(): void {
    const sender = sessionStorage.getItem('user')
    this.messageList.push({message: this.message, userName: sender, mine: true});
    this.messageList.push({message: 'como estas', userName: 'user', mine: false});
    this.message = '';
  }

}
