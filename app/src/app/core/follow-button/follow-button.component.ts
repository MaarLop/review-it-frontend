import { Component, Input, OnInit } from "@angular/core";
import { faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "src/app/services/user.service";
import { User } from "../models/user.model";
import { NotificationService } from "../shared/errors/notification.service";

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow-button.component.html',
    styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit{

    follow = faUserPlus;
    unfollow = faUserCheck;
    @Input() user: User;
    isFollowing: boolean;

    constructor(private userService: UserService, private notificationService: NotificationService){ }
    
    ngOnInit(): void {
        this.isFollowing = this.followingUser();
    }
    
    followingUser(){
        return JSON.parse(localStorage.getItem('listOfFollowings')).includes(this.user.userName);
    }

    followUser(){
        const body ={
            idTo: this.user.id,
            idFrom: parseInt(sessionStorage.getItem('userId'))
          }
        this.userService.followUser(body).subscribe((_)=>{
            this.notificationService.showSuccess('Empezaste a seguir a ' + this.user.userName)
            const followings =  JSON.parse(localStorage.getItem('listOfFollowings'));
            followings.push(this.user.userName);
            localStorage.setItem('listOfFollowings', JSON.stringify(followings));
        });    
    }

    
}