import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Pageable } from '../core/models/pageable.model';
import { User } from '../core/models/user.model';
import { UserService } from '../services/user.service';
import { FollowersModalCOmponent } from './modal-followers/modal.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../core/shared/errors/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  formUser: FormGroup;
  size: number = 2;
  page: number = 0;
  finished = false;
  showSpinner = false;
  disabled = true;
  user: User;

  faEdit = faUserEdit;
  userId?: number;
  userName?: string;

  displayButton: boolean = false;
  isFollowing: boolean;

  isOwnProfile: boolean;

  reviews:number = 0;
  followers:number = 0;
  likes:number = 0;
  followings:number = JSON.parse(localStorage.getItem('listOfFollowings')).length;

  followers$ = new BehaviorSubject<User[]>([]);
  followings$ = new BehaviorSubject<User[]>([]);

  @Output() newUser = new EventEmitter<User>();

  filter$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private reviewService: ReviewService,
     public snackBar: MatSnackBar,
      private fb: FormBuilder, 
      public auth: AuthService, 
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      public dialog: MatDialog,
      private modalService: NgbModal,
      private notificationService: NotificationService,
      private router: Router){
        
  }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.paramMap.get('username');
    this.displayButton = 
              this.activatedRoute.snapshot.routeConfig.path.includes('user') &&
              sessionStorage.getItem('userName') !== this.userName
    this.isOwnProfile = !this.displayButton;
    this.isFollowing = this.followingUser();
    const filter = `userName=${this.displayButton ? this.userName : sessionStorage.getItem('userName')}`;
    this.filter$.next(filter);
    this.getInformationOfUser();
    this.startForm(this.disabled);
  }

  getInformationOfUser(){
    const userName = this.activatedRoute.snapshot.routeConfig.path.includes('user') ?
        this.userName : sessionStorage.getItem('userName');
      this.userService.getImage(userName).subscribe(
        (data) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.user.image = reader.result;
        }, false);
  
        if (data.size > 0) {
          reader.readAsDataURL(data);
        }
      });
      this.userService.getFollowers(userName).subscribe((response: Pageable)=>{
      const followers = response.content.map((follow)=> follow.from);
      this.followers$.next(followers);
      this.followers = this.followers$.value.length;
    });
    this.userService.getFollowings(userName).subscribe((response: Pageable)=>{
      const followings = response.content.map((follow)=> follow.to);
      this.followings$.next(followings);
      this.followings = this.followings$.value.length;
    });
  }

  startForm(disabled: Boolean){
    const userName = this.userName !== null?  this.userName : sessionStorage.getItem('userName')
    this.userService.getByUsername(userName).pipe(
      catchError(async (error) => this.errorHandle(error))
    ).subscribe((data) => {
      this.user = data;
    }) 
  }

  errorHandle(error){
    this.router.navigate(['/401'])
  }

  edit(){
    if(this.user.id === parseInt(sessionStorage.getItem('userId'))){
      const modalRef = this.modalService.open(ModalEditComponent);
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.user = this.user;
    }
  }

  follow(){
    const body ={
      idTo: this.user.id,
      idFrom: parseInt(sessionStorage.getItem('userId'))
    }
    this.userService.followUser(body).subscribe((_)=>{
      this.notificationService.showSuccess('Empezaste a seguir a ' + this.user.userName)
      
      const followings =  JSON.parse(localStorage.getItem('listOfFollowings'));
      followings.push(this.userName);
      localStorage.setItem('listOfFollowings', JSON.stringify(followings));
    });
  }

  showFollowers(){
    this.dialog.open(FollowersModalCOmponent, {
      width: '100%',
      height: '60%',
      data: {
        title: 'Seguidores',
        dataKey: this.followers$.value
      }
    });
  }

  showFollowings(){
    this.dialog.open(FollowersModalCOmponent, {
      width: '100%',
      height: '60%',
      data: {
        title: 'Seguidos',
        dataKey: this.followings$.value
      }
    });
  }

  followingUser(){
    let followings: any[];
    this.userService.getFollowingsAll(sessionStorage.getItem('userName')).subscribe((response)=>{
      followings = response.map((follow)=> follow.to.userName);
      //followings.push(sessionStorage.getItem('userName'));
      localStorage.setItem('listOfFollowings',  JSON.stringify(followings));
    });
    return localStorage.getItem('listOfFollowings').includes(this.userName);
  }

}


