import { Component, Input, OnInit } from "@angular/core";
import { faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "src/app/services/user.service";
import { User } from "../models/user.model";

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow-button.component.html',
    styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent{

    follow = faUserPlus;
    unfollow = faUserCheck;
    @Input() user: User;

    constructor(private userService: UserService){ }
    
    followingUser(){
        return JSON.parse(localStorage.getItem('listOfFollowings')).includes(this.user.userName);
    }

    followUser(){
        const body ={
            idTo: this.user.id,
            idFrom: parseInt(sessionStorage.getItem('userId'))
          }
        this.userService.followUser(body).subscribe((_)=>{
            const followings =  JSON.parse(localStorage.getItem('listOfFollowings'));
            followings.push(this.user.userName);

            localStorage.setItem('listOfFollowings', JSON.stringify(followings));
        });    
    }

    
}