import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
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
    isSameUser: boolean;
    @Output() toggle = new EventEmitter<boolean>();

    constructor(private userService: UserService, private notificationService: NotificationService){ }
    
    ngOnInit(): void {
        this.followingUser(this.user.userName);
        this.isSameUser = this.user.id===parseInt(sessionStorage.getItem('userId'));
    }

    followingUser(userName: string){
        //solo preguntar si lo incluye para ver si lo sigo o no, no es para la lista de followings
        this.userService.getFollowingsAll(sessionStorage.getItem('userName')).subscribe((response)=>{
            this.isFollowing = response.some((follow)=> userName === follow.to.userName);
            this.toggle.emit(this.isFollowing);
        });
    }

    followUser(){
        const body ={
            idTo: this.user.id,
            idFrom: parseInt(sessionStorage.getItem('userId'))
          }
        this.userService.followUser(body).subscribe((_)=>{
            this.notificationService.showSuccessBeforeAfter('Empezando a seguir a ' + this.user.userName + '..',
                'Empezaste a seguir a ' + this.user.userName + '.');
            const followings =  JSON.parse(localStorage.getItem('listOfFollowings'));
            followings.push(this.user.userName);
            localStorage.setItem('listOfFollowings', JSON.stringify(followings));
        });    
    }

    unfollowUser(){
        Swal.fire({
            title: 'Dejar de seguir a ' + this.user.userName + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
                const body ={
                    idTo: this.user.id,
                    idFrom: parseInt(sessionStorage.getItem('userId'))
                  }
                this.userService.unfollowUser(body).subscribe((_)=>{
                    this.notificationService.showSuccessBeforeAfter('Dejando de seguir a ' + this.user.userName + '..', 
                        'Dejaste de seguir a ' + this.user.userName + '.');
                    const followings =  JSON.parse(localStorage.getItem('listOfFollowings'));
                    followings.pop(this.user.userName);
                    localStorage.setItem('listOfFollowings', JSON.stringify(followings));
                });
            }
          })    
    }

    
}