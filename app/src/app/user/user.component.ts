import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Pageable } from '../core/models/pageable.model';
import { User } from '../core/models/user.model';
import { UserService } from '../services/user.service';
import { FollowersModalCOmponent } from './modal-followers/modal.component';
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

  userId?: number;

  messageOfButton: String = this.followingUser ? 'Seguido' : 'Seguir';
  displayButton: Boolean = false;


  reviews:number = 0;
  followers:number = 0;
  likes:number = 0;
  followings:number = JSON.parse(localStorage.getItem('listOfFollowings')).length;

  followers$ = new BehaviorSubject<User[]>([]);

  @Output() newUser = new EventEmitter<User>();

  filter$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private reviewService: ReviewService,
     public snackBar: MatSnackBar,
      private fb: FormBuilder, 
      public auth: AuthService, 
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      private router: Router){
        
  }

  ngOnInit(): void {
    this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.displayButton = 
              this.activatedRoute.snapshot.routeConfig.path.includes('user') &&
              sessionStorage.getItem('userId') !== this.userId.toString();
    const filter = `userId=${this.displayButton ? this.userId : sessionStorage.getItem('userId')}`;
    this.filter$.next(filter);
    this.startForm(this.disabled);
    this.getInformationOfUser();
  }

  getInformationOfUser(){
    const userId = this.activatedRoute.snapshot.routeConfig.path.includes('user') ?
        this.userId : +sessionStorage.getItem('userId');
    this.userService.getFollowers(userId).subscribe((response: Pageable)=>{
      const followers = response.content.map((follow)=> follow.from);
      this.followers$.next(followers);
      this.followers = this.followers$.value.length;
    });
  }

  startForm(disabled: Boolean){
    const idUsuario = this.userId !== 0?  this.userId : sessionStorage.getItem('userId')
    this.userService.get(idUsuario).pipe(
      catchError(async (error) => this.errorHandle(error))
    ).subscribe((data) => {
      this.user = data;
      this.formUser = this.fb.group(
        {
          id: [{value: this.user.id, disabled: true}],
          name: [{value: this.user.name, disabled: disabled}],
          lastName: [{value: this.user.lastName, disabled: disabled}],
          userName: [{value: this.user.userName, disabled: disabled}],
          password: [{value: this.user.password, disabled: disabled}],
          email: [{value: this.user.email, disabled: disabled } ],
          avatar: [{value: this.user.avatar, disabled: disabled}]
        }
      )
    })
    /*this.auth.user$.subscribe(
      user => {
        this.formUser = this.fb.group(
          {
            id: [{value: this.user.id, disabled: disabled}],
            name: [{value: user.given_name, disabled: disabled}],
            userName: [{value: this.user.userName, disabled: disabled}],
            password: [{value: user.sub, disabled: disabled}],
            email: [{value: this.user.email, disabled: disabled }, Validators.required ]
          }
        )
      }
    )*/  
  }

  errorHandle(error){
    this.router.navigate(['/401'])
  }

  edit(){
    this.disabled = false;
    this.startForm(this.disabled);
  }

  update(){
    if(this.formUser.valid){
      this.userService.save(this.formUser.getRawValue() as User).subscribe((user: User) => {
        this.newUser.emit(user);
        this.disabled = true;
        this.startForm(this.disabled);
      });
    }
  }

  follow(){
    const body ={
      idTo: this.userId,
      idFrom: parseInt(sessionStorage.getItem('userId'))
    }
    this.userService.followUser(body).subscribe((_)=>{
      this.notificationService.showSuccess('Usuario seguido')
      
      const followings =  JSON.parse(localStorage.getItem('listOfFollowings'));
      followings.push(this.userId);
      localStorage.setItem('listOfFollowings', JSON.stringify(followings));
    });
  }

  showFollowers(){
    this.dialog.open(FollowersModalCOmponent, {
      width: '100%',
      height: '60%',
      data: {
        dataKey: this.followers$.value
      }
    });
  }

  followingUser(){
    return JSON.parse(localStorage.getItem('listOfFollowings')).includes(this.userId);
  }

}


